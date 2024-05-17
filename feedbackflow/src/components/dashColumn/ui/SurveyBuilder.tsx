import Draggable from "@/components/dashColumn/ui/KanbanBoard/Draggable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SurveyBox from '@/components/dashColumn/ui/SurveyBuilderUI/SurveyBox';
import {Contact, YesOrNo, ShortQuestion, SlidingRating, MultipleChoice } from '@/components/dashColumn/ui/SurveyBuilderUI/ui';
import { useState } from "react";
import Questions from '@/components/dashColumn/ui/QuestionTypes/Questions';

const SurveyBuilder = () => {
  const [questionType, setQuestionType] = useState("short-question")

function handleQuestionTypeChange(questionType: string) {
    setQuestionType(questionType)
  }
  return (
    <div className="my-4 mx-4">
      <div className="whitespace-nowrap flex flex-col md:flex-row mb-4">
        <h2 className="text-2xl font-bold pr-4">Survey Builder</h2>
        <h4 className="text-lg pt-1 font-semibold text-blue-500">
          Edit and modify your survey{" "}
        </h4>
      </div>
      
      <Tabs defaultValue="lessthan5" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lessthan5" className="text-blue-500">Less than 5 star review 💪</TabsTrigger>
          <TabsTrigger value="5starreview" className="text-blue-500">5-star review 🚀</TabsTrigger>
        </TabsList>
        <div className="mt-4 mb-4">
          <h4 className="text-lg font-bold">
          Survey Question {questionType}
          </h4>
        </div>
        <TabsContent value="lessthan5">
          <div className="flex gap-4">
            <div>
              <Draggable />
            </div>
            <div>
                <SurveyBox>
{renderQuestion(questionType)}
               </SurveyBox>
            </div>
            <div>
              <Questions handleQuestionTypeChange={handleQuestionTypeChange} selectedType={questionType} />
            </div>
            
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SurveyBuilder;

const renderQuestion = (question: string) => {
  switch (question) {
    case "contact-info":
      return <Contact />
    case "yes-no":
      return <YesOrNo />
    case "short-question":
      return <ShortQuestion />
    case "sliding":
      return <SlidingRating />
    case "multiple-choice":
      return <MultipleChoice />
  }
}
