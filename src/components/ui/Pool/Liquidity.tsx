import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Card, Typography } from "~/components/common";
import { DUMMY_TABLE_HEAD, DUMMY_TABLE_CONTENT, DUMMY_POOLS } from "./dummy";

import PoolBox from "./PoolBox";
import Link from "next/link";
import ComingSoon from "~/components/common/ComingSoon";
import LiquidityDetails from "./LiquidityDetails";
import { useWewePositions } from "~/hooks/useWewePositions";
import { useAccount } from "wagmi";
import { useWewePools } from "~/hooks/usePool";

type LiquidityProps = {
  onClaim: () => void;
  onManage: () => void;
  setPoolTypes: (number: number) => void;
  poolTypes: number;
  onNext: () => void;
  onZapOut: () => void;
};

const Liquidity = ({
  onClaim,
  onManage,
  setPoolTypes,
  poolTypes,
  onNext,
  onZapOut,
}: LiquidityProps) => {
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
    onZapOut();
  };

  const handleClaim = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClaim();
  };
  
  const { address } = useAccount();
  const { data: wewePools } = useWewePools();

  const { data: wewePositions } = useWewePositions(wewePools?.wewePools, address)
  
  return (
    <>
      {!showDetails ? (
        <>
          <div className="flex items-center justify-between w-full gap-6 md:flex-row flex-col">
            <div className="bg_light_dark sm:w-[30rem] w-full flex items-center justify-between gap-3 h-[3rem]">
              <div
                onClick={() => setPoolTypes(0)}
                className={`${poolTypes === 0 && "nav_selected"} nav`}
              >
                <Typography size="sm">Liquidity</Typography>
              </div>
              <div
                onClick={() => setPoolTypes(1)}
                className={`${poolTypes === 1 && "nav_selected"} nav`}
              >
                <Typography size="sm">My Shares</Typography>
              </div>
            </div>
          </div>
          <div className="flex item-center justify-center py-5">
            {/* <Image src="/img/icons/home.svg" width={150} height={150} alt=""/> */}
            <div className="w-full flex flex-col">
              <Typography size="lg">MEMES 1%</Typography>
              {wewePositions?.wewePositions.map(
                ({
                  exchangePair,
                  state,
                  range,
                  lpValue,
                  rewards,
                  positionId,
                  apr,
                  shares,
                }) => {
                  return (
                    <div
                      onClick={() =>
                        handleShowDetails({
                          exchangePair,
                          state,
                          range,
                          lpValue,
                          rewards,
                          positionId,
                        })
                      }
                      className="bg_dark w-full min-h-[10rem] p-4 hover:bg-[#181818] cursor-pointer"
                    >
                      <div className="pb-4  flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Image
                              src="/img/tokens/wewe.png"
                              width={24}
                              height={24}
                              alt=""
                              className="-translate-x-1.5"
                            />
                            <Image
                              src="/img/tokens/usdc.png"
                              className="translate-x-[-12px]"
                              width={24}
                              height={24}
                              alt=""
                            />
                          </div>
                          <Typography secondary fs="md" tt="uppercase">
                            {exchangePair}
                          </Typography>
                        </div>
                        <div></div>
                        <div className="lg:text-right flex flex-col gap-2">
                          <Typography
                            size="xs"
                            ta="center"
                            className="text_light_gray"
                          >
                            SHARES
                          </Typography>
                          <Typography
                            fs="md"
                            ta="center"
                            className="font-extrabold"
                          >
                            {shares}
                          </Typography>
                        </div>
                        <div className="lg:text-right flex flex-col gap-2">
                          <Typography
                            size="xs"
                            ta="center"
                            className="text_light_gray"
                          >
                            APR
                          </Typography>
                          <Typography
                            fs="md"
                            ta="center"
                            className="font-extrabold"
                          >
                            {apr}
                          </Typography>
                        </div>

                        <div className="text-right flex flex-col gap-2">
                          <Typography
                            size="xs"
                            ta="center"
                            className="text_light_gray"
                          >
                            REWARDS
                          </Typography>
                          <Typography
                            fs="md"
                            ta="end"
                            className="font-extrabold"
                          >
                            {rewards}
                          </Typography>
                        </div>

                        <div className="lg:text-right flex flex-col gap-2">
                          <Typography
                            size="xs"
                            ta="center"
                            className="text_light_gray"
                          >
                            TOTAL VALUE
                          </Typography>
                          <Typography
                            fs="md"
                            ta="center"
                            className="font-extrabold"
                          >
                            {
                              new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 2,
                              }).format(Number(lpValue))
                            }
                          </Typography>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 flex-wrap py-4 sm:py-1 ">
                        <div className="flex w-full justify-between items-center">
                          {/* <Typography
                            size="xs"
                            opacity={0.7}
                            className={`bg_green flex justify-center rounded-full w-[6rem] py-1 `}
                          >
                            IN RANGE
                          </Typography> */}
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
                            ) : range === "INFINITY" ? (
                              <Image
                                src="/img/icons/Infinity.svg"
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
                          {/* <Typography size="xs" opacity={0.7}>
                            Position ID: {positionId}
                          </Typography>
                          <Typography size="xs" opacity={0.7}>
                            {`RANGE: 0.0006900>0.007000`}
                          </Typography> */}
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-5 py-5 flex-wrap">
                        <Button
                          onClick={handleZapOut}
                          className="w-full md:w-auto"
                        >
                          <Typography
                            secondary
                            size="xs"
                            fw={700}
                            tt="uppercase"
                          >
                            manage
                          </Typography>
                        </Button>

                        <Button
                          onClick={handleClaim}
                          className="w-full md:w-auto"
                        >
                          <Typography
                            secondary
                            size="xs"
                            fw={700}
                            tt="uppercase"
                          >
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
      ) : (
        <>
          <LiquidityDetails onClaim={onClaim} onBack={handleHideDetails} />
        </>
      )}
    </>
  );
};

export default Liquidity;
