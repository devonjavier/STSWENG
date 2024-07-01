'use server'

import { createClient } from '@/utils/supabase/server';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { accountData } from '@/utils/supabase/interfaces';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


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
      return { success: true, url};
    } catch(error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login error' };
    }
  }
}




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