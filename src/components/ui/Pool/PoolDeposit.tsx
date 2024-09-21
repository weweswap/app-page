import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Card, Dropdown, Typography } from "~/components/common";
import { usePoolContext } from "./PoolContext";
import { Divider, NumberInput } from "@mantine/core";
import clsx from "clsx";
import { dogica } from "~/fonts";
import { TOKEN_LIST } from "~/constants";

type PoolDepositProps = {};

const PoolDeposit = () => {
  const { selectedPool } = usePoolContext();
  const [selectedAction, setSelectedAction] = useState("deposit");
  const [inputValue, setInputValue] = useState();
  console.log("selectedPool:", selectedPool);
  const [inputTokenIndex, setInputTokenIndex] = useState(0);

  return (
    selectedPool && (
      <>
        <Card>
          <div className=" w-full min-h-[10rem]">
            <div className="sm:py-4  flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <button>
                  <Typography secondary size="xl">
                    {"<"}
                  </Typography>
                </button>
                <div className="flex items-center">
                  <Image
                    src={selectedPool.logo.first}
                    width={24}
                    height={24}
                    alt=""
                  />
                  <Image
                    src={selectedPool.logo.second}
                    width={24}
                    height={24}
                    className="-translate-x-1.5"
                    alt=""
                  />
                </div>
                <Typography
                  secondary
                  size="xs"
                  className="font-bold"
                  tt="uppercase"
                >
                  {selectedPool.type}
                </Typography>
              </div>
              <div></div>
              <div className="lg:text-right flex flex-col gap-2">
                <Typography size="xs" ta="center" className="text_light_gray">
                  APR
                </Typography>
                <Typography size="lg" className="font-extrabold">
                  {selectedPool.apr}%
                </Typography>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 flex-wrap py-4 sm:py-1 ">
              {/* <div className="flex gap-6">
              <Typography
                size="xs"
                className={`bg_green flex justify-center rounded-full w-[6rem] py-1 `}
              >
                IN RANGE
              </Typography>
              <div className="flex items-center gap-1">
                <Image
                  src="/img/links/wide.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <Typography size="xs" className="translate-x-1">
                  WIDE
                </Typography>
              </div>
            </div> */}
              <div className="flex items-center gap-1">
                <Image
                  src="/img/icons/memes.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <Typography size="xs" className="translate-x-1">
                  {selectedPool.address}
                </Typography>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  <Image
                    src="/img/icons/Infinity.svg"
                    className="translate-x-[5px]"
                    width={20}
                    height={20}
                    alt=""
                  />
                </div>
                <Typography size="xs" className="translate-x-1">
                  INFINITY
                </Typography>
              </div>
            </div>
            <div className=" gap-5 py-5 my-5 flex-wrap bg_light_dark min-h-[12rem]"></div>
            <div className="flex justify-between my-3">
              <div className="flex flex-col items-center gap-4">
                <Typography>TVL</Typography>
                <Typography>$ {Number(selectedPool.tvl).toFixed(2)}</Typography>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Typography>VOLUME</Typography>
                <Typography>$ {selectedPool.volume}</Typography>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Typography>INCENTIVES</Typography>
                <Typography>$ -</Typography>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Typography>DISTRIBUTED FEES</Typography>
                <Typography>$ -</Typography>
              </div>
            </div>
            <Divider className="border-blue-700" />
            <div className="mt-5 flex items-center justify-between w-full gap-6 md:flex-row flex-col">
              <div className="bg_light_dark w-full flex items-center justify-between gap-3 h-[3rem]">
                <div
                  onClick={() => setSelectedAction("deposit")}
                  className={`${
                    selectedAction === "deposit" && "nav_selected"
                  } nav`}
                >
                  <Typography size="sm">Deposit</Typography>
                </div>
                <div
                  onClick={() => setSelectedAction("withdraw")}
                  className={`${
                    selectedAction === "withdraw" && "nav_selected"
                  } nav`}
                >
                  <Typography size="sm">Withdraw</Typography>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 md:flex-row items-center justify-between gap-3">
              <NumberInput
                classNames={{
                  root: "md:col-span-8 col-span-6",
                  input: clsx(
                    dogica.className,
                    "text-start bg-transparent text-white text-2xl h-auto border-transparent rounded-none"
                  ),
                }}
                defaultValue={inputValue}
                hideControls
                value={inputValue}
                onChange={(value) => setInputValue(value as number)}
                allowNegative={false}
                trimLeadingZeroesOnBlur
                thousandSeparator
                decimalScale={6}
              />
              <Dropdown
                value={TOKEN_LIST[inputTokenIndex].symbol}
                options={TOKEN_LIST.map((token, index) => ({
                  value: token.address,
                  icon: token.icon,
                  text: token.symbol,
                  index: index
                }))}
                className="md:col-span-4 col-span-6"
                setIndexValue={setInputTokenIndex}
              />
            </div>
            {/* <Button onClick={onZap} className="w-full mt-4">
            <Typography secondary size="xs" fw={700} tt="uppercase">
              ZAP-IN
            </Typography>
          </Button> */}
          </div>
        </Card>
        <Card>
          <Typography size="lg">
            When you add liquidity to an Active Pool:
          </Typography>

          <ul className="list-decimal list-inside text-sm">
            <li>Your assets are swapped to be added correctly to the pool.</li>
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
    )
  );
};

export default PoolDeposit;