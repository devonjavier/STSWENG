'use server'

import { createClient } from '@/utils/supabase/server'
import bcrypt from 'bcrypt'

// Login function for admins
export async function login(formData: FormData) {
  const supabase = createClient()

  const formdata = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  }

  // check if data was received
  console.log(formdata);

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
  }

  // confirm if person is admin
  

  // need to create cookies for user next



  




 
}





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