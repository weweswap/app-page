"use client";

import { Text } from "@mantine/core";
import Image from "next/image";
import { Card } from "~/components/common";

type MigrateDetailProps = {
  onBack: () => void;
  onMigrate: () => void;
};

export const MigrateDetail = ({ onBack, onMigrate }: MigrateDetailProps) => {
  return (
    <>
      <Card className="flex flex-col gap-6 p-6">
        <div>
          <button onClick={onBack}>
            <Text size="xl">{"<"} Migrate Uniswap Liquidity</Text>
          </button>
          <Text size="xs" className="verdana mt-3">
            All WEWESWAP pools are paired in USDC - this means easy to collect
            and earn fees. This migration will move your liquidity over.
          </Text>
        </div>

        <div className="flex items-center justify-between bg-gray-900 p-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Image src="/img/tokens/weth.png" width={24} height={24} alt="" />
              <Image
                src="/img/tokens/wewe.png"
                width={24}
                height={24}
                alt=""
                className="-translate-x-1.5"
              />
            </div>
            <Text size="md">WETH/WEWE</Text>
          </div>

          <Text size="md">{">"}</Text>

          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Image src="/img/tokens/usdc.png" width={24} height={24} alt="" />
              <Image
                src="/img/tokens/wewe.png"
                width={24}
                height={24}
                alt=""
                className="-translate-x-1.5"
              />
            </div>
            <Text size="md">USDC/WEWE</Text>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Text size="xs" className="verdana">
              START WETH
            </Text>
            <div className="flex items-center gap-2">
              <Text size="xs" fw={700} className="verdana">
                0.001079432
              </Text>
              <Image src="/img/tokens/weth.png" width={24} height={24} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Text size="xs" className="verdana">
              START WEWE
            </Text>
            <div className="flex items-center gap-2">
              <Text size="xs" fw={700} className="verdana">
                0.428156
              </Text>
              <Image src="/img/tokens/wewe.png" width={24} height={24} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Text size="xs" className="verdana">
              END USDC
            </Text>
            <div className="flex items-center gap-2">
              <Text size="xs" fw={700} className="verdana">
                0.001079432
              </Text>
              <Image src="/img/tokens/usdc.png" width={24} height={24} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Text size="xs" className="verdana">
              END WEWE
            </Text>
            <div className="flex items-center gap-2">
              <Text size="xs" fw={700} className="verdana">
                0.001079432
              </Text>
              <Image src="/img/tokens/weth.png" width={24} height={24} alt="" />
            </div>
          </div>
        </div>

        <button className="w-full bg-blue-800 px-8 py-2" onClick={onMigrate}>
          Migrate
        </button>
      </Card>

      <Card>
        <Text size="lg" className="verdana">
          By pairing with USDC, WEWESWAP:
        </Text>
        <Text size="xs" className="verdana pt-3">
          <ul className="list-decimal list-inside">
            <li>Allows you to earn a stream of stable yield (nice!)</li>
            <li>
              Is a more stable “working asset”, which means less volatility in
              total (cool!)
            </li>
            <li>
              Is paired with a volatile asset, so potentially more volume and
              fees (yay!)
            </li>
          </ul>
        </Text>
      </Card>
    </>
  );
};
