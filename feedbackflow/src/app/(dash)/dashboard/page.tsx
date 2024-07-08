"use client"

import React, { useState } from 'react';

const ProjBoard = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSidebarOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex">
   Create project
    </div>
  );
};

export default ProjBoard;