import Image from "next/image";
import { useState } from "react";
import { Button, Card, ConnectButton, Typography } from "~/components/common";
import { useWewePositions, WewePosition } from "~/hooks/useWewePositions";
import { useAccount } from "wagmi";
import { useWewePools } from "~/hooks/usePool";
import PoolDeposit from "./PoolDeposit";
import { usePoolContext } from "./PoolContext";

type MySharesProps = {
  onClaim: (wewePositon: WewePosition) => void;
  onDeposit: (token0: number, token1: number) => void;
  onWithdraw: (sharesAmount: number) => void;
  setPoolTypes: (number: number) => void;
  poolTypes: number;
};

const MyShares = ({
  onClaim,
  onDeposit,
  onWithdraw,
  setPoolTypes,
  poolTypes,
}: MySharesProps) => {
  const [currentPage, setCurrentPage] = useState("");
  const { setSelectedPosition, setSelectedPool } = usePoolContext();

  const handleShowDetails = (position: WewePosition) => {
    setSelectedPosition(position);
    setSelectedPool(
      wewePools?.wewePools.find(
        (pool) => pool.address.toLowerCase() === position.wewePoolAddress.toLowerCase()
      )
    );
    setCurrentPage("manage");
  };

  const handleClaim = (
    wewePosition: WewePosition,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => {
    event?.stopPropagation();
    onClaim(wewePosition);
  };

  const { address } = useAccount();
  const { data: wewePools, isLoading: isLoadingPools } = useWewePools();

  const { data: wewePositions, isLoading: isLoadingPositions } = useWewePositions(
    wewePools?.wewePools,
    address
  );

  return (
    <>
      {currentPage == "" && (
        <Card>
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
            {poolTypes === 1 && !address && (
              <div className="w-full flex flex-col items-center justify-center gap-4">
                <Typography size="lg" className="text_light_gray">
                  Please sign in to view your shares.
                </Typography>
                <ConnectButton />
              </div>
            )}
            {!isLoadingPositions && !isLoadingPools && address && (
              <div className="w-full flex flex-col">
                <Typography size="lg">MEMES 1%</Typography>
                {wewePositions?.wewePositions.map((wewePosition) => {
                  return (
                    <div
                      onClick={() => handleShowDetails(wewePosition)}
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
                            {wewePosition.exchangePair}
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
                            {wewePosition.shares}
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
                            {wewePosition.apr}%
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
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                            }).format(Number(wewePosition.pendingUsdcReward))}
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
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                            }).format(Number(wewePosition.lpValue))}
                          </Typography>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 flex-wrap py-4 sm:py-1 ">
                        <div className="flex w-full justify-between items-center">
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
                            {wewePosition.range === "NARROW" ? (
                              <Image
                                src="/img/links/narrow.svg"
                                width={20}
                                height={20}
                                alt=""
                              />
                            ) : wewePosition.range === "MID" ? (
                              <Image
                                src="/img/links/mid.svg"
                                width={20}
                                height={20}
                                alt=""
                              />
                            ) : wewePosition.range === "INFINITY" ? (
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
                              {wewePosition.range}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-5 py-5 flex-wrap">
                        <Button
                          onClick={() => handleShowDetails(wewePosition)}
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
                          onClick={(e) => handleClaim(wewePosition, e)}
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
                })}
              </div>
            )}
          </div>
        </Card>
      )}
      {currentPage === "manage" && (
        <PoolDeposit
          enableClaimBlock
          onClaim={onClaim}
          onWithdraw={onWithdraw}
          onDeposit={onDeposit}
          onBack={() => setCurrentPage("")}
        />
      )}
    </>
  );
};

export default MyShares;