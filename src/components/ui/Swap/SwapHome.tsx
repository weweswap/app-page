"use client";

import { NumberInput, Text } from "@mantine/core";
import Image from "next/image";
import { Button, Card, Dropdown } from "~/components/common";
import { TOKEN_LIST } from "~/constants/tokens";

const tokenOptions = TOKEN_LIST.map((token) => ({
  value: token.symbol,
  icon: token.icon,
}));

type SwapHomeProps = {
  onSwap: () => void;
};

export const SwapHome = ({ onSwap }: SwapHomeProps) => {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <Text size="xl" className="uppercase">
          Swap
        </Text>
        <Image src="/img/icons/settings.svg" width={24} height={24} alt="" />
      </div>

      <div className="w-full flex flex-col">
        <Card className="flex flex-col gap-4">
          <Text size="xs">Sell</Text>

          <div className="flex items-center justify-between gap-3">
            <NumberInput
              classNames={{
                root: "flex-1",
                input:
                  "bg-transparent dogica text-white text-2xl h-auto border-transparent rounded-none",
              }}
              defaultValue="0.030"
              hideControls
            />
            <Dropdown defaultValue="ETH" options={tokenOptions} />
          </div>

          <div className="flex items-center justify-between gap-3">
            <Text size="xs" className="verdana">
              $120.20
            </Text>
            <div className="flex items-center gap-1">
              <Image
                src="/img/icons/wallet.svg"
                width={16}
                height={16}
                alt=""
              />
              <Text size="xs" className="verdana">
                1,234,589 ETH
              </Text>
            </div>
          </div>
        </Card>

        <div className="h-1 flex items-center justify-center">
          <button className="absolute bg-black border border-[3px] border_aqua p-3">
            <Image
              src="/img/icons/arrow_swap1.svg"
              width={16}
              height={16}
              alt=""
            />
          </button>
        </div>

        <Card className="flex flex-col gap-4">
          <Text size="xs">Buy</Text>

          <div className="flex items-center justify-between gap-3">
            <NumberInput
              classNames={{
                root: "flex-1",
                input:
                  "bg-transparent dogica text-white text-2xl h-auto border-transparent rounded-none",
              }}
              defaultValue="109.925"
              hideControls
            />
            <Dropdown defaultValue="USDC" options={tokenOptions} />
          </div>

          <Text size="xs" ta="center" className="verdana">
            $109.97 (-0.21%)
          </Text>
        </Card>
      </div>

      <Button className="w-full" onClick={onSwap}>
        <Text size="sm" className="uppercase">
          SWAP
        </Text>
      </Button>

      <div className="w-full flex items-center justify-between gap-3">
        <Text size="xs" className="verdana">
          1 USDC = 0.0027 ETH ($1.00)
        </Text>
        <div className="flex items-center gap-1">
          <Image src="/img/icons/fee.svg" width={14} height={14} alt="" />
          <Text size="xs" fw={700} className="verdana">
            $5.34
          </Text>
          <Image
            src="/img/icons/arrow_down.svg"
            width={16}
            height={16}
            alt=""
          />
        </div>
      </div>

      <Card>
        <Text size="lg" className="verdana">
          WEWESWAP pools use a highly-efficient Concentrated Liquidity Formula:
        </Text>
        <ul className="list-decimal list-inside pt-3 verdana text-sm">
          <li>The best prices when you swap!</li>
          <li>Low slip and fees.</li>
        </ul>
      </Card>
    </>
  );
};
