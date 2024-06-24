// CenterColumn component
import React from 'react';
import {Dashboard, Reviews, Pricing, SurveyBuilder, Widget} from '@/components/dashColumn/ui';

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
        return <Widget/>
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