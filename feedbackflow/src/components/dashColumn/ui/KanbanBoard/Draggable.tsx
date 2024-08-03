'use client'

import React, { useRef, useState } from "react";
import { AlignCenter, PencilLine, ChevronDown, ChevronUp } from "lucide-react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EditSurveyDialog from "@/components/dashColumn/ui/SurveyBuilderUI/ui/EditSurveyDialog";

interface IDraggableProps {
  questionList: any[];
  showDraggableIcon: boolean;
}
const Draggable = ({ showDraggableIcon, questionList }: IDraggableProps) => {
  const [questionId, setQuestionId] = useState(null);

  const scrollRef = useRef(null);

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 100, behavior: "smooth" });
    }
  };

  const scrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: -100, behavior: "smooth" });
    }
  };

  const handleDraggableClick = (question: any) => {
    setQuestionId(question.id);
  };

  return (
    <div className="">
      <div className="overflow-y-auto" ref={scrollRef}>
        {questionList.map((data, index) => (
          <div key={index} className="my-5 animate-in ">
            <div
              className="inline-flex items-center hover:bg-gray-200 cursor-pointer justify-center whitespace-nowrap border border-solid rounded-lg p-5 space-x-2"
              onClick={() => handleDraggableClick(data)}
            >
              {showDraggableIcon && (
                <AlignCenter className="w-4 h-4 text-blue-500" />
              )}
              <Dialog>
                <DialogTrigger>
                  <div className="p-2 rounded-md bg-purple-500 text-white">
                    <PencilLine className="w-4 h-4" />
                  </div>
                </DialogTrigger>
                <EditSurveyDialog canAddOption={true} questionId={data.id} />
              </Dialog>

              <h3 className="text-sm font-bold">{data.question} </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Draggable;
