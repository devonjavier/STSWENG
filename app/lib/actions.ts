'use server';

import { createClient } from '@/utils/supabase/server';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { accountData } from '@/utils/supabase/interfaces';
import jwt from 'jsonwebtoken';
import { schedule } from '@/utils/supabase/interfaces';
import { NextResponse } from 'next/server';
import { fetchSchedules } from '@/utils/supabase/data'
import { create } from 'domain';

 
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

  cookies().set('token', token, {
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
  cookies().delete('token');
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

export async function changeCalendarStatus(selectedSlots : any, timeSlots : any) {
  console.log('BEFORE SUPABASE AWAIT');
  const supabase = await createClient();

  console.log('Selected Slots:', selectedSlots, 'Time Slots:', timeSlots);

  for (const date in timeSlots) {
    console.log("Current Date:", date);

    timeSlots[date].forEach(async (timeSlot, index) => {
      console.log("Time Slot:", timeSlot);
      console.log("Selected Status:", selectedSlots[date][index]);

      const split_time = timeSlot.split(' -')[0];


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