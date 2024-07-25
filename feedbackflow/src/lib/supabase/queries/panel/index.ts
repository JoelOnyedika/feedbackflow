'use server'

import {createClient} from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'



export const getAllReviews = async (projectId: number) => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('reviews').select("*").eq('project_id', projectId)
  if (error) {
    console.log(error)
    return { data: null, error: { message: error.message }}
  }
  console.log(data)
  return { data: data, error: null }
  } catch(error) {
    console.log(error);
    return { data: null, error: { message: "Whoops something went wrong" } }
  }
}


