'use server'

import { createClient } from '@/utils/supabase/server'
import { service } from '@/utils/supabase/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'
import { findPerson } from '@/app/lib/actions'
import { permission } from 'process'


export async function fetchAppointments() {
    // for all-reservations page
    const supabase = createClient();
    const { data : appointments, error } = await supabase
    .from('Appointment')
    .select('appointmentid, serviceid, status');

    // if (error) {
    //   console.error('Error fetching reservations:', error);
    //   return [];
    // }

    // const data = appointments.forEach((appointment, index : number) => {
    //     console.log(appointment['appointmentid']);

    //     const { data : schedule, error : schedule_error} = supabase
    //     .from('Schedule')
    //     .select('date, starttime')
    //     .eq('appointmentid', appointment['appointmentid'])
    //     .single();

    //     const { data : service, error : service_error} = supabase
    //     .from('Service')
    //     .select('title')
    //     .eq('serviceid', appointment['serviceid'])
    //     .single();

    //     const { data : customer, error : customer_error} = supabase
    //     .from('Customers')
    //     .select('personid')
    //     .eq('appointmentid', appointment['appointmentid'])
    //     .single();

    //     const { data : persons, error : persons_error } = supabase
    //     .from('Person')
    //     .select('firstname, middlename, lastname')
    //     .eq('personid', customer['personid'])
    //     .single();

    //     console.log(
    //         appointment['appointmentid'],
    //     );



    //     return(
    //         {
    //             appointmentid : appointment.appointmentid,
    //             date : schedule.date,
    //             starttime : schedule.starttime,
    //             reservee : persons.firstname + ' ' + persons.middlename + ' ' + persons.lastname,
    //             service : service.title,
    //             status : appointment.status
    //         }
    //     );


    // });

    // console.log()

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





