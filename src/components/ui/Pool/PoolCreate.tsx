
"use client"
import React from 'react'
import Image from "next/image";
import { useState } from "react";
import { Button, Card, Dropdown, Typography } from "~/components/common";
import { DUMMY_POOL_OPTIONS } from './dummy';
import { Input } from '@mantine/core';

type NewPoolCreateProps = {
  onNext: () => void;
  // onAdd: () => void;
  onBack: () => void;
};

const PoolCreate = ({ onNext, onBack }: NewPoolCreateProps) => {

    const [poolRange, setPoolRange] = useState<number>(0);

    const poolOptions = DUMMY_POOL_OPTIONS.map((pool) => ({
      value: pool.symbol,
      icon: pool.icon,
    }));

  return (
    <>
     <div className="flex items-center justify-between gap-4 w-full p-6 bg_rich_dark">
        <button onClick={onBack}>
          <Typography secondary size="sm">
            {"<"}  CREATE POOL
          </Typography>
        </button>
        <div className="flex gap-4">
        <Button disabled >
            <Typography secondary size="xs" fw={700}>
              MIGRATE
            </Typography>
          </Button>
          <Button disabled>
            <Typography secondary size="xs" fw={700}>
              NEW POOL
            </Typography>
          </Button>
        </div>
      </div>
      <Card>
        
          <Typography size="lg" secondary className='py-3'>CREATE POOL AND RANGE</Typography>
        <div className="flex flex-col gap-5">
          <div className="bg_light_dark flex items-center justify-between gap-3 p-4">
          <div className="flex md:flex-row flex-col gap-4 justify-between w-full">
          <div className="flex flex-col md:w-1/3  gap-5">
            <Dropdown
              defaultValue="BASE"
              options={poolOptions}
              className="w-full"
            />
          </div>
         
          <div className="flex flex-col md:w-1/3   gap-5">   
            <Dropdown
              defaultValue="BASE"
              options={poolOptions}
              className="w-full"
            />
          </div>
        </div>
          </div>
        </div>
        <div className="bg_light_dark flex items-center justify-between mt-4 gap-3 p-4">
          <div className="flex md:flex-row flex-col items-center gap-4 justify-between w-full">
           <Input />
         <Typography size='xs'>
            AMOUNT
         </Typography> 
           <Input />
        </div>
          </div>
          <Typography size='sm' className='text-center py-4'>
            SELECT FEE TYPE
          </Typography>
        <div className="grid grid-cols-3 gap-3 p-3  bg_light_dark">
          <button
            className={`bg_gray px-3 py-2 ${poolRange === 0 && "border_turq"}`}
            onClick={() => setPoolRange(0)}
          >
            <Typography size="sm">EXOTIC 1%</Typography>
          </button>
          <button
            className={`bg_gray px-3 py-2 ${poolRange === 1 && "border_turq"}`}
            onClick={() => setPoolRange(1)}
          >
            <Typography size="sm">BLUE CHIP 0.3%</Typography>
          </button>
          <button
            className={`bg_gray px-3 py-2 ${poolRange === 2 && "border_turq"}`}
            onClick={() => setPoolRange(2)}
          >
            <Typography size="sm">STABLES 0.05%</Typography>
          </button>
        </div>
        <div className='grid grid-cols-3 text-center mt-5 mb-3'>
        <Typography size='xs'>RANGE</Typography>
        <Typography size='xs'>MIN RATE</Typography>
        <Typography size='xs'>MAX RATE</Typography>
        </div>
        <div className="bg_light_dark flex items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-2 justify-between w-full">
          <Typography className='w-[33%] text-sm lg:text-lg'>
            Current Rate: 0,000012
         </Typography> 
           <Input className='w-[33%]' value={"0,0001"} />
           <Input className='w-[33%]' value={"0,0002"} />
        </div>
        </div>
        <div className='py-5'>
        <Button onClick={onNext} className='w-full'>
            <Typography secondary size="sm">CREATE POOL</Typography>
          </Button>
        </div>
      </Card>
     
     
    
      <Card>
        <Typography size="lg">When you add liquidity to an Active Pool:</Typography>
        <ul className="list-decimal list-inside pt-3 text-sm">
        
          <li> Your assets are swapped to be added correctly to the pool.</li>
          <li>
          Any assets that can’t fit in the pool are refunded back to you. 
          </li>
          <li>
          You may experience a small slip when you enter a pool that is out-of-balance.
          </li>
        </ul>
      </Card>
    </>
  )
}

export default PoolCreate