import React from 'react'
import { Typography } from './Typography';

interface SwitchProps {
    label: string;
    description?: string;
    onClick: () => void;
    value: boolean
  }

const Switch = ({label, description, value, onClick}:SwitchProps) => {
  return (
    <div onClick={onClick} className="flex gap-4 lg:flex-row flex-col lg:items-center cursor-pointer">
      <Typography className=" text-sm" fw={900}>{label}</Typography>
    <input key={description} defaultChecked={value ? false: true } type="checkbox" checked={value} className="sr-only peer"/>
    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:bg-[#33e6bf] after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-400 after:h-5 after:w-5 after:transition-all dark:border-gray-200 "></div>
    <Typography className="italic lg:ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{description}</Typography>
  </div>
  )
}

export default Switch