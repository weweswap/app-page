
"use client"

import Image from "next/image";
import { Button, Card, Typography } from "~/components/common";

type MigrateHomeProps = {
  onMigrate: () => void;
};

export const MigrateHome = ({ onMigrate }: MigrateHomeProps) => {
  return (
    <>
      <div className="w-full py-5">
        <div className="flex items-center justify-between gap-3 lg:flex-nowrap flex-wrap" >
        <Typography secondary>
          MIGRATE AND EARN CHAOS!
          </Typography>
        </div>
        <Typography size="sm" tt="uppercase" className="pt-4">
          1BN CHAOS COINS UP FOR GRABS TO EARN
        </Typography>
      </div>

      <div className="py-2 w-full">
        YOUR UNISWAP ACTIVE POSITIONS
      </div>
      <Card className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 bg_light_dark px-4 py-3 flex items-center gap-3">
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
            Your positions (1)
          </Typography>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
                WETH/WEWE- <span className="text-gray-400">1.00%</span>
              </Typography>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <Typography size="xs">Min: 1,616.52 WETH per WEWE</Typography>
              <Image
                src="/img/icons/arrow_swap.svg"
                width={20}
                height={9}
                alt=""
              />
              <Typography size="xs">Max: 1,650.52 WETH per WEWE</Typography>
            </div>
          </div>

          <Button onClick={onMigrate}>
            <Typography secondary size="sm" fw={700}>
              Migrate
            </Typography>
          </Button>
        </div>
      </Card>

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
