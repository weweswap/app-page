import React, { useState } from "react";
import Image from "next/image";
import { Button, Card, Typography } from "~/components/common";
import { useWewePools, WewePool } from "~/hooks/usePool";
import { formatNumber } from "~/utils";

import { usePoolContext } from "./PoolContext";
import PoolDeposit from "./PoolDeposit";

type LiquidityProps = {
  setPoolTypes: (number: number) => void;
  poolTypes: number;
  onNext: () => void;
  onBack: () => void;
  onDeposit: (token0: number, token1: number) => void;
  onWithdraw: (sharesAmount: bigint) => void;
};

const Liquidity = ({
  setPoolTypes,
  poolTypes,
  onDeposit,
  onWithdraw,
}: LiquidityProps) => {
  const [currentPage, setCurrentPage] = useState("");
  const { setSelectedPool } = usePoolContext();

  const onSelectPoolToDeposit = (selectedPool: WewePool) => {
    setSelectedPool(selectedPool);
    setCurrentPage("deposit");
  };

  const { data: pools, isLoading } = useWewePools();

  if (isLoading)
    return (
      <Card className="flex h-[300px] items-center justify-center overflow-x-scroll">
        <Typography secondary size="xl" tt="uppercase">
          LOADING ...
        </Typography>
      </Card>
    );

  return (
    <>
      {currentPage == "" && (
        <Card className="overflow-x-scroll">
          <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row">
            <div className="bg_light_dark flex h-12 w-full items-center justify-between gap-3 sm:w-[30rem]">
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
          <table className="bg_dark mt-5 w-fit min-w-full table-auto text-left">
            <thead>
              <tr>
                <th className="bg-blue-gray-50 p-4">
                  <Typography size="sm" className="leading-none opacity-70">
                    Pool
                  </Typography>
                </th>
                <th className="bg-blue-gray-50 hidden p-4 sm:table-cell">
                  <Typography size="sm" className="leading-none opacity-70">
                    TVL
                  </Typography>
                </th>
                <th className="bg-blue-gray-50 hidden p-4 md:table-cell">
                  <Typography size="sm" className="leading-none opacity-70">
                    Range
                  </Typography>
                </th>
                <th className="bg-blue-gray-50 hidden p-4 sm:table-cell">
                  <Typography size="sm" className="leading-none opacity-70">
                    Volume
                  </Typography>
                </th>
                <th className="bg-blue-gray-50 hidden p-4 sm:table-cell">
                  <Typography size="sm" className="leading-none opacity-70">
                    APR
                  </Typography>
                </th>
                <th className="bg-blue-gray-50 p-4"></th>
              </tr>
            </thead>
            <Typography className="px-4 py-2 text-sm">MEMES 1%</Typography>
            <tbody>
              {pools?.wewePools.map((wewePool) => (
                <>
                  <tr
                    key={wewePool.pool}
                    className="w-[full] cursor-pointer bg-[#1c1c1c] hover:bg-[#202020]"
                    style={{ borderBottom: "1rem solid black" }}
                  >
                    <td className="p-4 font-bold ">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Image
                            className="min-h-6 min-w-6"
                            src={wewePool.logo.first}
                            alt=""
                            width={32}
                            height={32}
                          />
                          <Image
                            className="ml-[-10px] min-h-6 min-w-6"
                            src={wewePool.logo.second}
                            alt=""
                            width={32}
                            height={32}
                          />
                        </div>
                        <Typography size="xs" opacity={0.7}>
                          {wewePool.type}
                        </Typography>
                      </div>
                    </td>
                    <td className="hidden p-4 sm:table-cell">
                      <Typography size="xs" opacity={0.7}>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                        }).format(Number(wewePool.tvl))}
                      </Typography>
                    </td>
                    <td className="hidden p-4 md:table-cell">
                      <Typography size="xs" opacity={0.7}>
                        {wewePool.range}
                      </Typography>
                    </td>
                    <td className="hidden p-4 sm:table-cell">
                      <Typography size="xs" opacity={0.7}>
                        ${formatNumber(wewePool.volume)}
                      </Typography>
                    </td>
                    <td className="hidden p-4 sm:table-cell">
                      <Typography size="xs" opacity={0.7}>
                        {wewePool.apr}%
                      </Typography>
                    </td>
                    <td className="p-4" align="right">
                      <Button
                        onClick={() => onSelectPoolToDeposit(wewePool)}
                        className="w-full min-w-24 md:w-auto"
                      >
                        <Typography secondary size="xs" fw="700" tt="uppercase">
                          Deposit
                        </Typography>
                      </Button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      {/* {currentPage === "pool-details" && (
        <PoolDetail onBack={handleHideDetails} />
      )} */}
      {currentPage === "deposit" && (
        <PoolDeposit
          onWithdraw={onWithdraw}
          onDeposit={onDeposit}
          onBack={() => setCurrentPage("")}
        />
      )}
    </>
  );
};

export default Liquidity;
