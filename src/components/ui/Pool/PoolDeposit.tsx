import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, Card, Typography } from "~/components/common";
import { usePoolContext } from "./PoolContext";

type PoolDepositProps = {};

const PoolDeposit = () => {
  const { selectedPool } = usePoolContext();
  console.log(selectedPool);

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
                    src="/img/tokens/wewe.png"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <Image
                    src="/img/tokens/eth.png"
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
                  WEWE/USDC
                </Typography>
              </div>
              <div></div>
              <div className="lg:text-right flex flex-col gap-2">
                <Typography size="xs" ta="center" className="text_light_gray">
                  APR
                </Typography>
                <Typography size="lg" className="font-extrabold">
                  420%
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
                  MEMES: 1%
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
                  asdasdasdasd
                </Typography>
              </div>
            </div>
            <div className=" gap-5 py-5 my-5 flex-wrap bg_light_dark min-h-[12rem]">
              <Typography size="md" className="text-center">
                POOLED TOKENS
              </Typography>
              {/* <Button className="w-full md:w-auto">
                     <Typography secondary size="xs" fw={700} tt="uppercase">ZAP-OUT</Typography>
                </Button>
                <Button  className="w-full md:w-auto">
                     <Typography secondary size="xs" fw={700} tt="uppercase">MANAGE</Typography>
                </Button>
 
                <Button className="w-full md:w-auto">
                     <Typography secondary size="xs" fw={700} tt="uppercase">CLAIM</Typography>
                </Button> */}
            </div>

            <div className="flex items-center justify-between">
              <Typography size="xs">Rate</Typography>
              <Typography size="xs">1 USDC = 0.0027 ETH ($1.00)</Typography>
            </div>
            <div className="flex items-center justify-between my-5">
              <Typography size="xs">Range</Typography>
              <Typography size="xs"> Min. 1,02 - Max. 3,02</Typography>
            </div>
            <div className="flex items-center justify-between">
              <Typography size="xs">Pooled Tokens</Typography>
              <div className="flex items-center justify-center gap-5">
                <div className="flex items-center gap-3">
                  <Typography size="xs" className="translate-x-1 font-bold">
                    17.27
                  </Typography>
                  <Image
                    src="/img/tokens/usdc.png"
                    width={32}
                    height={32}
                    alt=""
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Typography size="xs" className="translate-x-1 font-bold">
                    4,245.15
                  </Typography>
                  <Image
                    src="/img/tokens/wewe.svg"
                    width={32}
                    height={32}
                    alt=""
                  />
                </div>
              </div>
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
