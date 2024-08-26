
"use client"
import React from 'react'
import Image from "next/image";
import { useState } from "react";
import { Button, Card, Dropdown, Typography } from "~/components/common";
import { DUMMY_POOL_OPTIONS } from './dummy';

type PoolZapInProps = {
  // onNext: () => void;
  // onAdd: () => void;
  onZap: () => void;
  onBack: () => void;
};

const PoolZapIn = ({ onZap, onBack }: PoolZapInProps) => {

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
            {"<"} ZAP IN
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
        
          <Typography size="lg" secondary className='py-3'>SELECT POOL AND RANGE</Typography>
        <div className="flex flex-col gap-5">
          <div className="bg_dark flex items-center justify-between gap-3 p-4">
          <div className="flex md:flex-row flex-col gap-4 justify-between w-full">
          <div className="flex flex-col md:w-1/3  gap-5">
            <Dropdown
              defaultValue="USDC"
              options={poolOptions}
              className="w-full"
            />
          </div>
          <Typography secondary size="xl"className='pt-2'>
            {"<"}
          </Typography>
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
        <div className="grid grid-cols-3 gap-3 pt-3">
          <button
            className={`bg_stroke px-3 py-2 ${poolRange === 0 && "selected"}`}
            onClick={() => setPoolRange(0)}
          >
            <Typography size="sm">WIDE 170%</Typography>
          </button>
          <button
            className={`bg_dark px-3 py-2 ${poolRange === 1 && "selected"}`}
            onClick={() => setPoolRange(1)}
          >
            <Typography size="sm">MID 100%</Typography>
          </button>
          <button
            className={`bg_dark px-3 py-2 ${poolRange === 2 && "selected"}`}
            onClick={() => setPoolRange(2)}
          >
            <Typography size="sm">NARROW 40%</Typography>
          </button>
        </div>

        <div className='py-5'>
        <Button onClick={onZap} className='w-full'>
            <Typography secondary size="sm">ADD</Typography>
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

export default PoolZapIn