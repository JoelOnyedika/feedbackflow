                  import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '@/components/ui/button';
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { surveyQuestionOptions } from '@/lib/constants';
import { questionListState, activeQuestionState } from '@/lib/recoil/atoms';
import { activeQuestionSelector, activeQuestionIdSelector } from '@/lib/recoil/selectors';

const Questions = () => {
  const questionId = useRecoilValue(activeQuestionIdSelector);
  const [questions, setQuestions] = useRecoilState(questionListState);
  const [selectedType, setSelectedType] = useState('');
 const [showQuestionUi, setShowQuestionUi] = useState(false);
  const generateId = () => '_' + Math.random().toString(36).substr(2, 9);
  const [questionIdx, setQuestionIdx] = useState(1);

  const handleAddQuestion = () => {
    setQuestionIdx(questionIdx + 1)
    const newQuestion = {
      id: generateId(),
      option: 'short-question', // Default option
      question: 'What do you think about our service?', // Default question text
      idx: questionIdx,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionTypeChange = (option: string) => {
    if (questionId) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId && question.id !== 'intro'
            ? { ...question, option: option }
            : question
        )
      );
      setSelectedType(option); // Update the selected type
    }
  };
useEffect(() => {
   questionId !== null && questionId !== 'intro' &&
   setShowQuestionUi(true)
 }, [questionId])
  
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-blue-500 font-semibold">Add Question</h2>
        <div className="flex items-center space-x-4">
          <Button size="icon" variant="ghost" onClick={handleAddQuestion}>
            <Plus className="w-5 h-5 text-blue-500" />
            <span className="sr-only">Add List</span>
          </Button>
          <Button size="icon" variant="ghost">
            <Trash2 className="w-5 h-5 text-red-500" />
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