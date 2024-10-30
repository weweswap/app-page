import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, Typography } from "~/components/common";

type PoolsManageProps = {
  onBack: () => void;
};

const PoolsManage = ({ onBack }: PoolsManageProps) => {
  return (
    <Card>
      <div className="mb-5 flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-start">
        <div onClick={onBack} className="cursor-pointer">
          <Typography secondary size="xl" tt="uppercase">
            {"<"}POOLS MANAGE
          </Typography>
        </div>
        <div className="flex w-full flex-col gap-5 sm:w-fit sm:flex-row">
          <Link href="/migrate" className="w-full">
            <Button className="w-full md:w-auto">
              <Typography secondary size="xs" fw={700} tt="uppercase">
                Migrate
              </Typography>
            </Button>
          </Link>
          <Button className="w-full md:w-auto">
            <Typography secondary size="xs" fw={700} tt="uppercase">
              INCENTIVIZE
            </Typography>
          </Button>
        </div>
      </div>

      <div className="bg_dark min-h-40 w-full p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 py-7 sm:py-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Image src="/img/tokens/weth.png" width={24} height={24} alt="" />
              <Image
                src="/img/tokens/wewe.png"
                width={24}
                height={24}
                alt=""
                className="-translate-x-1.5"
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
          <div className="flex flex-col gap-2 lg:text-right">
            <Typography size="xs" className="text_light_gray">
              APR
            </Typography>
            <Typography size="lg" className="font-extrabold">
              23
            </Typography>
          </div>

          <div className="flex flex-col gap-2 lg:text-right">
            <Typography size="xs" className="text_light_gray">
              LP VALUE
            </Typography>
            <Typography size="lg" className="font-extrabold">
              $23
            </Typography>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <Typography size="xs" className="text_light_gray">
              REWARDS
            </Typography>
            <Typography size="lg" className="font-extrabold">
              $23
            </Typography>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 sm:py-1 ">
          <div className="flex gap-6">
            <Typography
              size="xs"
              className={`bg_green flex w-24 justify-center rounded-full py-1 `}
            >
              IN RANGE
            </Typography>
            <div className="flex items-center gap-1">
              <Image src="/img/links/wide.svg" width={20} height={20} alt="" />
              <Typography size="xs" className="translate-x-1">
                WIDE
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/img/icons/memes.svg" width={20} height={20} alt="" />
            <Typography size="xs" className="translate-x-1">
              MEMES: 1%
            </Typography>
          </div>
          <Typography size="xs">Position ID: 234</Typography>
          <Typography size="xs">{`RANGE: 0.0006900>0.007000`}</Typography>
        </div>
        <div className=" bg_light_dark my-5 min-h-48 flex-wrap gap-5 py-5">
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
        <div className="my-5 flex items-center justify-between">
          <Typography size="xs">POSITION SHARES</Typography>
          <Typography size="lg" fw={900}>
            0.0000001231231
          </Typography>
          <Button className="w-full md:w-auto">
            <Typography secondary size="xs" fw={700} tt="uppercase">
              ZAP-OUT
            </Typography>
          </Button>
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className="flex items-center gap-1">
            <Image src="/img/tokens/usdc.png" width={20} height={20} alt="" />
            <Typography size="xs" className="translate-x-1 font-bold">
              17.27
            </Typography>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/img/tokens/wewe.svg" width={20} height={20} alt="" />
            <Typography size="xs" className="translate-x-1 font-bold">
              4,245.15
            </Typography>
          </div>
        </div>
        <div className="my-5 flex items-center justify-between">
          <Typography size="xs">PENDING FEES: $2,36</Typography>
          <div className="flex w-full flex-col gap-5 sm:w-fit sm:flex-row">
            {/* <Link href="/migrate" className="w-full"> */}
            <Button className="w-full md:w-auto">
              <Typography secondary size="xs" fw={700} tt="uppercase">
                ZAP-IN
              </Typography>
            </Button>
            {/* </Link> */}
            <Button className="w-full md:w-auto">
              <Typography secondary size="xs" fw={700} tt="uppercase">
                CLAIM
              </Typography>
            </Button>
          </div>
        </div>
      </div>

      <div className="my-5">
        <Typography size="lg">
          When you add liquidity to an Active Pool:
        </Typography>

        <ul className="list-inside list-decimal pt-3 text-sm">
          <li>Your assets are swapped to be added correctly to the pool.</li>
          <li>
            Any assets that can’t fit in the pool are refunded back to you.
          </li>
          <li>
            You may experience a small slip when you enter a pool that is
            out-of-balance.
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default PoolsManage;
