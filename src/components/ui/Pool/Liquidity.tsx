import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { Button, Card, Typography } from "~/components/common";
import { useWewePools, WewePool } from "~/hooks/usePool";

import { usePoolContext } from "./PoolContext";
import PoolDeposit from "./PoolDeposit";

type LiquidityProps = {
  setPoolTypes: (number: number) => void;
  poolTypes: number;
  onNext: () => void;
  onBack: () => void;
  onDeposit: (token0: number, token1: number) => void;
  onWithdraw: (sharesAmount: number) => void;
};

const Liquidity = ({ setPoolTypes, poolTypes, onDeposit, onWithdraw }: LiquidityProps) => {
  const [currentPage, setCurrentPage] = useState("");
  const { setSelectedPool } = usePoolContext();


  const onSelectPoolToDeposit = (selectedPool: WewePool) => {
    setSelectedPool(selectedPool);
    setCurrentPage("deposit");
  };

  const { data: pools, isLoading } = useWewePools();

  if (isLoading) return (
    <Card className="flex items-center justify-center overflow-x-scroll h-[300px]">
      <Typography secondary size="xl" tt="uppercase">
        LOADING ...
      </Typography>
    </Card>
  );

  return (
    <>
      {currentPage == "" && (
        <Card className="overflow-x-scroll">
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
          <table className="w-[fit-content] min-w-[100%] table-auto text-left bg_dark mt-5">
            <thead>
              <tr>
                <th className="bg-blue-gray-50 p-4">
                  <Typography size="sm" className="leading-none opacity-70">
                    Pool
                  </Typography>
                </th>
                <th className="bg-blue-gray-50 p-4 hidden sm:table-cell">
                  <Typography size="sm" className="leading-none opacity-70">
                    TVL
                  </Typography>
                </th>
                <th className="bg-blue-gray-50 p-4 hidden md:table-cell">
                  <Typography size="sm" className="leading-none opacity-70">
                    Range
                  </Typography>
                </th>
                <th className="bg-blue-gray-50 p-4 hidden sm:table-cell">
                  <Typography size="sm" className="leading-none opacity-70">
                    Volume
                  </Typography>
                </th>
                <th className="bg-blue-gray-50 p-4 hidden sm:table-cell">
                  <Typography size="sm" className="leading-none opacity-70">
                    APR
                  </Typography>
                </th>
                <th className="bg-blue-gray-50 p-4">
                </th>
              </tr>
            </thead>
            <Typography className="px-4 text-sm py-2">MEMES 1%</Typography>
            <tbody>
              {pools?.wewePools.map(
                (wewePool) => (
                  <>
                    <tr
                      key={wewePool.pool}
                      className="bg-[#1c1c1c] w-[full] cursor-pointer hover:bg-[#202020]"
                      style={{ borderBottom: "1rem solid black" }}
                    >
                      <td className="p-4 font-bold ">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Image
                              className="min-w-6 min-h-6"
                              src={wewePool.logo.first}
                              alt=""
                              width={32}
                              height={32}
                            />
                            <Image
                              className="ml-[-10px] min-w-6 min-h-6"
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
                      <td className="p-4 hidden sm:table-cell">
                        <Typography size="xs" opacity={0.7}>
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                          }).format(Number(wewePool.tvl))}
                        </Typography>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <Typography size="xs" opacity={0.7}>
                          {wewePool.range}
                        </Typography>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <Typography size="xs" opacity={0.7}>
                          ${wewePool.volume}
                        </Typography>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <Typography size="xs" opacity={0.7}>
                          {wewePool.apr}%
                        </Typography>
                      </td>
                      <td className="p-4" align="right">
                        <Button
                          onClick={() =>
                            onSelectPoolToDeposit(wewePool)
                          }
                          className="w-full md:w-auto min-w-[6rem]"
                        >
                          <Typography
                            secondary
                            size="xs"
                            fw="700"
                            tt="uppercase"
                          >
                            Deposit
                          </Typography>
                        </Button>
                      </td>
                    </tr>
                  </>
                )
              )}
            </tbody>
          </table>
        </Card>
      )}
      {/* {currentPage === "pool-details" && (
        <PoolDetail onBack={handleHideDetails} />
      )} */}
      {currentPage === "deposit" && <PoolDeposit onWithdraw={onWithdraw} onDeposit={onDeposit} onBack={() => setCurrentPage("")} />}
    </>
  );
};

export default Liquidity;
