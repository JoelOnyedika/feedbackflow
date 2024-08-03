import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '@/components/ui/button';
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { surveyQuestionOptions } from '@/lib/constants';
import { questionListState, activeQuestionState } from '@/lib/recoil/atoms';
import { activeQuestionSelector, activeQuestionIdSelector } from '@/lib/recoil/selectors';
import { createSurveyQuestion, updateSurveyType } from '@/lib/supabase/queries/survey'

const Questions = (surveyId) => {
  const [selectedType, setSelectedType] = useState('');
  const [showQuestionUi, setShowQuestionUi] = useState(true);
  const [popup, setPopup] = useState({message: "", type: null, show: false});

  const handleAddQuestion = async () => {
    const newQuestion = {
      surveyId: surveyId,
      options: null,
      type: 'short-question', // Default option
      text: 'What do you think about our service?', // Default question text
    };
    try {
      const { data, error } = await createSurveyQuestion(newQuestion) 
      if (error) {
        console.log(error)
        setPopup({ message: error.message, type: 'error', show: true })
      }
      console.log(data)  
    } catch(error) {
      console.log(error)
      setPopup({ message: error.message, type: 'error', show: true })

    }
    

  };

  const handleQuestionTypeChange = async (option: string) => {
    const updatedType = {
      surveyId: surveyId,
      options: null,
      text: 'What do you think about our service?', 
    };
    try {
      const { data, error } = await updateSurveyType(option, surveyId) 
      if (error) {
        console.log(error)
        setPopup({ message: error.message, type: 'error', show: true })
      }
      console.log(data)  
    } catch(error) {
      console.log(error)
      setPopup({ message: error.message, type: 'error', show: true })

    }
  };
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-blue-500 font-semibold">Add Question</h2>
        <div className="flex items-center space-x-4">
          <Button size="icon" variant="ghost" onClick={handleAddQuestion}>
            <div className="hover:bg-gray-300 rounded-md p-2">
              <Plus className="w-5 h-5 text-blue-500" />
            </div>
            <span className="sr-only">Add List</span>
          </Button>
          <Button size="icon" variant="ghost">
           <div className="hover:bg-gray-300 rounded-md p-2">
            <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <span className="sr-only">Delete List</span>
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <RadioGroup>
      
          {showQuestionUi && surveyQuestionOptions.map((data) => (
            <div className="flex items-center space-x-4" key={data.option}>
              <RadioGroupItem
                className="peer sr-only"
                id={data.option}
                name="questionType"
                value={data.option}
                onClick={() => handleQuestionTypeChange(data.option)}
                checked={selectedType === data.option}
              />
              <Label
                className="flex items-center space-x-2 hover:bg-gray-200 cursor-pointer p-2 rounded-md"
                htmlFor={data.option}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    selectedType === data.option ? 'bg-blue-500' : 'bg-blue-200'
                  } text-white cursor-pointer`}
                >
                  <data.icon className="w-5 h-5" />
                </div>
                <span className="font-medium">{data.name}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default Questions;