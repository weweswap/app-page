"use client";

import { Text } from "@mantine/core";
import Image from "next/image";
import { Button, Card } from "~/components/common";

type MigrateHomeProps = {
  onMigrate: () => void;
};

export const MigrateHome = ({ onMigrate }: MigrateHomeProps) => {
  return (
    <>
      <Card>
        <Text size="xl" className="uppercase">
          EARN CHAOS COINS!
        </Text>
        <Text size="sm" className="verdana uppercase pt-4">
          1BN CHAOS COINS UP FOR GRABS TO EARN
        </Text>
      </Card>

      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 bg-gray-900 px-4 py-3 flex items-center gap-3">
            <Image
              className="rounded"
              src="/img/tokens/uniswap.png"
              width={36}
              height={36}
              alt=""
            />
            <Text size="md" className="uppercase">
              Uniswap
            </Text>
          </div>
          <Text size="sm" className="flex-1 verdana text-right">
            Your positions (1)
          </Text>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
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
              <Text size="md" className="verdana">
                WETH/WEWE <span className="text-gray-400">1.00%</span>
              </Text>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <Text size="xs" className="verdana">
                Min: 1,616.52 WETH per WEWE
              </Text>
              <Image
                src="/img/icons/arrow_swap.svg"
                width={20}
                height={9}
                alt=""
              />
              <Text size="xs" className="verdana">
                Max: 1,650.52 WETH per WEWE
              </Text>
            </div>
          </div>

          <Button onClick={onMigrate}>
            <Text size="md" fw={700}>
              Migrate
            </Text>
          </Button>
        </div>
      </Card>

      <Card>
        <Text size="lg" className="verdana">
          WEWESWAP uses a new high-performance liquidity design that:
        </Text>

        <ul className="list-decimal list-inside pt-3 verdana text-sm">
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
