import Image from "next/image";
import { useState } from "react";
import { Button, Card, Typography } from "~/components/common";
import { DUMMY_TABLE_HEAD, DUMMY_TABLE_CONTENT, DUMMY_POOLS } from "./dummy";
import ActivePoolTable from "./ActivePoolTable";
import PoolBox from "./PoolBox";
import Link from "next/link";
import ComingSoon from "~/components/common/ComingSoon";

type PoolHomeProps = {
  onNext: () => void;
  onAdd: () => void;
  onZap: () => void;
};

export const PoolHome = ({ onNext, onAdd, onZap }: PoolHomeProps) => {

  const [poolTypes, setPoolTypes] = useState<number>(0)

  return (
    <>
      <Card className="flex flex-col md:flex-row text-center md:text-start items-center justify-between gap-5">
        <div className="flex-1">
          <Typography secondary size="xl" tt="uppercase">
            POOLS
          </Typography>
        </div>
        <Link href="/migrate">
        <Button className="w-full md:w-auto">
          <Typography secondary size="xs" fw={700} tt="uppercase">
            Migrate
          </Typography>
        </Button>
        </Link>
        <Button onClick={onNext} className="w-full md:w-auto">
          <Typography secondary size="xs" fw={700} tt="uppercase">
            New Pool
          </Typography>
        </Button>
      </Card>
    <div className="flex items-center justify-between w-full">
        <div className="bg_light_dark w-[30rem] flex items-center justify-between gap-3 h-[3rem]">
            <div onClick={() => setPoolTypes(0)} className={`${poolTypes === 0 && "nav_selected"} nav`}>
                <Typography size="sm">ACTIVE</Typography>
                </div>
                <div onClick={() => setPoolTypes(1)} className={`${poolTypes === 1 && "nav_selected"} nav`}>
                <Typography size="sm">MY POOLS</Typography>
                </div>
        </div>
         <Button>
          <Typography secondary size="xs">
            NEW POOL+
          </Typography>
          </Button> 
    </div>
      {poolTypes === 0
         && 
         <Card className="flex item-center justify-center p-5 min-h-[25rem] ">
            {/* <Image src="/img/icons/home.svg" width={150} height={150} alt=""/> */}
            <div className='w-full flex flex-col gap-6'>
        {DUMMY_POOLS.map(({title, exchangePair, state, range, lpValue, rewards, positionId}) => {
            return  <div key={title} className='bg_dark w-full min-h-[10rem] p-4'>
            <Typography>{title}</Typography> 
            <div className='sm:py-4 py-7 flex items-center justify-between gap-3 flex-wrap'>
             <div className='flex items-center gap-2'>
             <div className="flex items-center">
                 <Image
                   src="/img/tokens/weth.png"
                   width={24}
                   height={24}
                   alt=""
                 />
                 <Image
                   src="/img/tokens/wewe.png"
                   width={24}
                   height={24}
                   alt=""
                   className="-translate-x-1.5"
                 />
               </div>
                 <Typography secondary size="xs" className='font-bold' tt="uppercase">
                 {exchangePair}
               </Typography>
             </div>
             <div></div>
             <div></div>
             <div className='lg:text-right flex flex-col gap-2'>
                 <Typography size='xs' className='text_light_gray'>LP VALUE</Typography>
                 <Typography size='lg' className='font-extrabold'>${lpValue}</Typography>
             </div>
             <div className='text-right flex flex-col gap-2'>
                 <Typography size='xs' className='text_light_gray'>REWARDS</Typography>
                 <Typography size='lg' className='font-extrabold'>${rewards}</Typography>
             </div>
            </div>
            <div className='flex items-center justify-between gap-4 flex-wrap py-4 sm:py-1 '>
             <div className='flex gap-6'>
                 <Typography size='xs' className={`${state == "Active" ? "bg_active" : "bg_inactive" } flex justify-center rounded-full w-[4.5rem] py-1`}>
                     {state}
                 </Typography>
                 <div className='flex items-center gap-1'>
                    {range === 'NARROW' ? 
                    <Image  src="/img/links/narrow.svg" width={23} height={23} alt="" /> : 
                    range === 'MID' ?
                    <Image  src="/img/links/mid.svg" width={23} height={23} alt="" /> : 
                    <Image  src="/img/links/wide.svg" width={23} height={23} alt="" /> 
                    }
                     <Typography size='xs' className='translate-x-1'>
                     {range}
                 </Typography>
                 </div>
             </div>
             <Typography size='xs'>
             {`RANGE: 0.0006900>0.007000`}
             </Typography>
             <Typography size='xs'>
             Position ID: {positionId}
             </Typography>
            </div>
            <div className='flex items-center justify-end gap-4 py-3 flex-wrap'>
                <Button  className="w-full md:w-auto">
                     <Typography secondary size="xs" fw={700} tt="uppercase">MANAGE</Typography>
                </Button>
 
                <Button className="w-full md:w-auto">
                     <Typography secondary size="xs" fw={700} tt="uppercase">CLAIM</Typography>
                </Button>
 
                <Button className="w-full md:w-auto">
                     <Typography secondary size="xs" fw={700} tt="uppercase">ZAP-OUT</Typography>
                </Button>
                 
            </div>
         </div>
        })}
       
    </div>
         </Card>
      }
      {poolTypes === 1 
        &&
        <Card className="overflow-x-scroll h-[25rem]">
            <ActivePoolTable/>
        </Card> 
      }
      {
        poolTypes >= 2 && <ComingSoon />
      }
    </>
  );
};
