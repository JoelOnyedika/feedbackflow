// CenterColumn component
import React from 'react';
import {Dashboard, Reviews, Pricing, SurveyBuilder} from '@/components/dashColumn/ui';

const DashColumn = ({ selectedOption }: any) => {
  let centerContent;

  switch (selectedOption) {
    case 'reviews':
     return <Reviews/>;
    case 'plan':
      return <Pricing/>;
    case 'dashboard':
      return <Dashboard/>
      
      case 'widget':
      centerContent = <p>This is the widget center column content.</p>;
      break;
      case 'survey-builder':
      return <SurveyBuilder/>;
    default:
      return <Dashboard/>
  }

  return (
    <div className="center-column">
      {centerContent}
    </div>
  );
};

export default DashColumn;