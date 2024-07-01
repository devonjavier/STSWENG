'use server'

import { createClient } from '@/utils/supabase/server'
import { service } from '@/utils/supabase/interfaces'


export async function fetchReservations() {
    const supabase = createClient();
    const { data, error } = await supabase.from('Reservations').select();
    if (error) {
      console.error('Error fetching reservations:', error);
      return [];
    }
    return data;
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
