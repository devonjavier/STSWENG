'use server';

import { createClient } from '@/utils/supabase/server';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { accountData, pending_appointment, schedule, 
  Service, OnetimeService, HourlyService, FAQ} from '@/utils/supabase/interfaces';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { fetchSchedules } from '@/utils/supabase/data'
import { create } from 'domain';
import EditFAQs from '../(admin)/Admin/(dashboard)/edit-faqs/page';

 
export async function createCustomer(formData: FormData) {
    const rawFormData = {
        mainCustomerName: formData.get('customername'),
        AdditionalCustomer1: formData.get('additionalname1'),
        AdditionalCustomer2: formData.get('additionalname2'),
        AdditionalCustomer3: formData.get('additionalname3'),
        AddtionalRequests: formData.get('additionalreq'),
        needParking: formData.get('parking')
      };
      // Test it out:
      console.log(rawFormData);
}

// create session token & store in cookie
async function handleLogin(account : accountData, supabase : any){

  const token = jwt.sign({ personid: account.personid, username: account.username }, 
    'your-secret-key', 
    { expiresIn: '7d' }
  );

  (await cookies()).set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, 
    path: '/'
  });

  return '/Admin/all-reservations'; // Return the redirect URL
}
// Login function for admins, could still be cleaned up with try catch instead
export async function authenticate(formData: FormData) {
  const supabase = createClient()

  const formdata = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  }


  // fetch data 
  const { data, error } = await supabase
  .from('Admin')
  .select('password, personid, username')
  .eq('username', formdata.username.trim())
  .single();

  if(error){
    console.error('Error', error);
    return { success: false, message: 'Error fetching admin' };
  }

  if(!data){
    console.error('Details not found');
  } else {
    console.log(data);
  }

  // compare data gathered for authentication
  const passwordMatch = await bcrypt.compare(formdata.password, data.password);

  if (!passwordMatch) {
    return { success: false, message: 'Invalid password' };
  } else {
    try{
      const url = await handleLogin(data as accountData, supabase);
      return { success: true, url : url};
    } catch(error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login error' };
    }
  }
}

export async function findPerson(firstname : string, middlename : string, lastname : string, supabase : any){

  const found = await supabase
  .from('Person')
  .select('personid')
  .eq('firstname', firstname)
  .eq('middlename', middlename)
  .eq('lastname', lastname)
  .single();

  if(found){
    console.log(found.personid);

    return found;
  }
  else return false;
}

export async function handleLogout(){
  (await cookies()).delete('token');



}

export async function findPendingReservations(){
  const supabase = createClient();

  const pendingReservations = await supabase
  .from('Schedule')
  .select('*')
  .eq('status', 'Pending')

  console.log(pendingReservations);

  return pendingReservations;
}

export async function findAppointedReservations(){
  const supabase = createClient();

  const appointedReservations = await supabase
  .from('Schedule')
  .select('*')
  .eq('status', 'Appointed')

  console.log(appointedReservations);

  return appointedReservations;
}

export async function findDates(dates : any, dates_selected : any){
  const supabase = createClient();

  console.log(dates);
  console.log(dates_selected);

  const modifiedDates = await dates.map((obj : any, i : number) => {
    const splitDate = obj.date.split('T')[0]; 
    return {
      ...obj,
      date: splitDate
    };
  });

  const { data } = await supabase
  .from('Schedule') 
  .select('*')
  .in('date', modifiedDates.map((modifiedDate : schedule) => modifiedDate.date));

  
  const groupedByDate = data.reduce((acc: any, entry: any) => {
    const date = entry.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {});

  for (const date in groupedByDate) {
    groupedByDate[date].sort((a: any, b: any) => a.starttime.localeCompare(b.starttime));
  }

  console.log(groupedByDate);
  
  return groupedByDate;

}

export const getCurrentStatus = async (dates: any, id: any) => {
  const supabase = await createClient();

  const dateArray = dates.flat().map((obj : any) => obj.date);
  let statusData : any = {};

  for (const date of dateArray) {

    const { data, error } = await supabase
      .from('Schedule')
      .select('starttime, status')
      .eq('date', date);

    if (error) {
      console.error(error);
      return {};
    }


    if (data.length > 0) {
      // sort data before updating statusData
      data.sort((a : any, b : any) => new Date(`1970-01-01T${a.starttime}Z`).getTime() - new Date(`1970-01-01T${b.starttime}Z`).getTime());
      statusData[date] = data.map((entry : any) => entry.status === 'Unavailable');
    }
  }

  return statusData;
};

export async function changeCalendarStatus(selectedSlots : any, timeSlots : any) {
  console.log('BEFORE SUPABASE AWAIT');
  const supabase = await createClient();

  console.log('Selected Slots:', selectedSlots, 'Time Slots:', timeSlots);

  for (const date in timeSlots) {
    console.log("Current Date:", date);

    timeSlots[date].forEach(async (timeSlot : any, index : number) => {
      console.log("Time Slot:", timeSlot.time);
      console.log("Selected Status:", selectedSlots[date][index]);

      const split_time = timeSlot.time.split(' -')[0];


      const status = selectedSlots[date][index] === true ? 'Unavailable' : 'Available';

      // Update the status in the database
      const { data, error } = await supabase
        .from('Schedule')
        .update({ 'status' : status })
        .match({ date: date, starttime: split_time});

      if (error) {
        console.error('Error updating status:', error);
      } else {
        console.log('Updated status:', data);
      }
    });
  }
}

export async function acceptAppointment(appointmentData: any) {
  const supabase = createClient();

  console.log("ARG", appointmentData);
  appointmentData = appointmentData;

  // schedule
  const { error: scheduleError } = await supabase
    .from('Schedule')
    .update({ status: 'Appointed' })
    .match({
      date: appointmentData.date,
      appointmentid: appointmentData.appointmentid
    });

  if (scheduleError) {
    console.error(scheduleError);
  }

  // appointment
  const { error: appointmentError } = await supabase
    .from('Appointment')
    .update({ status: 'Accepted' })
    .match({ appointmentid: appointmentData.appointmentid });

  if (appointmentError) {
    console.error(appointmentError);
  }
}


export async function rejectAppointment(appointmentData : any) {
  const supabase = createClient();

  console.log(appointmentData);

  // schedule table
  const { error: scheduleError } = await supabase
    .from('Schedule')
    .update({ status: 'Available' })
    .match({
      date: appointmentData.date,
      starttime: appointmentData.starttime,
      appointmentid: appointmentData.appointmentid
    });

  if (scheduleError) {
    console.error(scheduleError);
  }

  // appointment table
  const { error: appointmentError } = await supabase
    .from('Appointment')
    .update({ status: 'Rejected' })
    .match({ appointmentid: appointmentData.appointmentid });

  if (appointmentError) {
    console.error(appointmentError);
  }
}

export async function editServices(services: Service[]) {
  const supabase = createClient();
  const { data: onetimeServices, error: onetimeError } = await supabase.from('OnetimeService').select();
  const { data: hourlyServices, error: hourlyError } = await supabase.from('HourlyService').select();

  if (onetimeError) {
    console.error('Error fetching onetime services:', onetimeError);
    return;
  }

  if (hourlyError) {
    console.error('Error fetching hourly services:', hourlyError);
    return;
  }

  for (const service of services) {
    console.log(service.serviceid);
    const { error: services_error } = await supabase
      .from('Service')
      .update({ title: service.title, description: service.description, imageName: service.imageName })
      .match({ serviceid: service.serviceid });

    if (services_error) {
      console.error('Error updating services db:', services_error);
    }

    const oneTimeFound = onetimeServices?.find((ot: OnetimeService) => ot.serviceid === service.serviceid);
    const hourlyFound = hourlyServices?.find((hs: HourlyService) => hs.serviceid === service.serviceid);

    if (oneTimeFound) {
      if (service.price != null) { // error handling for now
        const { error: onetime_error } = await supabase
          .from('OnetimeService')
          .update({ rate: service.price })
          .match({ serviceid: service.serviceid });

        if (onetime_error) {
          console.error('Error updating onetime services db:', onetime_error);
        }
      }
    } else if (hourlyFound) {
      if (service.price != null) { // error handling for now
        const { error: hourly_error } = await supabase
          .from('HourlyService')
          .update({ rate: service.price })
          .match({ serviceid: service.serviceid });

        if (hourly_error) {
          console.error('Error updating hourly services db:', hourly_error);
        }
      }
    }
  }
}

export async function editFAQs(faqs : FAQ[]) {
  console.log(faqs);
  const supabase = createClient(); 

    // delete all rows in FAQ
    const { error: deleteError } = await supabase
    .from('FAQ')
    .delete()
    .neq('id', 0);

  if (deleteError) {
    console.error('Error deleting all FAQs: ' + deleteError);
    return;
  }

  const updatedFaqs = faqs.map((faq, index) => ({
    ...faq,
    id: (6001 + index)
  }));

  // insert everything in faq
  const { error: insertError } = await supabase
    .from('FAQ')
    .insert(updatedFaqs);

  if (insertError) {
    console.error('Error inserting new FAQs: ' + insertError);
  }
}


export async function checkCookie(){
  const cookieStore = cookies();

  const hasCookie = (await cookieStore).has('token')
  console.log(hasCookie);

  return hasCookie;
}

export async function uploadPhoto(file: { name: string; data: string }) {
  const supabase = createClient();
  const fileExt = file.name.split('.').pop(); // file type
  const filePath = `serviceImages/${file.name}`;
  const contentType = `image/${fileExt}`;

  // base64 -> array buffer
  const arrayBuffer = base64ToArrayBuffer(file.data);
  const fileData = new Uint8Array(arrayBuffer);

  // upload to storage bucket
  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, fileData, {
      contentType: contentType,
    });

  if (error) {
    console.error('Error uploading photo:', error);
    return { success: false, message: 'Error uploading photo' };
  }

  const photoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${filePath}`;
  console.log("Uploaded photo URL:", photoUrl);
  return { success: true, photoUrl };
}


function base64ToArrayBuffer(base64: any) {
  const binaryString = Buffer.from(base64.split(',')[1], 'base64').toString('binary');
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}


export async function addTimeSlots(date: string) {
  const supabase = createClient();

  try {
    // Find the current maximum scheduleid
    const { data: maxIdData, error: maxIdError } = await supabase
      .from('Schedule')
      .select('scheduleid')
      .order('scheduleid', { ascending: false })
      .limit(1)
      .single();

    if (maxIdError && maxIdError.code !== 'PGRST116') {
      console.error('Error fetching max scheduleid:', maxIdError);
      return { success: false, message: 'Error fetching max scheduleid' };
    }

    // Increment scheduleid by 1, starting from 1000 if no rows are found
    let nextScheduleId = maxIdData ? maxIdData.scheduleid + 1 : 1000;

    // Generate time slots from 08:00 to 22:00
    const startHour = 8;
    const endHour = 22;

    const timeSlots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const starttime = `${hour.toString().padStart(2, '0')}:00:00`;
      const endtime = `${(hour + 1).toString().padStart(2, '0')}:00:00`;
      timeSlots.push({ scheduleid: nextScheduleId, starttime, endtime });
      nextScheduleId++;
    }

    // Function to check if a time slot already exists
    const timeSlotExists = async (starttime: any, endtime: any) => {
      const { data, error } = await supabase
        .from('Schedule')
        .select('scheduleid')
        .eq('date', date)
        .eq('starttime', starttime)
        .eq('endtime', endtime)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking for existing time slot:', error);
        return false;
      }

      return data ? true : false;
    };

    // Insert each time slot into the Schedule table
    const insertPromises = timeSlots.map(async ({ scheduleid, starttime, endtime }) => {
      const exists = await timeSlotExists(starttime, endtime);

      if (exists) {
        console.log(`Time slot ${starttime} - ${endtime} already exists for date ${date}`);
        return { success: false, message: `Time slot ${starttime} - ${endtime} already exists` };
      }

      const { data, error } = await supabase
        .from('Schedule')
        .insert({
          scheduleid: scheduleid,
          date: date,
          starttime: starttime,
          endtime: endtime,
          status: 'Available',
          appointmentid: null
        });

      if (error) {
        console.error('Error inserting time slot:', starttime, "-", endtime, error);
        return { success: false, message: 'Error inserting time slot' + starttime };
      }

      return { success: true, message: 'Time slot added successfully' };
    });

    console.log("DATE:", date);

    // Wait for all insertions to complete
    const results = await Promise.all(insertPromises);
    console.log('Time slots added:', results);

    return { success: true, message: 'All time slots added successfully' };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, message: 'Unexpected error occurred' };
  }
}

export async function comparePassword(password : string, confirmPassword : string){

  const match = await bcrypt.compare(password, confirmPassword);

  if(match){
    return true;
  } else return false;
}



export async function addItem(item: { itemid : Number, itemname: String, description: String, price: Number, imageName: String, quantity: Number }) {
  const supabase = createClient();

  try {    
    // Function to check if equipment already exists
    const equipmentExists = async () => {
      const { data, error } = await supabase
        .from('Items')
        .select('itemid')
        .eq('itemname', item.itemname)
        .eq('description', item.description)
        .eq('price', item.price)
        .eq('imageName', item.imageName)
        .eq('quantity', item.quantity)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error equipment already exists:', error);
        return false;
      }

      return data ? true : false;
    };

    // Insert equipment into database
      const exists = await equipmentExists();

      if (exists) {
        console.log(`The equipment entry already exists`);
        return { success: false, message: `Error inserting equipment, the equipment already exists` };
      }

      const { data, error } = await supabase
        .from('Items')
        .insert({
          itemid: item.itemid,
          itemname: item.itemname,
          description: item.description,
          price: item.price,
          imageName: item.imageName,
          quantity: item.quantity
        });

      if (error) {
        console.error('Error inserting equipment:', error);
        return { success: false, message: 'Error inserting equipment' };
      }

      return { success: true, message: 'Equipment added successfully' };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, message: 'Unexpected error occurred' };
  }
}


// export async function handleSignup(formData : FormData){
//   const supabase = createClient();

//   const rawFormData = {
//     username : formData.get('username'),
//     password : formData.get('password')
//   }



//   const { error } = await supabase
//   .from('')
// }


// sign up and add to auth.users table

// possible sign up for admins?
// export async function signup(formData: FormData) {
//     const supabase = createClient()
  
//     // type-casting here for convenience
//     // in practice, you should validate your inputs
//     const data = {
//       email: formData.get('email') as string,
//       password: formData.get('password') as string,
//     }
  
//     const { error } = await supabase.auth.signUp(data)
  
//     if (error) {
//       redirect('/error')
//     }
  
//     revalidatePath('/', 'layout')
//     redirect('/')
//   }