'use server'

import { createClient } from '@/utils/supabase/server'
import { service } from '@/utils/supabase/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'
import { findPerson } from '@/app/lib/actions'
import { permission } from 'process'
import { create } from 'domain'


export async function fetchAppointments() {
  const supabase = createClient();
  const { data: appointments, error } = await supabase
      .from('Appointment')
      .select('appointmentid, serviceid, status, totalamountdue');

  const appointmentDetails = await Promise.all(appointments.map(async (appointment) => {
      const { data: schedule, error: scheduleError } = await supabase
          .from('Schedule')
          .select('date, starttime, endtime')
          .eq('appointmentid', appointment.appointmentid);

      if (scheduleError) {
          console.error(`Error fetching schedule for appointment ${appointment.appointmentid}:`, scheduleError);
          return null;
      }

      if (!schedule || schedule.length === 0) {
          return null;
      }

      const serviceid = schedule[0].serviceid;

      const { data: service, error: serviceError } = await supabase
          .from('Service')
          .select('title')
          .eq('serviceid', appointment.serviceid);

      if (serviceError) {
          console.error(`Error fetching service title for service ${serviceid}:`, serviceError);
          return null;
      }

      // for customer name
      const { data: customer, error: customerError } = await supabase
          .from('Customers')
          .select('personid')
          .eq('appointmentid', appointment.appointmentid);

      if (customerError) {
          console.error(`Error fetching customer id for customer ${appointment.appointmentid}:`, customerError);
          return null;
      }

      if (!customer || customer.length === 0) {
          return null;
      }

      const personid = customer[0].personid;

      const { data: person, error: personError } = await supabase
          .from('Person')
          .select('firstname, middlename, lastname')
          .eq('personid', personid);

      if (personError) {
          console.error(`Error fetching person details for person ${personid}:`, personError);
          return null;
      }

      // Merge the details
      if (service && service.length > 0) {
          return {
              ...appointment,
              date: schedule[0].date,
              starttime: schedule[0].starttime,
              endtime: schedule[0].endtime,
              title: service[0].title,
              reservee: `${person[0].firstname} ${person[0].middlename ? person[0].middlename + ' ' : ''}${person[0].lastname}`,
              totalamountdue: appointment.totalamountdue
          };
      }

      return appointment;
  }));

  const filteredAppointmentDetails = appointmentDetails.filter(detail => detail !== null);

  console.log(filteredAppointmentDetails);

  return filteredAppointmentDetails;
}


export async function fetchCalendarData(selectedDate: any) {
  const supabase = createClient();
  const offset = selectedDate.getTimezoneOffset();
  const adjustedDate = new Date(selectedDate.getTime() - (offset * 60 * 1000));
  const formattedDate = adjustedDate.toISOString().split('T')[0];

  // schedules given date
  const { data: schedules, error: schedulesError } = await supabase
    .from('Schedule')
    .select('appointmentid, starttime, endtime, status') // Include status in the fetch
    .eq('date', formattedDate);

  if (schedulesError) {
    console.error(schedulesError);
    return [];
  }

  // filter: pending or appointed only
  const filteredSchedules = schedules.filter(schedule => 
    schedule.status === 'Pending' || schedule.status === 'Appointed'
  );

  // fetch appointment details for each filtered schedule
  const calendarData = await Promise.all(
    filteredSchedules.map(async (schedule) => {
      const { data: customerData, error: customerError } = await supabase
        .from('Customers')
        .select('*')
        .eq('appointmentid', schedule.appointmentid)
        .eq('ismain', true);

      if (customerError) {
        console.error('Error fetching customer data:', customerError);
        return null;
      }

      const customer = customerData.length > 0 ? customerData[0] : null;

      if (!customer) {
        console.error('No main customer found for appointment:', schedule.appointmentid);
        return null;
      }

      const cust_id = customer.personid;

      const { data: persons, error: personsError } = await supabase
        .from('Person')
        .select('firstname, middlename, lastname, emailaddress, contactnumber')
        .eq('personid', cust_id);

      if (personsError) {
        console.error('Error fetching person data:', personsError);
        return null;
      }

      const person = persons.length > 0 ? persons[0] : null;

      if (!person) {
        console.error('No person found for person ID:', cust_id);
        return null;
      }

      const { data: appointments, error: appointmentsError } = await supabase
        .from('Appointment')
        .select('serviceid, isparkingspotneeded, additionalrequest, trackingnumber, totalamountdue')
        .eq('appointmentid', schedule.appointmentid);

      if (appointmentsError) {
        console.error('Error fetching appointment data:', appointmentsError);
        return null;
      }

      const appointment = appointments.length > 0 ? appointments[0] : null;

      if (!appointment) {
        console.error('No appointment found for appointment ID:', schedule.appointmentid);
        return null;
      }

      const { data: services, error: servicesError } = await supabase
        .from('Service')
        .select('title')
        .eq('serviceid', appointment.serviceid);

      if (servicesError) {
        console.error('Error fetching service data:', servicesError);
        return null;
      }

      const service = services.length > 0 ? services[0] : null;

      if (!service) {
        console.error('No service found for service ID:', appointment.serviceid);
        return null;
      }

      // Fetch additional customers
      const { data: additionalCustomers, error: additionalCustomersError } = await supabase
        .from('Customers')
        .select('personid')
        .eq('appointmentid', schedule.appointmentid)
        .eq('ismain', false);

      if (additionalCustomersError) {
        console.error('Error fetching additional customers:', additionalCustomersError);
        return null;
      }

      const additionalCustomerNames = await Promise.all(
        additionalCustomers.map(async (additionalCustomer) => {
          const { data: additionalPerson, error: additionalPersonError } = await supabase
            .from('Person')
            .select('firstname, middlename, lastname')
            .eq('personid', additionalCustomer.personid);

          if (additionalPersonError) {
            console.error('Error fetching additional person data:', additionalPersonError);
            return null;
          }

          if (additionalPerson.length > 0) {
            const person = additionalPerson[0];
            return `${person.firstname} ${person.middlename ? person.middlename + ' ' : ''}${person.lastname}`;
          } else {
            return null;
          }
        })
      );

      return {
        name: `${person.firstname} ${person.middlename ? person.middlename + ' ' : ''}${person.lastname}`,
        contactnumber: person.contactnumber,
        emailaddress: person.emailaddress,
        isparkingspotneeded: appointment.isparkingspotneeded,
        title: service.title,
        date: formattedDate,
        starttime: schedule.starttime,
        endtime: schedule.endtime,
        appointmentid: schedule.appointmentid,
        additionalreq: appointment.additionalrequest,
        additionalPersonNames: additionalCustomerNames.filter(name => name !== null),
        status: schedule.status,
        trackingnumber: appointment.trackingnumber,
        totalamountdue: appointment.totalamountdue
      };
    })
  );

  return calendarData.filter(data => data !== null); // remove null
}






export async function fetchSchedule() {
    const supabase = createClient();
    const { data, error} = await supabase.from('Schedule').select().lte('scheduleid', 1010);

    if(error){
        return ["error", "error"]
    }
    if (data)
    {
        return data;
    }
}

export async function fetchOneService( id:number ) {
    const supabase = createClient();
    const { data, error} = await supabase.from('Service').select('title').eq('serviceid', id);

    if(error){
        return ["error", "error"]
    }
    if (data)
    {
        return data;
    }
}

export async function fetchServices(){
    const supabase = createClient();
    const { data: services } = await supabase.from('Service').select();
    const { data: onetimeServices } = await supabase.from('OnetimeService').select();
    const { data: hourlyServices } = await supabase.from('HourlyService').select();


    const completeServices = services?.map((service : service) => {
        
    const onetimeservice = onetimeServices?.find((ot : service) => ot.serviceid === service.serviceid);
    const hourlyservice = hourlyServices?.find((h : service) => h.serviceid === service.serviceid);

        if(onetimeservice){
            return({
                service,
                onetimeservice,
                serviceType: 'onetime'
            });
        } else {
            return({
                service,
                hourlyservice,
                serviceType: 'hourly'
            });
        }
    });

    return completeServices; 
}
export async function fetchEditServices() {


    const supabase = createClient();
  
    const { data: services, error: serviceError } = await supabase.from('Service').select();
    const { data: onetimeServices, error: onetimeError } = await supabase.from('OnetimeService').select();
    const { data: hourlyServices, error: hourlyError } = await supabase.from('HourlyService').select();
  
    if (serviceError || onetimeError || hourlyError) {
      console.error('Error fetching data:', serviceError || onetimeError || hourlyError);
      return [];
    }
  
    const completeServices = services?.map((service: Service) => {
      const onetimeService = onetimeServices?.find((ot: OnetimeService) => ot.serviceid === service.serviceid);
      const hourlyService = hourlyServices?.find((hs: HourlyService) => hs.serviceid === service.serviceid);
  
      if (onetimeService) {
        return {
          ...service,
          price: onetimeService.rate,
        };
      } else if (hourlyService) {
        return {
          ...service,
          price: hourlyService.rate,
        };
      } else {
        return service;
      }
    });

  
    return completeServices;
  }

export async function addPeople(
    firstname:string,
    middlename:string,
    lastname:string,
    phonenumber:string,
    emailaddress:string
){
    const supabase = createClient();

    // getting the largest id number from the table
    let largestidnumber;
    
    const { data: people } = await supabase.from('Person').select('personid').order('personid', {ascending:false});
    const peopleArr = Object.keys(people);
    
    const targetPerson = people[peopleArr[0]] // just filter out the first one

    Object.values(targetPerson).forEach((key)=>{
        largestidnumber = key
    })

    largestidnumber = largestidnumber + 1;

    const { error } = await supabase.from('Person').insert({
        personid: largestidnumber,
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        contactnumber: parseInt(phonenumber),
        emailaddress: emailaddress,
    })

    if(error)
        return error

    return 2;
    // get the last number in the schedule
}

export async function addCustomer(
    firstname:string,
    middlename:string,
    lastname:string,
    phonenumber:string,
    emailaddress:string,
    isMain:boolean
){
    const supabase = createClient();

    // PUTTING THE main customer TO Person
    // getting the largest id number from the table
    let largestpersonidnumber;
    
    
    const { data: people } = await supabase.from('Person').select('personid').order('personid', {ascending:false});
    const peopleArr = Object.keys(people);
    
    const targetPerson = people[peopleArr[0]] // just filter out the first one

    Object.values(targetPerson).forEach((key)=>{
        largestpersonidnumber = key
    })

    largestpersonidnumber = largestpersonidnumber + 1;

    const { error1 } = await supabase.from('Person').insert({
        personid: largestpersonidnumber,
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        contactnumber: parseInt(phonenumber),
        emailaddress: emailaddress,
    })

    let largestcustomeridnumber;
    let latestappointmentid;

    //gettng the next cutomer number
    const { data: customers } = await supabase.from('Customers').select('customerid').order('customerid', {ascending:false});
    const customerArr = Object.keys(customers);
    
    const targetCustomer = customers[customerArr[0]] // just filter out the first one

    Object.values(targetCustomer).forEach((key)=>{
        largestcustomeridnumber = key
    })

    largestcustomeridnumber = largestcustomeridnumber + 1;

    //getting the most recent appointment
    const { data: appointments } = await supabase.from('Appointment').select('appointmentid').order('appointmentid', {ascending:false});
    const appointmentArr = Object.keys(appointments);
    
    const targetAppointment = appointments[appointmentArr[0]] // just filter out the first one

    Object.values(targetAppointment).forEach((key)=>{
        latestappointmentid = key
    })

    const { error2 } = await supabase.from('Customers').insert({
        customerid:largestcustomeridnumber,
        personid: largestpersonidnumber,
        ismain: isMain,
        appointmentid: latestappointmentid
    });

    return error2;
    // get the last number in the schedule
}

export async function addOneAppointment(
    serviceid:string,
    isparkingspotneeded:boolean,
    //status
    //tracking number
    //discount
){
    const supabase = createClient();

    // getting the largest id number from the table
    let largestidnumber;
    
    const { data: appointment } = await supabase.from('Appointment').select('appointmentid').order('appointmentid', {ascending:false});
    const appointmentArr = Object.keys(appointment);
    
    const targetAppointment = appointment[appointmentArr[0]] // just filter out the first one

    Object.values(targetAppointment).forEach((key)=>{
        largestidnumber = key
    })

    largestidnumber = largestidnumber + 1;

    const { error } = await supabase.from('Appointment').insert({
        appointmentid: largestidnumber,
        serviceid:parseInt(serviceid),
        isparkingspotneeded:isparkingspotneeded,
        status:"Pending",
        trackingnumber: "123456",
        discount:15.0
    })

    if(error)
        return error

    return 2;
    // get the last number in the schedule
}

export async function fetchSchedules(){
    const supabase = createClient();

    const {data, error } = await supabase.from('Schedule').select();
    if (error) {
        console.error('Error fetching reservations:', error);
        return [];
    }
    return data;
}

export async function fetchFAQs(){
    const supabase = createClient();

    const { data, error } = await supabase
    .from('FAQ')
    .select('question, answer')

    if(error){
        console.error('Error fetching FAQs: ', error);
        return [];
    }

    return data;
}


/*
export async function addAppointment(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'POST') {
        const { dates, timeslot1, timeslot2, serviceid, 
            maincustomerfirstname, maincustomermiddlename, 
            maincustomerlastname, needsparking, additionalrequests, 
            additionalCustomers } = req.body;

        const supabase = createClient();

        const person_stored = await findPerson(maincustomerfirstname, maincustomermiddlename, maincustomerlastname, supabase);

        if(person_stored){
            console.log('passed correctly : ', person_stored);
        }
        
        // this adds the data, though im not sure how to add the data yet to the db
        // const { data, error } = await supabase.from('')
        //     .insert([
        //         {
        //             dates,
        //             timeslot1,
        //             timeslot2,
        //             serviceid,
        //             maincustomerfirstname,
        //             maincustomermiddlename,
        //             maincustomerlastname,
        //             needsparking,
        //             additionalrequests,
        //             additionalCustomers
        //         }
        //     ]);

    }
}
    */





