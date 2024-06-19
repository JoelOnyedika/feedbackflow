import React, { useRef } from 'react';
import { AlignCenter, PencilLine, ChevronDown, ChevronUp } from 'lucide-react';
import { lessThanFiveStarQuestionListSelector, activeQuestionSelector, } from '@/lib/recoil/selectors';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { activeQuestionIdState } from '@/lib/recoil/atoms';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { EditSurveyDialog } from '@/components/dashColumn/ui/SurveyBuilderUI/ui/EditSurveyDialog';


interface IDraggableProps {
  questionList: any[];
  showDraggableIcon: boolean;
}
const Draggable = ({showDraggableIcon, questionList}: IDraggableProps ) => {
  const [questionId, setQuestionId] = useRecoilState(activeQuestionIdState);
  
  const setActiveQuestion = useSetRecoilState(activeQuestionSelector);
  
  const scrollRef = useRef(null);

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 100, behavior: 'smooth' }); 
    }
  };

  const scrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: -100, behavior: 'smooth' });
    }
  };

  const handleDraggableClick = (question: any) => {
    setActiveQuestion(question);
    setQuestionId(question.id);
  }

  return (
    <div className="border border-solid rounded-lg p-6 h-auto w-96 ">
      <div className="overflow-y-auto h-60" ref={scrollRef}>
        
        {questionList.map((data, index) => (
          <div key={index} className="my-5 animate-in" >
            <div className="inline-flex items-center justify-center whitespace-nowrap border border-solid rounded-lg p-5 space-x-5" onClick={() => handleDraggableClick(data)}>
              
             {showDraggableIcon && (<AlignCenter className="w-6 h-6 text-blue-500" />)} 
              <Dialog >
                <DialogTrigger>
                  <div className="p-2 rounded-md bg-purple-500 text-white">
              
                <PencilLine className="w-6 h-6 mr-3" />
              </div>
                </DialogTrigger>
                <EditSurveyDialog canAddOption={true} questionId={data.id}/>
              </Dialog>
              
              <h3 className="text-lg font-bold">{data.question} </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Draggable;