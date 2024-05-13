// Sidebar component
import React from 'react';
import {sidebarData} from '@/lib/constants/index';

const Sidebar = ({ onOptionClick }:any) => {
  const handleOptionClick = (option: any) => {
    onOptionClick(option);
  };

  return (
    <div className="h-screen w-64 bg-white border-r shadow-md">
      <div className="flex flex-col items-start justify-start h-full">
        <nav className="flex flex-col items-start w-full flex-1 overflow-auto">
        {sidebarData.map((item, index) => (
          <div className="flex items-center gap-3 w-full py-3 px-6 hover:bg-gray-100 transition-colors" onClick={() => handleOptionClick(item.option)} key={index}>
            {item.icon && <item.icon className="h-5 w-5" />}
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
          
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;