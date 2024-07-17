'use server'

import { createClient } from '@/utils/supabase/server'
import { allService, Service, OnetimeService, HourlyService } from '@/utils/supabase/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'
import { findPerson } from '@/app/lib/actions'
import { permission } from 'process'
import { create } from 'domain'



export async function fetchAppointments() {
    // for all-reservations page
    const supabase = createClient();
    const { data : appointments, error } = await supabase
    .from('Appointment')
    .select('appointmentid, serviceid, status');

    const appointmentDetails = await Promise.all(appointments.map(async (appointment) => {
        const { data: schedule, error: scheduleError } = await supabase
          .from('Schedule')
          .select('date, starttime')
          .eq('appointmentid', appointment.appointmentid);
    
        if (scheduleError) {
          console.error(`Error fetching schedule for appointment ${appointment.appointmentid}:`, scheduleError);
          return null;
        }

        if (!schedule || schedule.length === 0 || !appointment.appointmentid) {
            return null;
        }
    
        // If schedule is found, merge the details
        if (schedule && schedule.length > 0) {
            const serviceid = schedule[0].serviceid;
      
            const { data: service, error: serviceError } = await supabase
              .from('Service')
              .select('title')
              .eq('serviceid', appointment.serviceid);
      
            if (serviceError) {
              console.error(`Error fetching service title for service ${serviceid}:`, serviceError);
              return null;
            }
      
            // Merge the details
            if (service && service.length > 0) {
              return {
                ...appointment,
                date: schedule[0].date,
                starttime: schedule[0].starttime,
                title: service[0].title
              };
            }
        }
        
        return appointment;
    
      }));
    


     const filteredAppointmentDetails = appointmentDetails.filter(detail => detail !== null);

    console.log(filteredAppointmentDetails);
    
      return filteredAppointmentDetails;
}

export async function fetchCalendarData(selectedDate : any){

    const supabase = createClient();
    const offset = selectedDate.getTimezoneOffset();
    const adjustedDate = new Date(selectedDate.getTime() - (offset * 60 * 1000));
    const formattedDate = adjustedDate.toISOString().split('T')[0]; 

    const { data : schedules, error : schedules_error} = await supabase
    .from('Schedule')
    .select('appointmentid, starttime, endtime')
    .eq('date', formattedDate)
    .limit(1)

    console.log(formattedDate);
    console.log(schedules);

   if(schedules_error){
    console.error(schedules_error);
   }

   const calendarData = await Promise.all(
    schedules.map(async (schedule) => {
      const { data: customerData, error: customerError } = await supabase
        .from('Customers')
        .select('*')
        .eq('appointmentid', schedule.appointmentid);



      if (customerError) {
        console.error('Error fetching customer ID:', customerError);
        return null;
      }

      const customer = customerData.length > 0 ? customerData[0] : null;
      
      if (!customer) {
        console.error('No customer found for appointment:', schedule.appointmentid);
        return null;
      }

      const cust = customerData[0];
      const cust_id = cust.personid;

      const { data: persons, error: personsError } = await supabase
        .from('Person')
        .select('firstname, middlename, lastname, emailaddress, contactnumber')
        .eq('personid', cust_id)

      
      if(personsError){
        console.error('Error : ', personsError );
        return null;
      }
      const per = persons.length > 0 ? persons[0] : null;

      if(!per){
        console.error('No person found for appointment: ' , schedule.appointmentid);
        return null
      }

      const { data: appointments, error: appointmentsError } = await supabase
        .from('Appointment')
        .select('serviceid, isparkingspotneeded')
        .eq('appointmentid', schedule.appointmentid)

        const app = appointments[0];
        const app_id = app.serviceid;


      if (appointmentsError) {
        console.error('Error fetching appointment data:', appointmentsError);
        return null;
      }

      const { data: services, error: servicesError } = await supabase
        .from('Service')
        .select('title')
        .eq('serviceid', app_id)

        const ser = services[0];


      if (servicesError) {
        console.error('Error fetching service data:', servicesError);
        return null;
      }

      return {
        name: `${per.firstname} ${per.middlename} ${per.lastname}`,
        contactnumber: per.contactnumber,
        emailaddress: per.emailaddress,
        isparkingspotneeded: app.isparkingspotneeded,
        title: ser.title,
        date: formattedDate,
        starttime: schedule.starttime,
        endtime: schedule.endtime,
        appointmentid : schedule.appointmentid
      };
    })
  );

  console.log('Calendar Data:', calendarData.filter(item => item !== null));
  return calendarData.filter(item => item !== null);
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


    const completeServices = services?.map((service : allService) => {
        
    const onetimeservice = onetimeServices?.find((ot : allService) => ot.serviceid === service.serviceid);
    const hourlyservice = hourlyServices?.find((h : allService) => h.serviceid === service.serviceid);

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
    .select('*')

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





