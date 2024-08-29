import Image from "next/image";
import { useState } from "react";
import { Button, Card, Typography } from "~/components/common";
import { DUMMY_TABLE_HEAD, DUMMY_TABLE_CONTENT, DUMMY_POOLS } from "./dummy";

import PoolBox from "./PoolBox";
import Link from "next/link";
import ComingSoon from "~/components/common/ComingSoon";

type MyPoolProps = {
  onManage: () => void;
} 

const MyPools = ({onManage}: MyPoolProps) => {
  return (
    <Card className="flex item-center justify-center p-5 min-h-[25rem]">
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
             <div className='lg:text-right flex flex-col gap-2'>
                 <Typography size='xs' className='text_light_gray'>APR</Typography>
                 <Typography size='lg' className='font-extrabold'>{lpValue}</Typography>
             </div>

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
                 <Typography size='xs' className={`bg_green flex justify-center rounded-full w-[6rem] py-1 `}>
                    IN RANGE
                 </Typography>
                 <div className='flex items-center gap-1'>
                    {range === 'NARROW' ? 
                    <Image  src="/img/links/narrow.svg" width={20} height={20} alt="" /> : 
                    range === 'MID' ?
                    <Image  src="/img/links/mid.svg" width={20} height={20} alt="" /> : 
                    <Image  src="/img/links/wide.svg" width={20} height={20} alt="" /> 
                    }
                     <Typography size='xs' className='translate-x-1'>
                     {range}
                 </Typography>
                 </div>
             </div>
             <div className='flex items-center gap-1'>
                    <Image  src="/img/icons/memes.svg" width={20} height={20} alt="" /> 
                     <Typography size='xs' className='translate-x-1'>
                     MEMES: 1%
                 </Typography>
                 </div>
             <Typography size='xs'>
             Position ID: {positionId}
             </Typography>
             <Typography size='xs'>
             {`RANGE: 0.0006900>0.007000`}
             </Typography>
           
            </div>
            <div className='flex items-center justify-end gap-5 py-5 flex-wrap'>
            <Button className="w-full md:w-auto">
                     <Typography secondary size="xs" fw={700} tt="uppercase">ZAP-OUT</Typography>
                </Button>
                <Button onClick={onManage} className="w-full md:w-auto">
                     <Typography secondary size="xs" fw={700} tt="uppercase">MANAGE</Typography>
                </Button>
 
                <Button className="w-full md:w-auto">
                     <Typography secondary size="xs" fw={700} tt="uppercase">CLAIM</Typography>
                </Button>
 
                
                 
            </div>
         </div>
        })}
       
    </div>
         </Card>
  )
}

export default MyPools