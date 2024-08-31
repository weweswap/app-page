import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, Card, Typography } from "~/components/common";

type PoolsManageProps = {
    onBack: () => void
}

const PoolsManage = ({onBack}: PoolsManageProps) => {
  return (
    <Card>
      <div className="flex flex-col md:flex-row text-center md:text-start items-center justify-between gap-5 mb-5">
        <div onClick={onBack} className="cursor-pointer">
          <Typography secondary size="xl" tt="uppercase">
            {"<"}POOLS MANAGE
          </Typography>
        </div>
        <div className="flex sm:flex-row flex-col sm:w-fit w-full gap-5">
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

      <div className="bg_dark w-full min-h-[10rem] p-4">
        <div className="sm:py-4 py-7 flex items-center justify-between gap-3 flex-wrap">
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
          <div className="lg:text-right flex flex-col gap-2">
            <Typography size="xs" className="text_light_gray">
              APR
            </Typography>
            <Typography size="lg" className="font-extrabold">
              23
            </Typography>
          </div>

          <div className="lg:text-right flex flex-col gap-2">
            <Typography size="xs" className="text_light_gray">
              LP VALUE
            </Typography>
            <Typography size="lg" className="font-extrabold">
              $23
            </Typography>
          </div>
          <div className="text-right flex flex-col gap-2">
            <Typography size="xs" className="text_light_gray">
              REWARDS
            </Typography>
            <Typography size="lg" className="font-extrabold">
              $23
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap py-4 sm:py-1 ">
          <div className="flex gap-6">
            <Typography
              size="xs"
              className={`bg_green flex justify-center rounded-full w-[6rem] py-1 `}
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
        <div className="flex items-center justify-between my-5">
          <Typography size="xs">PENDING FEES: $2,36</Typography>
          <div className="flex sm:flex-row flex-col sm:w-fit w-full gap-5">
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

        <ul className="list-decimal list-inside pt-3 text-sm">
        <li>Your assets are swapped to be added correctly to the pool.</li>
        <li>Any assets that can’t fit in the pool are refunded back to you.</li>
        <li>You may experience a small slip when you enter a pool that is out-of-balance.</li>
        </ul>
        </div>
    </Card>

  );
};

export default PoolsManage;
