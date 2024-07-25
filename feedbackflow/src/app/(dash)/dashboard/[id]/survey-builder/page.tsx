"use client"
import Draggable from "@/components/dashColumn/ui/KanbanBoard/Draggable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Contact,
  YesOrNo,
  ShortQuestion,
  SlidingRating,
  MultipleChoice,
  Rating,
} from "@/components/dashColumn/ui/SurveyBuilderUI/ui";
import { useState, useEffect } from "react";
import Questions from "@/components/dashColumn/ui/QuestionTypes/Questions";
import ReviewSelection from "@/components/dashColumn/ui/ReviewSelection/ReviewSelection";
import Sidebar from "@/components/sidebar/Sidebar";
import {useParams} from 'next/navigation'
import {fetchSurveyData, createSurveyData, createDefaultQuestions} from '@/lib/supabase/queries/survey'
import { lessThan5StarQuestions, fiveStarQuestions } from '@/lib/constants'

const SurveyBuilder = () => {
  const {id} = useParams();
  const [questionType, setQuestionType] = useState(null);
  const [questionIdx, setQuestionIdx] = useState(1);
  const [surveyData, setSurveyData] = useState([lessThan5StarQuestions, fiveStarQuestions]);
  const [popup, setPopup] = useState({message: "", type: null, show: false});

  const fetchOrCreateSurvey = async () => {
    try {
      const { data, error } = await fetchSurveyData(id);
      if (error) throw error;

      if (data.length === 0) {
        const [lessThan5Data, fiveStarData] = await Promise.all([
          createSurveyData('less_than_5_star', id),
          createSurveyData('5_star', id)
        ]);

        await Promise.all([
          createDefaultQuestions(lessThan5Data.data[0].id, lessThan5StarQuestions),
          createDefaultQuestions(fiveStarData.data[0].id, fiveStarQuestions)
        ]);

        setSurveyData([lessThan5Data.data[0], fiveStarData.data[0]]);
      } else {
        setSurveyData(data);
      }
    } catch (error) {
      console.error(error);
      setPopup({ message: "An error occurred while fetching survey data.", type: "error", show: true });
    }
  };

  useEffect(() => {
    fetchOrCreateSurvey();
  }, [id]);

  const renderQuestion = (type, questionId) => {
    if (type === "intro") return null;
    switch (type) {
      case "contact-info":
        return <Contact />;
      case "yes-no":
        return <YesOrNo />;
      case "short-question":
        return <ShortQuestion questionId={questionId} questions={lessThan5StarQuestions} />;
      case "sliding":
        return <SlidingRating />;
      case "multiple-choice":
        return <MultipleChoice />;
      default:
        return <Rating />;
    }
  };

  if (!surveyData) return <div>Loading...</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow flex">
      <div className="my-4 mx-4">
      <div className="whitespace-nowrap flex flex-col md:flex-row mb-4">
        <h2 className="text-2xl font-bold pr-4">Survey Builder</h2>
        <h4 className="text-lg pt-1 font-semibold text-blue-500">
          Edit and modify your survey{" "}
        </h4>
      </div>

      <Tabs defaultValue="lessthan5" className=" ">
        <TabsList>
          <TabsTrigger value="lessthan5" className="text-blue-500">
            Less than 5 star review 💪
          </TabsTrigger>
          <TabsTrigger value="is5" className="text-blue-500">
            5-star review 🚀
          </TabsTrigger>
        </TabsList>
        <div className="mt-4 mb-4">
          <h4 className="text-lg font-bold">Survey Question</h4>
        </div>

        <div className="border border-gray-300 rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800">
          <TabsContent value="lessthan5">
            <div className="flex gap-4">
              <div className="flex-grow">
                <Draggable
                  showDraggableIcon={true}
                  questionList={surveyData[0].questions || []}
                />
              </div>
              <div className="bg-white border border-slate-200 mt-5 py-10 px-10 rounded-lg shadow-lg dark:bg-gray-800 w-96 h-96 break-words overflow-wrap relative flex flex-col justify-center items-center">
                <div className="absolute top-2 right-2">
                  <span>
                    {questionIdx}/{surveyData[0].questions ? surveyData[0].questions.length : 0}
                  </span>
                </div>
                <div className="flex justify-center items-center">
                  {renderQuestion(questionType, questionIdx)}
                </div>
              </div>

              <div className="flex-grow">
                <Questions
                  handleQuestionTypeChange={setQuestionType}
                  selectedType={questionType}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="is5">
            <div className="flex gap-4">
              <div className="flex-grow">
                <Draggable
                  showDraggableIcon={true}
                  questionList={surveyData[1].questions || []}
                />
              </div>
              <div className="bg-white border border-slate-200 mt-5 py-10 px-10 rounded-lg shadow-lg dark:bg-gray-800 w-96 h-96 break-words overflow-wrap relative flex flex-col justify-center items-center">
                <div className="absolute top-2 right-2">
                  <span>
                    {questionIdx}/{surveyData[1].questions ? surveyData[1].questions.length : 0}
                  </span>
                </div>
                <div className="flex justify-center items-center">
                  {renderQuestion(questionType, questionIdx)}
                </div>
              </div>

              <div className="flex-grow">
                <ReviewSelection/>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
      </div>
    </div>
  );
};

export default SurveyBuilder;