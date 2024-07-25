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
    const { data, error }: any = supabase.from('surveys').insert({})
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