import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, Card, Typography } from "~/components/common";

type MySharesDetailsProps = {
    onBack: () => void
    onClaim: () => void
}

const MySharesDetails = ({onBack, onClaim}: MySharesDetailsProps) => {
  return (
    <>
      <div className=" w-full min-h-[10rem]">
        <div className="sm:py-4  flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 ">
          <button onClick={onBack}>
            <Typography secondary size="xl">{"<"}</Typography>
            </button>
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
              420%
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
          </div>
          <div className="flex items-center gap-1">
              <Image src="/img/icons/Infinity.svg" width={20} height={20} alt="" />
              <Typography size="xs" className="translate-x-1">
                INFINITY
              </Typography>
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
            <Image src="/img/tokens/usdc.png" width={32} height={32} alt="" />
          </div>
          <div className="flex items-center gap-3">
            <Typography size="xs" className="translate-x-1 font-bold">
              4,245.15
            </Typography>
            <Image src="/img/tokens/wewe.svg" width={32} height={32} alt="" />
          </div>
          </div>
        </div>
          <Link href="/migrate" className="w-full">
            <Button className="w-full mt-4">
              <Typography secondary size="xs" fw={700} tt="uppercase">
                ZAP-IN
              </Typography>
            </Button>
          </Link>
      </div>
      <div className="flex  justify-evenly gap-3 flex-wrap py-10">
        <div className="flex flex-col items-center gap-1">
            <Typography className="text_light_gray">POSITION SHARES</Typography>
            <Typography size="lg" fw={1000}>0.0000001231231</Typography>
            <button className="custom_btn mt-4">
              <Typography size="xs" secondary>ZAP-OUT</Typography>
            </button>
        </div>
        <div className="flex flex-col items-center  lg:mt-[-5px]">
          <div className="flex gap-2 items-center">
          <Typography className="text_light_gray">PENDING FEES</Typography>
          <Image src="/img/tokens/usdc.png" width={32} height={32} alt="" />
          </div>
            <Typography size="lg" fw={1000}>$2.36</Typography>
            <Button onClick={() => onClaim()} className="mt-4">
              <Typography size="xs" secondary>CLAIM</Typography>
            </Button>
        </div>

        <div className="flex flex-col items-center  lg:mt-[-5px]">
          <div className="flex gap-2 items-center">
          <Typography className="text_light_gray">REWARDS</Typography>
          <Image src="/img/tokens/rewards.svg" width={32} height={32} alt="" />
          </div>
            <Typography size="lg" fw={1000}>$2.36</Typography>
            <Button onClick={() => onClaim()} className="mt-4">
              <Typography size="xs" secondary>CLAIM</Typography>
            </Button>
        </div>
        
      </div>
        <Typography size="lg">
        When you add liquidity to an Active Pool:
        </Typography>

        <ul className="list-decimal list-inside text-sm">
        <li>Your assets are swapped to be added correctly to the pool.</li>
        <li>Any assets that can’t fit in the pool are refunded back to you.</li>
        <li>You may experience a small slip when you enter a pool that is out-of-balance.</li>
        </ul>
    </>

  );
};

export default MySharesDetails;
