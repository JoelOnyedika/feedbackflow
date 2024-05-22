import Draggable from "@/components/dashColumn/ui/KanbanBoard/Draggable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SurveyBox from '@/components/dashColumn/ui/SurveyBuilderUI/SurveyBox';
import { Contact, YesOrNo, ShortQuestion, SlidingRating, MultipleChoice, Rating } from '@/components/dashColumn/ui/SurveyBuilderUI/ui';
import { useState, useEffect } from "react";
import Questions from '@/components/dashColumn/ui/QuestionTypes/Questions';
import { useRecoilValue } from 'recoil';
import { activeQuestionIdSelector, questionListSelector } from '@/lib/recoil/selectors';

const SurveyBuilder = () => {
  const questionId = useRecoilValue(activeQuestionIdSelector);
  const questions = useRecoilValue(questionListSelector);
  const [questionType, setQuestionType] = useState(null);

  const handleRenderSurveyQuestionChange = () => {
    if (questionId) {
      const foundQuestion = questions.find(question => question.id === questionId);
      if (foundQuestion) {
        setQuestionType(foundQuestion.option);
      }
    }
  };

  useEffect(() => {
    handleRenderSurveyQuestionChange();
  }, [questionId, questions]);

  const renderQuestion = (question: string) => {
    switch (question) {
      case "contact-info":
        return <Contact />;
      case "yes-no":
        return <YesOrNo />;
      case "short-question":
        return <ShortQuestion />;
      case "sliding":
        return <SlidingRating />;
      case "multiple-choice":
        return <MultipleChoice />;
      default:
        return <Rating/>;
    }
  };

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
              <Questions handleQuestionTypeChange={setQuestionType} selectedType={questionType} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SurveyBuilder;