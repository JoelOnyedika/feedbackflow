import React, { ReactNode } from 'react';

interface DoubleCircleIconProps {
  icon: React.ComponentType<any>;
  // title?: string;
  // paragraph?: string;
}

const DoubleCircleIcon: React.FC<DoubleCircleIconProps> = ({ icon }) => {
  const CircleIcon:any = icon;
  return (
    <div className="w-16 h-16 my-5 rounded-full bg-blue-200 flex items-center justify-center">
      <div className="p-3 rounded-full bg-blue-300">
        <CircleIcon color="aliceblue" />
      </div>
    </div>
  );
};

export default DoubleCircleIcon;