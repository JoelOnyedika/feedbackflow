import {createClient} from '@/lib/supabase'

export async function updateUsername({
  username,
  email,
}) {
  try {
    // Query the profile table for the given email
    const supabase = await createClient()
    console.log("the damn email", email)
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('email', email);

    // Handle any errors from the query
    if (error) {
      console.error('Error fetching profile:', error);
      throw new Error('Could not fetch profile');
    }

    // Check if the profile was found
    if (data.length === 0) {
      console.log('No profile found for the given email:', email);
      return {data: null, error: {message: "No profile found for the given email"}}
    }

    // Update the username in the profile table
    const { id } = data[0]; // Assuming the profile table has an 'id' column
    console.log(id, username)
    const { data: updateData, error: updateError } = await supabase
      .from('profile')
      .update({ username })
      .eq('id', id);

    // Handle any errors from the update
    if (updateError) {
      console.log('Error updating username:', updateError);
      return {data: null, error: {message: "Could not update username"}}
    }

    console.log('Username successfully updated', updateData);
    return { data: updateData, error: null }
  } catch (error) {
    // General error handling
    console.log('An error occurred:', error);
    return {data: null, error: {message: "An unexpected error occoured"}}
  }
}