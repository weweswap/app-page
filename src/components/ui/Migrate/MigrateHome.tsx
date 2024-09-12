"use client";

import { Loader } from "@mantine/core";
import Image from "next/image";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { getPositions } from "~/api/migrate";
import { Button, Card, Typography } from "~/components/common";
import { usePositions, useSafeTransfer } from "~/hooks/useMigrate";
import { Position } from "~/models";
import {  formatPrice, tickToPrice } from "~/utils";

type MigrateHomeProps = {
  onSelectPosition: (position: Position) => void;
};

export const MigrateHome = ({ onSelectPosition }: MigrateHomeProps) => {
  const { address } = useAccount();

  const { data: positions, isLoading: positionsLoading } = usePositions(
    address!
  );
  return (
    <>
      <div className="w-full py-5">
        <div className="flex items-center justify-between gap-3 lg:flex-nowrap flex-wrap">
          <Typography secondary>MIGRATE AND EARN CHAOS!</Typography>
        </div>
        <Typography size="sm" tt="uppercase" className="pt-4">
          1BN CHAOS COINS UP FOR GRABS TO EARN
        </Typography>
      </div>

      <div className="py-2 w-full">YOUR UNISWAP ACTIVE POSITIONS</div>
      {positions && (
        <Card className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 bg_light_dark px-4 py-3 flex items-center gap-3 lg:w-fit w-full">
              <Image
                className="rounded"
                src="/img/tokens/uniswap.png"
                width={36}
                height={36}
                alt=""
              />
              <Typography secondary size="md" tt="uppercase">
                Uniswap
              </Typography>
            </div>
            <Typography size="sm" ta="right" flex={1}>
              Your positions ({(positions as any).length})
            </Typography>
          </div>
          {positions.map((position, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between gap-4 my-2"
            >
              <div className="flex-1 flex flex-col items-center md:items-start">
                <div className="flex items-center gap-3">
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
                  <Typography size="md">
                    WETH/WEWE -{" "}
                    <span className="text-gray-400">
                      {position.feePercent.toFixed(2)}%
                    </span>
                  </Typography>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <Typography size="xs">
                    ID: {Number(position.tokenId)}
                  </Typography>
                  <Typography size="xs">
                    Min: {formatPrice(tickToPrice(position.tickLower))} WETH per
                    WEWE
                  </Typography>
                  <Image
                    src="/img/icons/arrow_swap.svg"
                    width={20}
                    height={9}
                    alt=""
                  />
                  <Typography size="xs">
                    Max: {formatPrice(tickToPrice(position.tickUpper))} WETH per
                    WEWE
                  </Typography>
                </div>
              </div>

              <Button
                key={index}
                onClick={() => onSelectPosition(position)}
                className="sm:w-fit w-full md:w-auto flex gap-2"
              >
                <Typography secondary size="sm" fw={700}>
                  Migrate
                </Typography>
              </Button>
            </div>
          ))}
        </Card>
      )}

      <Card>
        <Typography size="lg">
          WEWESWAP uses a new high-performance liquidity design that:
        </Typography>

        <ul className="list-decimal list-inside pt-3 text-sm">
          <li>Is very simple to add or remove liquidity (yay!)</li>
          <li>
            Is fully passive, using auto-rebalancing for you (you never go out
            of range!)
          </li>
          <li>Collects all fees in USDC for you (nice!)</li>
        </ul>
      </Card>
    </>
  );
};
