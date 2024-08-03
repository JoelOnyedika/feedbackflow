"use server"
  
import { createClient } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export const fetchSurveyData = async (projectId: string) => {
  try {
    const supabase = await createClient()
    const { data, error }: any = supabase.from('surveys').select("*").eq('project_id', projectId)
    if (error) {
      console.log(error)
      return { data: null, error: { message: error.message }}
    }
    console.log(data)
    return { data: data, error: null }
  } catch(error) {
    console.log(error)
    return { data: null, error: { message: "Whoops, an unexpected error occurred, please refresh" }}
  }
}

export const createSurveyData = async (type:string, projectId: string) => {
  try {
    const supabase = await createClient()
    const id = uuidv4()
    const { data, error }: any = supabase.from('surveys').insert({ id, projectId, type })
    if (error) {
      console.log(error)
      return { data: null, error: { message: error.message }}
    }
    console.log(data)
    return { data: data, error: null }
  } catch(error) {
    console.log(error)
    return { data: null, error: { message: "Whoops, an unexpected error occurred, please refresh" }}
  }
}

export async function createDefaultQuestions(surveyId: string, defaultQuestions: any[]) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
    .from('questions')
    .insert(defaultQuestions.map(q => ({ ...q, survey_id: surveyId })))
  return { data, error }
  } catch(error) {
    console.log(error)
    return { data: null, error: { message: "Whoops, an unexpected error occurred, please refresh" }}
  }
  
}

export const createSurveyQuestion = async (questionData) => {
    const supabase = await createClient()
     const myUUID = uuidv4()
     const { surveyId, options, type, text } = questionData
     try {
          const { data, error } = await supabase.from('questions').insert({ id: myUUID, survey_id: surveyId, type: type, text: text, options: options  })
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


export const updateSurveyType = async (type, surveyId) => {
     try {
          const { data, error } = supabase.from('questions').upsert({ type: type  }).eq('survey_id', surveyId)
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