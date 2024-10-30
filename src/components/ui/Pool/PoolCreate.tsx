"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button, Card, Dropdown, Typography } from "~/components/common";

import { DUMMY_POOL_OPTIONS } from "./dummy";

type NewPoolCreateProps = {
  onNext: () => void;
  // onAdd: () => void;
  onBack: () => void;
};

const PoolCreate = ({ onNext, onBack }: NewPoolCreateProps) => {
  const [poolRange, setPoolRange] = useState<number>(0);
  const [poolType, setPoolType] = useState<number>(0);

  const poolOptions = DUMMY_POOL_OPTIONS.map((pool) => ({
    value: pool.symbol,
    icon: pool.icon,
  }));

  return (
    <>
      <div className="bg_rich_dark flex w-full items-center justify-between gap-4 p-6">
        <button onClick={onBack}>
          <Typography secondary size="xs">
            POOLS {"<"} NEW POOL
          </Typography>
        </button>
        <div className="flex gap-4">
          <Button disabled>
            <Typography secondary size="xs" fw={700}>
              MIGRATE
            </Typography>
          </Button>
        </div>
      </div>
      <Card>
        <Typography size="lg" secondary className="py-3 ">
          CREATE POOL AND RANGE
        </Typography>
        <div className="flex flex-col gap-5">
          <div className="bg_light_dark flex items-center justify-between gap-3 p-4">
            <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
              <div className="flex flex-col gap-5  md:w-1/3">
                <Dropdown
                  defaultValue="Select"
                  options={poolOptions}
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-5   md:w-1/3">
                <Dropdown
                  defaultValue="USDC"
                  options={poolOptions}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-full items-center justify-between gap-3 lg:p-4">
          <div className="bg_light_dark grid w-full grid-cols-1 gap-3  p-3 lg:grid-cols-3">
            <button
              className={`bg_gray flex items-center justify-center gap-2 px-3 py-2 ${poolType === 0 && "border_turq"}`}
              onClick={() => setPoolType(0)}
            >
              <Image
                src="/img/icons/rocket.svg"
                width={20}
                height={20}
                alt=""
              />
              <Typography size="sm">MEMES 1%</Typography>
            </button>
            <button
              className={`bg_gray flex items-center justify-center gap-2 px-3 py-2 ${poolType === 1 && "border_turq"}`}
              onClick={() => setPoolType(1)}
            >
              <Image src="/img/icons/crown.svg" width={20} height={20} alt="" />
              <Typography size="sm">BLUE CHIP 0.3%</Typography>
            </button>
            <button
              className={`bg_gray flex items-center justify-center gap-2 px-3 py-2 ${poolType === 2 && "border_turq"}`}
              onClick={() => setPoolType(2)}
            >
              <Image src="/img/icons/crown.png" width={20} height={20} alt="" />
              <Typography size="sm">STABLES 0.05%</Typography>
            </button>
          </div>
        </div>
        <div className="bg_dark flex min-h-40 items-center justify-center">
          <Typography secondary size="sm" className="text-pink-300">
            YOUR POSITION WILL APPEAR HERE
          </Typography>
        </div>
        <div className="my-5">
          <Typography className="text_light_gray" size="xs">
            Select pool range
          </Typography>
          <div className="grid w-full grid-cols-1 gap-3 py-3  lg:grid-cols-4">
            <button
              className={`bg_gray flex items-center justify-center gap-2 px-3 py-2 ${poolRange === 0 && "border_turq"}`}
              onClick={() => setPoolRange(0)}
            >
              <Image src="/img/links/wide.svg" width={20} height={20} alt="" />
              <Typography size="sm">WIDE 170%</Typography>
            </button>
            <button
              className={`bg_gray flex items-center justify-center gap-2 px-3 py-2 ${poolRange === 1 && "border_turq"}`}
              onClick={() => setPoolRange(1)}
            >
              <Image src="/img/links/mid.svg" width={20} height={20} alt="" />
              <Typography size="sm">MID 100%</Typography>
            </button>
            <button
              className={`bg_gray flex items-center justify-center gap-2 px-3 py-2 ${poolRange === 2 && "border_turq"}`}
              onClick={() => setPoolRange(2)}
            >
              <Image
                src="/img/links/narrow.svg"
                width={20}
                height={20}
                alt=""
              />
              <Typography size="sm">NARROW 40%</Typography>
            </button>
            <button
              className={`bg_gray flex items-center justify-center gap-2 px-3 py-2 ${poolRange === 3 && "border_turq"}`}
              onClick={() => setPoolRange(3)}
            >
              <Image
                src="/img/icons/Infinity.svg"
                width={20}
                height={20}
                alt=""
              />
              <Typography size="sm">INFINITY</Typography>
            </button>
          </div>
        </div>
        <div className="pointer-events-none cursor-not-allowed opacity-50 ">
          <Typography className="text_light_gray mb-2" size="xs">
            Deposit amounts
          </Typography>
          <div className="mb-5 flex h-full items-center gap-3">
            <input className="inputField w-[50%]" />
            <Dropdown
              defaultValue="USDC"
              options={poolOptions}
              className="w-[50%] "
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="w-full">
              <Typography className="mb-2" size="xs">
                Initial Range
              </Typography>
              <input className="inputField w-full" />
            </div>
            <div className="w-full">
              <Typography className="mb-2" size="xs">
                Min Rate
              </Typography>
              <input className="inputField" />
            </div>
            <div className="w-full">
              <Typography className="mb-2" size="xs">
                Max Rate
              </Typography>
              <input className="inputField" />
            </div>
          </div>
          <div className="py-5">
            <Button onClick={onNext} className="w-full">
              <Typography secondary size="sm">
                CREATE POOL
              </Typography>
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <Typography size="lg">
          When you add liquidity to an Active Pool:
        </Typography>
        <ul className="list-inside list-decimal pt-3 text-sm">
          <li> Your assets are swapped to be added correctly to the pool.</li>
          <li>
            Any assets that can’t fit in the pool are refunded back to you.
          </li>
          <li>
            You may experience a small slip when you enter a pool that is
            out-of-balance.
          </li>
        </ul>
      </Card>
    </>
  );
};

export default PoolCreate;
