"use client"

import { Divider } from "@mantine/core";
import Image from "next/image";
import { Button, Typography } from "~/components/common";

type MigrateDoneProps = {
  onNext: () => void;
};

export const MigrateDone = ({ onNext }: MigrateDoneProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6">
      <Typography secondary size="xxxl" tt="uppercase">
        Nice!!!
      </Typography>
      <Image
        src="/img/nice.png"
        width={300}
        height={300}
        className="max-w-full"
        alt=""
      />
      <div className='flex flex-col items-center w-[30rem]'>
        <div className='flex flex-col items-center gap-7 w-full'>
        <Image src="/img/icons/success.svg" width={80} height={80} alt='' />
        <Typography size='md' secondary className='text-center'>
            SUCCESSFULLY MIGRATED
        </Typography>
        <div className='flex items-center justify-between w-full gap-2'>
          <Typography>ID: XYZ</Typography>
          <div className="flex items-center gap-1">
            <Image src="/img/icons/memes.svg" width={20} height={20} alt="" />
            <Typography size="xs" className="translate-x-1">
              MEMES: 1%
            </Typography>
          </div>

          <div className="flex items-center gap-1">
            <div className="flex items-center">
            <Image src="/img/icons/Infinity.svg" className="translate-x-[5px]" width={20} height={20} alt="" />
            <Image src="/img/icons/wide.svg"  width={20} height={20} alt="" />
            </div>
              <Typography size="xs" className="translate-x-1">
                INFINITY
              </Typography>
            </div>
        </div>
        <div className="flex items-center justify-between gap-3 w-full">
        <Typography size="xs" className="text_light_gray">RATE:1 USDC = 2000 WEWE ($1.00) </Typography>
        <Typography size="xs" className="text_light_gray">RANGE: 1,02 - 3,02 </Typography>
        </div>
        <Divider className="border-blue-700 w-full" />
        <div className='flex items-center justify-between gap-3 w-full'>
            <Typography secondary size='sm'>AMOUNT</Typography>
            <div className='text-right flex flex-col gap-2'>
                <Typography>$34.54</Typography>
                <div className='flex gap-2 items-center'>
                    <Typography className='text_light_gray' size='xs'>0.0000001231231 SHARES</Typography>
                    <div className='flex items-center'>
                <Image className='min-w-6 min-h-6' src="/img/tokens/wewe.svg" alt='' width={32} height={32} />
                <Image className='ml-[-10px] min-w-6 min-h-6'  src="/img/tokens/usdc.png" alt=''  width={32} height={32} />
              </div>
                </div>
            </div>
        </div>
        <Typography className='flex justify-end w-full mb-3' size='xs'>Total fee cost: $ 0.10</Typography>
        </div>
        <div className='flex flex-col gap-4 w-full'>
        <Button className="w-full">
          <Typography secondary size="xs" fw={700} tt="uppercase">
           COMPLETED
          </Typography>
        </Button>
        <button className="w-full md:w-auto custom_btn">
          <Typography secondary size="xs" fw={700} tt="uppercase">
           VIEW DETAILS
          </Typography>
        </button>
        </div>
    </div>
    </div>
  );
};
