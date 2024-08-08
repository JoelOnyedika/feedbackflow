'use server'

import {createClient} from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'
import { createRandomRGB } from '@/lib/funcs'
import { checkUserPlan } from '@/lib/supabase/queries/auth'


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


export const confirmUserOrgPlan = async (userId) => {
  try {
     const supabase = await createClient()
     const { data, error } = await checkUserPlan(userId)
     if (error) {
          console.log(error)
          return { data: null, error }
     }
     if (data.plan_name === 'Free') {
          return {data: 1 }
     }
  } catch(error) {
     console.log(error)
     return { data: null, error: { message: "Whoops something went wrong" } }     

  }
}

export const confirmUserProjectPlan = async (userId) => {
  try {
     const supabase = await createClient()
     const { data, error } = await checkUserPlan(userId)
     if (error) {
          console.log(error)
          return { data: null, error }
     }
     if (data[0].plan_name === 'Free') {
          console.log(data)
          return {data: 2 }
     }
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

export const createProject = async (userId, name, organization_id, description) => {
     const myUUID = uuidv4()
     try {
          const supabase = await createClient()
          const bgColor = createRandomRGB()
          const { data, error } = await supabase.from('projects').insert({ id: myUUID, user_id: userId, name: name, organization_id: organization_id, description: description, bg_color: bgColor })
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

export const doesProjectNameExist = async (userId, name) => {
  const myUUID = uuidv4();
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('projects').select('*').eq('user_id', userId);
    
    if (error) {
      console.log(error);
      return { data: null, error };
    }
    
    console.log('data', data);
    
    // Check if any project with the given name exists
    const projectExists = data.some(item => item.name === name);

    if (projectExists) {
      console.log('project exists', name);
      return { data: true, error: { message: "This name already exists. Please use another name for your project" } };
    } else {
      return { data: false, error: null };
    }
    
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Whoops something went wrong" } };
  }
};



export const getProjectsByOrganizationId = async (organization_id) => {
     try {
          const supabase = await createClient()
          const { data, error } = await supabase.from('projects').select('*').eq('organization_id', organization_id)
          if (error) {
               console.log(error)
               return { data: null, error }
          }
          console.log(data)
          return { data, error: null }

     } catch(error) {
          console.log(error)
          return { data: null, error: { message: "Whoops something went wrong" } }     
     }
}
