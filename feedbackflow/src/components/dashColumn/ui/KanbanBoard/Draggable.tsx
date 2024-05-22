import React, { useRef } from 'react';
import { AlignCenter, PencilLine, ChevronDown, ChevronUp } from 'lucide-react';
import { questionListSelector, activeQuestionSelector, } from '@/lib/recoil/selectors';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { activeQuestionIdState } from '@/lib/recoil/atoms';


const Draggable = () => {
  const [questionId, setQuestionId] = useRecoilState(activeQuestionIdState);
  const questionList = useRecoilValue(questionListSelector);
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
              
              <AlignCenter className="w-6 h-6 text-blue-500" />
              <div className="p-2 rounded-md bg-purple-500 text-white">
                {data.option}
                <PencilLine className="w-6 h-6 mr-3" />
              </div>
              <h3 className="text-lg font-bold">{data.question} </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={scrollUp} className="p-2 bg-slate-400 text-white rounded-lg">
          <ChevronUp className="w-6 h-6" />
        </button>
        <button onClick={scrollDown} className="p-2 bg-slate-400 text-white rounded-lg">
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Draggable;