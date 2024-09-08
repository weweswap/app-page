import Image from "next/image";
import { useState } from "react";
import { Button, Card, Typography } from "~/components/common";
import { DUMMY_TABLE_HEAD, DUMMY_TABLE_CONTENT, DUMMY_POOLS } from "./dummy";
import PoolBox from "./PoolBox";
import Link from "next/link";
import ComingSoon from "~/components/common/ComingSoon";
import ActivePools from "./ActivePools";
import MyPools from "./MyPools";

type PoolHomeProps = {
  onClaim: () => void;
  onNext: () => void;
  onAdd: () => void;
  onZap: () => void;
  onZapOut: () => void;
  onManage: () => void;
};

export const PoolHome = ({ onClaim, onNext, onAdd, onZap, onManage, onZapOut }: PoolHomeProps) => {

  const [poolTypes, setPoolTypes] = useState<number>(0)
  const [backOption, setBackOption] = useState(false)

  const showDetailsHandler = () => {
    setBackOption(!backOption)  
  }


  return (
    <>
      <div className="w-full flex bg-black p-2 flex-col md:flex-row text-center md:text-start items-center justify-between gap-5" >
        <div className="">
          <Typography secondary size="xl" tt="uppercase">
            <>{backOption ? <span >{"<"}</span> : ""}</>POOLS
          </Typography>
        </div>
        <div className="flex sm:flex-row flex-col sm:w-fit w-full gap-5">
        <Link href="/migrate" className="w-full">
        <Button className="w-full md:w-auto">
          <Typography secondary size="xs" fw={700} tt="uppercase" className="mx-4">
            Migrate
          </Typography>
        </Button>
        </Link>
        {/* <Button  className="w-full md:w-auto">
          <Typography secondary size="xs" fw={700} tt="uppercase">
            INCENTIVIZE
          </Typography>
        </Button> */}
        </div>
      </div>
    {/* <div className="flex items-center justify-between w-full gap-6 md:flex-row flex-col">
        <div className="bg_light_dark w-[30rem] flex items-center justify-between gap-3 h-[3rem]">
            <div onClick={() => setPoolTypes(0)} className={`${poolTypes === 0 && "nav_selected"} nav`}>
                <Typography size="sm">ACTIVE</Typography>
                </div>
                <div onClick={() => setPoolTypes(1)} className={`${poolTypes === 1 && "nav_selected"} nav`}>
                <Typography size="sm">MY POOLS</Typography>
                </div>
        </div>
         <button onClick={onNext} className="w-full md:w-fit custom_btn p-3">
          <Typography secondary size="xs" >
            +NEW POOL
          </Typography>
          </button> 
    </div> */}
      {poolTypes === 0
         && 
        <ActivePools onZap={onZap} setPoolTypes={setPoolTypes} poolTypes={poolTypes} onNext={onNext} />
      }
      {poolTypes === 1 
        &&
        <Card>
            <MyPools onClaim={onClaim} onZapOut={onZapOut} onManage={onManage} setPoolTypes={setPoolTypes} poolTypes={poolTypes} onNext={onNext} />
        </Card> 
      }
   
    </>
  );
};
