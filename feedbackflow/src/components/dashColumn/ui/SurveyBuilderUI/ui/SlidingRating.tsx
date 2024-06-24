import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const SlidingRating = () => {
  const [sliderValue, setSliderValue] = useState(5);

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue[0]);
  };

  return (
    <div className="">
      <h2 className="text-md font-bold mb-4 text-gray-800 dark:text-gray-200">
        How did you enjoy our service?
      </h2>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 dark:text-gray-400">{sliderValue}</span>
        <Slider
          className="flex-1 mx-4 text-blue-500"
          defaultValue={[5]}
          max={10}
          step={1}
          onValueChange={handleSliderChange}
        />
        <span className="text-gray-500 dark:text-gray-400">10</span>
      </div>
    </div>
  );
};

export default SlidingRating;