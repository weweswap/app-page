import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Card, Typography } from "~/components/common";
import { DUMMY_TABLE_HEAD, DUMMY_TABLE_CONTENT, DUMMY_POOLS } from "./dummy";

import PoolBox from "./PoolBox";
import Link from "next/link";
import ComingSoon from "~/components/common/ComingSoon";
import MyPoolDetail from "./MyPoolDetails";

type MyPoolProps = {
  onClaim: () => void
  onManage: () => void;
  setPoolTypes: (number: number) => void;
  poolTypes: number;
  onNext: () => void;
  onZapOut: () => void
};

const MyPools = ({onClaim,onManage,setPoolTypes,poolTypes,onNext,onZapOut}: MyPoolProps) => {

  const [poolDetail, setPoolDetail] = useState();
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleShowDetails = (value: any) => {
    console.log(showDetails);
    setPoolDetail(value);
    console.log(value);
  };

  useEffect(() => {
    if (poolDetail !== undefined) {
      setShowDetails(true);
    }
  }, [poolDetail]);

  const handleHideDetails = () => {
    setShowDetails(false);
    setPoolDetail(undefined);
  };

  const handleZapOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onZapOut()
  }

  const handleClaim = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClaim()
  }

  

  return (
    <>
    {!showDetails ? 
      <>
        <div className="flex items-center justify-between w-full gap-6 md:flex-row flex-col">
          <div className="bg_light_dark w-[30rem] flex items-center justify-between gap-3 h-[3rem]">
            <div
              onClick={() => setPoolTypes(0)}
              className={`${poolTypes === 0 && "nav_selected"} nav`}
            >
              <Typography size="sm">ACTIVE</Typography>
            </div>
            <div
              onClick={() => setPoolTypes(1)}
              className={`${poolTypes === 1 && "nav_selected"} nav`}
            >
              <Typography size="sm">MY POOLS</Typography>
            </div>
          </div>
          <button onClick={onNext} className="w-full md:w-fit custom_btn p-3">
            <Typography secondary size="xs">
              +NEW POOL
            </Typography>
          </button>
        </div>
        <div className="flex item-center justify-center py-5 min-h-[25rem]">
          {/* <Image src="/img/icons/home.svg" width={150} height={150} alt=""/> */}
          <div className="w-full flex flex-col gap-6">
            {DUMMY_POOLS.map(
              ({title, exchangePair, state, range, lpValue, rewards, positionId,
              }) => {
                return (
                  <div onClick={() => handleShowDetails({title, exchangePair, state, range, lpValue, rewards, positionId,
              })} key={title} className="bg_dark w-full min-h-[10rem] p-4 hover:bg-[#181818] cursor-pointer">
                    <Typography>{title}</Typography>
                    <div className="sm:py-4 py-7 flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
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
                        <Typography
                          secondary
                          size="xs"
                          className="font-bold"
                          tt="uppercase"
                        >
                          {exchangePair}
                        </Typography>
                      </div>
                      <div></div>
                      <div className="lg:text-right flex flex-col gap-2">
                        <Typography size="xs" className="text_light_gray">
                          APR
                        </Typography>
                        <Typography size="lg" className="font-extrabold">
                          {lpValue}
                        </Typography>
                      </div>

                      <div className="lg:text-right flex flex-col gap-2">
                        <Typography size="xs" className="text_light_gray">
                          LP VALUE
                        </Typography>
                        <Typography size="lg" className="font-extrabold">
                          ${lpValue}
                        </Typography>
                      </div>
                      <div className="text-right flex flex-col gap-2">
                        <Typography size="xs" className="text_light_gray">
                          REWARDS
                        </Typography>
                        <Typography size="lg" className="font-extrabold">
                          ${rewards}
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
                          {range === "NARROW" ? (
                            <Image
                              src="/img/links/narrow.svg"
                              width={20}
                              height={20}
                              alt=""
                            />
                          ) : range === "MID" ? (
                            <Image
                              src="/img/links/mid.svg"
                              width={20}
                              height={20}
                              alt=""
                            />
                          ) : (
                            <Image
                              src="/img/links/wide.svg"
                              width={20}
                              height={20}
                              alt=""
                            />
                          )}
                          <Typography size="xs" className="translate-x-1">
                            {range}
                          </Typography>
                        </div>
                      </div>
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
                      <Typography size="xs">
                        Position ID: {positionId}
                      </Typography>
                      <Typography size="xs">
                        {`RANGE: 0.0006900>0.007000`}
                      </Typography>
                    </div>
                    <div className="flex items-center justify-end gap-5 py-5 flex-wrap">
                      <Button onClick={handleZapOut} className="w-full md:w-auto">
                        <Typography secondary size="xs" fw={700} tt="uppercase">
                          ZAP-OUT
                        </Typography>
                      </Button>
                      <Button className="w-full md:w-auto">
                        <Typography secondary size="xs" fw={700} tt="uppercase">
                          MANAGE
                        </Typography>
                      </Button>

                      <Button onClick={handleClaim} className="w-full md:w-auto">
                        <Typography secondary size="xs" fw={700} tt="uppercase">
                          CLAIM
                        </Typography>
                      </Button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </>
      :
      <>
      <MyPoolDetail onClaim={onClaim} onBack={handleHideDetails} />
      </>
}
    </>
  );
};

export default MyPools;
