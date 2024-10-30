import { useState } from "react";
import Link from "next/link";
import { Button, Typography } from "~/components/common";
import { WewePosition } from "~/hooks/useWewePositions";

import Liquidity from "./Liquidity";
import MyShares from "./MyShares";

type PoolHomeProps = {
  onClaim: (wewePositon: WewePosition) => void;
  onNext: () => void;
  onBack: () => void;
  onAdd: () => void;
  onDeposit: (token0: number, token1: number) => void;
  onWithdraw: (sharesAmount: bigint) => void;
};

export const PoolHome = ({
  onClaim,
  onNext,
  onBack,
  onDeposit,
  onWithdraw,
}: PoolHomeProps) => {
  const [poolTypes, setPoolTypes] = useState<number>(0);
  const [backOption] = useState(false);

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between gap-5 bg-black p-2 text-center md:flex-row md:text-start">
        <div className="">
          <Typography secondary size="xl" tt="uppercase">
            <>{backOption ? <span>{"<"}</span> : ""}</>POOLS
          </Typography>
        </div>
        <div className="flex w-full flex-col gap-5 sm:w-fit sm:flex-row">
          <Link href="/migrate" className="w-full">
            <Button className="w-full md:w-auto">
              <Typography
                secondary
                size="xs"
                fw={700}
                tt="uppercase"
                className="mx-4"
              >
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
      {poolTypes === 0 && (
        <Liquidity
          onDeposit={onDeposit}
          onWithdraw={onWithdraw}
          setPoolTypes={setPoolTypes}
          poolTypes={poolTypes}
          onNext={onNext}
          onBack={onBack}
        />
      )}
      {poolTypes === 1 && (
        <MyShares
          onClaim={onClaim}
          onWithdraw={onWithdraw}
          onDeposit={onDeposit}
          setPoolTypes={setPoolTypes}
          poolTypes={poolTypes}
        />
      )}
    </>
  );
};
