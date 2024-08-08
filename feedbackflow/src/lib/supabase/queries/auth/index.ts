"use server"

import {createClient} from '@/lib/supabase'


export const updateUsername = async (
  username,
  email,
) => {
  const supabase = await createClient()

  try {
    // Query the profile table for the given email
    
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('email', email);

    // Handle any errors from the query
    if (error) {
      console.error('Error fetching profile:', error);
      return {data: null, error:{message: 'Could not fetch profile'}};
    }

    // Check if the profile was found
    if (data.length === 0) {
      console.warn('No profile found for the given email:', email);
      return { data: null, error:{ message : 'No profile found for the given email'}}
    }

    // Update the username in the profile table
    const { id } = data[0]; // Assuming the profile table has an 'id' column
    console.log(id)
    const { updateError } = await supabase
      .from('profile')
      .update({ username })
      .eq('id', id);

    // Handle any errors from the update
    if (updateError) {
      console.log('Error updating username:', updateError);
      return {data: null, error: {message: 'Could not update username'}}
    }

      console.log(data, error)

    console.log('Username successfully updated');
    return { data, error: null }
  } catch (error) {
    // General error handling
    console.log('An error occurred:', error);
    return {data: null, error: {message:'An error occurred while updating the username'}}
  }
}

export const checkUserPlan = async (userId) => {
  try {
     const supabase = await createClient()
     const { data, error } = await supabase.from('profile')
                              .select("*")
                              .eq('id', userId)
    if (error) {
      console.log('Error fetching user plan:', error);
      return {data: null, error}
    }
    console.log(data)
    return { data, error: null }
  } catch(error) {
     console.log(error)
     return { data: null, error: { message: "Whoops something went wrong" } }     
  }   
}