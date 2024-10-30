"use client";

import Image from "next/image";
import { Loader } from "@mantine/core";
import { Button, Card, Typography } from "~/components/common";
import { usePositions } from "~/hooks/useMigrate";
import { Position } from "~/models";
import { formatPrice, tickToPrice } from "~/utils";
import { useAccount } from "wagmi";

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
        <div className="flex flex-wrap items-center justify-between gap-3 lg:flex-nowrap">
          <Typography secondary>MIGRATE AND EARN CHAOS!</Typography>
        </div>
        <Typography size="sm" tt="uppercase" className="pt-4">
          1BN CHAOS COINS UP FOR GRABS TO EARN
        </Typography>
      </div>

      <div className="w-full py-2">YOUR UNISWAP ACTIVE POSITIONS</div>
      {positions && (
        <Card className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="bg_light_dark flex w-full flex-1 items-center gap-3 px-4 py-3 lg:w-fit">
              <Image
                className="rounded"
                src="/img/tokens/uniswap-migrate.png"
                width={36}
                height={36}
                alt=""
              />
              <Typography secondary size="md" tt="uppercase">
                Uniswap
              </Typography>
            </div>
            <Typography size="sm" ta="right" flex={1}>
              Your positions ({(positions || []).length})
            </Typography>
          </div>
          {positions.map((position, index) => (
            <div
              key={index}
              className="my-2 flex flex-col items-center justify-between gap-4 md:flex-row"
            >
              <div className="flex flex-1 flex-col items-center md:items-start">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <Image
                      src="/img/tokens/eth.png"
                      width={24}
                      height={24}
                      alt="WETH"
                    />
                    <Image
                      src="/img/tokens/wewe.png"
                      width={24}
                      height={24}
                      alt="WEWE"
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

                <div className="mt-3 flex items-center gap-3">
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
                className="flex w-full gap-2 sm:w-fit md:w-auto"
              >
                <Typography secondary size="sm" fw={700}>
                  Migrate
                </Typography>
              </Button>
            </div>
          ))}
        </Card>
      )}
      {positionsLoading && (
        <Card className="flex flex-col gap-4">
          <Loader color="white" size="lg" className="mx-auto" />
        </Card>
      )}
      {!positionsLoading && !positions && (
        <Card className="flex flex-col gap-4">
          <Typography size="lg" className="mx-auto">
            No Available Positions!
          </Typography>
        </Card>
      )}

      <Card>
        <Typography size="lg">
          WEWESWAP uses a new high-performance liquidity design that:
        </Typography>

        <ul className="list-inside list-decimal pt-3 text-sm">
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
