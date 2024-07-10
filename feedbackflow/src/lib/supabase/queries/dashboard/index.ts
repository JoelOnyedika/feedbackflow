'use server'

import {createClient} from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

const supabase = createClient()

export const getAllUserProjects = async (userId) => {
     try {
       const { data, error } = supabase.from('projects')
                              .select("*")
                              .eq('userId', userId)
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
       const { data, error } = supabase.from('organization')
                              .select("*")
                              .eq('userId', userId)
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
          const { data, error } = supabase.from('organization').insert({ id: myUUID, userId: userId, name: name  })
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
          const { data, error } = supabase.from('projects').insert({ id: myUUID, userId: userId, name: name, organization_id: organization_id  })
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

