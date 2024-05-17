import React, { useRef } from 'react';
import { AlignCenter, PencilLine, ChevronDown, ChevronUp } from 'lucide-react';

const Draggable = () => {
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

  return (
    <div className="border border-solid rounded-lg p-6 h-auto ">
      <div className="overflow-y-auto h-96" ref={scrollRef}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="my-5">
            <div className="inline-flex items-center justify-center whitespace-nowrap border border-solid rounded-lg p-5 space-x-5">
              <AlignCenter className="w-6 h-6 text-blue-500" />
              <div className="p-2 rounded-md bg-purple-500 text-white">
                <PencilLine className="w-6 h-6 mr-3" />
              </div>
              <h3 className="text-lg font-bold">Kanban {i + 1}</h3>
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