"use client"

import React, { useState } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import Dash from "@/components/dashColumn/Dash";


const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSidebarOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex">
      <Sidebar onOptionClick={handleSidebarOptionClick} />
      <div className="flex-grow flex">
         <Dash selectedOption={selectedOption} />
      </div>
    </div>
  );
};

export default Dashboard;