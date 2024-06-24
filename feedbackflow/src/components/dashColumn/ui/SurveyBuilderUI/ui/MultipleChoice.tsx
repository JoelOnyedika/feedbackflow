import { useState } from 'react';
import {multipleChoiceOptions} from '@/lib/constants'
const MultipleChoice = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="">
      <h2 className="text-md font-bold mb-4 text-gray-900 dark:text-gray-100">
        How would you rate your experience?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Please select one option that best describes your feelings.
      </p>
      <div className="space-y-4">
        {multipleChoiceOptions.map(option => (
          <div key={option.id} className="flex items-center space-x-3">
            <input
              type="radio"
              id={option.id}
              name="rating"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={handleOptionChange}
              className="h-5 w-5 text-blue-500"
            />
            <label htmlFor={option.id} className="flex items-center space-x-2">
              <span className="text-2xl">{option.emoji}</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">{option.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;