import Draggable from "@/components/dashColumn/ui/KanbanBoard/Draggable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SurveyBox from '@/components/dashColumn/ui/SurveyBuilderUI/SurveyBox';
import { Contact, YesOrNo, ShortQuestion, SlidingRating, MultipleChoice, Rating } from '@/components/dashColumn/ui/SurveyBuilderUI/ui';
import { useState, useEffect } from "react";
import Questions from '@/components/dashColumn/ui/QuestionTypes/Questions';
import { useRecoilValue } from 'recoil';
import { activeQuestionIdSelector, lessThanFiveStarQuestionListSelector, higherThanFiveStarQuestionListSelector } from '@/lib/recoil/selectors';

const SurveyBuilder = () => {
  const questionId = useRecoilValue(activeQuestionIdSelector);
  const questions = useRecoilValue(lessThanFiveStarQuestionListSelector);
  const [questionType, setQuestionType] = useState(null);
const [questionIdx, setQuestionIdx] = useState(1);
  const questionList = useRecoilValue(lessThanFiveStarQuestionListSelector);
  

  const questionListHigher = useRecoilValue(higherThanFiveStarQuestionListSelector);
  
  const handleRenderSurveyQuestionChange = () => {
    if (questionId) {
      const foundQuestion = questions.find(question => question.id === questionId);
      if (foundQuestion) {
        setQuestionType(foundQuestion.option);
        setQuestionIdx(questionId === 'intro' ? 1 : foundQuestion.idx + 1);
      }
    }
  };

  useEffect(() => {
    handleRenderSurveyQuestionChange();
  }, [questionId, questions]);

  const renderQuestion = (type: string, questionId: string) => {
    if (type === 'intro')
      return null
    switch (type) {
      case "contact-info":
        return <Contact />;
      case "yes-no":
        return <YesOrNo />;
      case "short-question":
        return <ShortQuestion questionId={questionId} questions={questions}/>;
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
            Survey Question
          </h4>
        </div>
        <TabsContent value="lessthan5">
          <div className="flex gap-4">
            <div>
              <Draggable showDraggableIcon={true} questionList={questionList} />
            </div>
            <div>
              
              <SurveyBox>
                <div>
                  <div>
                    <span>{questionIdx}/{questions.length}</span>
                  </div>
                  <div>{renderQuestion(questionType, questionId)}
                  </div>
                </div>
              </SurveyBox>
            </div>
            <div>
              <Questions handleQuestionTypeChange={setQuestionType} selectedType={questionType} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="5starreview">
          <div className="flex gap-4">
            <div>
              <Draggable showDraggableIcon={false} questionList={questionListHigher} />
            </div>
            <div>
              
              <SurveyBox>
                <div>
                  <div>
                    <span>{questionIdx}/{questions.length}</span>
                  </div>
                  <div>{renderQuestion(questionType, questions.question)}
                  </div>
                </div>
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