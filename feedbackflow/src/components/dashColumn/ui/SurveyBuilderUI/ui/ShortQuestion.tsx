"use client"

import {useState, useEffect} from "react";
import { lessThanFiveStarQuestionListSelector } from '@/lib/recoil/selectors'; 
import { useRecoilValue } from 'recoil';

const ShortQuestion = ({questionId, questions}: any) => {
console.log("questions", questions)
  const [question, setQuestion] = useState("") 
  
const allQuestions = useRecoilValue(lessThanFiveStarQuestionListSelector);
  
   const handleRenderSurveyQuestionChange = () => {
    if (questionId) {
      const foundQuestion = allQuestions.find(question => question.id === questionId);
      if (foundQuestion) {
        setQuestion(foundQuestion.question);
      console.log("from recoil",foundQuestion.question)
      }
    }
  };

  useEffect(() => {
    handleRenderSurveyQuestionChange();
  }, [questions])
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold break-words">What do you think about our service?
        {question}</h2>
      <div className="relative w-full max-w-md">
        <input
          className="w-full border-b-2 border-b-gray-300 dark:border-b-gray-600 focus:outline-none focus:border-b-gray-900 dark:focus:border-b-gray-50 px-0 py-2 text-lg"
          placeholder="Type your answer here..."
          type="text"
        />
      </div>
    </div>
  )
}

export default ShortQuestion