import React from "react";

type RangeSliderProps = {
  min?: number;
  max?: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RangeSlider = ({
  min = 0,
  max = 100,
  value = 50,
  onChange,
}: RangeSliderProps) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#33E6BF]"
    />
  );
};

export default RangeSlider;
