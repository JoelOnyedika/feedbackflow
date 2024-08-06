'use server'

import {createClient} from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'


export const getAllUserProjects = async (userId) => {
     try {
       const supabase = await createClient()

       const { data, error } = await supabase.from('projects')
                              .select("*")
                              .eq('user_id', userId)
          if (error) {
               console.log(error)
               return { data: null, error }
          }
          console.log(data)
          return { data: data, error: null }     
     } catch(error) {
          console.log(error)
          return { data: null, error: { message: "Whoops something went wrong" } }     
     }
     

}

export const getAllUserOrganizations = async (userId) => {
     try {
          const supabase = await createClient()
       const { data, error } = await supabase.from('organization')
                              .select("*")
                              .eq('user_id', userId)
          if (error) {
               console.log(error)
               return { data: null, error }
          }
          console.log(data)
          return { data: data, error: null }     
     } catch(error) {
          console.log(error)
          return { data: null, error: { message: "Whoops something went wrong" } }     
     }
     

}


export const createOrganization = async (userId, name) => {
     const myUUID = uuidv4()
     try {
          const supabase = await createClient()
          const { data, error } = await supabase.from('organization').insert({ id: myUUID, user_id: userId, name: name  })
          if (error) {
               console.log(error)
               return { data: null, error }
          }
          console.log(data)
          return { data, error: error }

     } catch(error) {
          console.log(error)
          return { data: null, error: { message: "Whoops something went wrong" } }     
     }
}

export const createProject = async (userId, name, organization_id) => {
     const myUUID = uuidv4()
     try {
          const supabase = await createClient()
          const { data, error } = await supabase.from('projects').insert({ id: myUUID, user_id: userId, name: name, organization_id: organization_id  })
          if (error) {
               console.log(error)
               return { data: null, error }
          }
          console.log(data)
          return { data, error: error }

     } catch(error) {
          console.log(error)
          return { data: null, error: { message: "Whoops something went wrong" } }     
     }
}

