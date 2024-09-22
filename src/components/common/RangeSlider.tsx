import React from 'react';

type RangeSliderProps = {
    min?: number;
    max?: number;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeSlider = ({ min = 0, max = 100, value = 50, onChange }: RangeSliderProps) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-[#33E6BF] rounded-lg appearance-none cursor-pointer"
    />
  );
};

export default RangeSlider;
