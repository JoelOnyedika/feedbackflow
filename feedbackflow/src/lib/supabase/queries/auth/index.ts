import {createClient} from '@/lib/supabase'

const supabase = createClient()


export async function updateUsername({
  username,
  email,
}: z.infer<typeof FormSchema>) {
  try {
    // Query the profile table for the given email
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
      console.warn('No profile found for the given email:', email);
      throw new Error('No profile found for the given email');
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
      throw new Error('Could not update username');
    }

    console.log('Username successfully updated');
  } catch (error) {
    // General error handling
    console.log('An error occurred:', error);
    throw new Error('An error occurred while updating the username');
  }
}