'use server'

import { createClient } from '@/utils/supabase/server'
import { service } from '@/utils/supabase/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'


export async function fetchAppointments() {
    const supabase = createClient();
    const { data, error } = await supabase.from('Reservations').select();
    if (error) {
      console.error('Error fetching reservations:', error);
      return [];
    }
    return data;
}

export async function fetchSchedule() {
    const supabase = createClient();
    const { data, error} = await supabase.from('Schedule').select();

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


export async function addAppointment(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'POST') {
        const { dates, timeslot1, timeslot2, serviceid, 
            maincustomerfirstname, maincustomermiddlename, 
            maincustomerlastname, needsparking, additionalrequests, 
            additionalCustomers } = req.body;

        const supabase = createClient();
        
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


