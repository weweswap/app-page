import { NumberInput } from "@mantine/core";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { Button, Card, Dropdown, Typography } from "~/components/common";
import { TOKEN_LIST } from "~/constants/tokens";
import { dogica } from "~/fonts";
import { SwapStateProps } from ".";

const tokenOptions = TOKEN_LIST.map((token) => ({
  value: token.symbol,
  icon: token.icon,
}));

type SwapHomeProps = {
  onSwap: () => void;
  onSetting: () => void;
};

export const SwapHome = ({ onSwap, onSetting }: SwapHomeProps) => {
  const [inputValue, setInputValue] = useState<number>(0);

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <Typography secondary size="xl" tt="uppercase">
          Swap
        </Typography>
        <Image
          src="/img/icons/settings.svg"
          className="cursor-pointer"
          onClick={onSetting}
          width={24}
          height={24}
          alt=""
        />
      </div>

      <div className="w-full flex flex-col">
        <Card className="flex flex-col gap-4">
          <Typography secondary size="xs">
            Sell
          </Typography>

          <div className="grid grid-cols-12 md:flex-row items-center justify-between gap-3">
            <NumberInput
              classNames={{
                root: "md:col-span-9 col-span-6",
                input: clsx(
                  dogica.className,
                  "text-start bg-transparent text-white text-2xl h-auto border-transparent rounded-none"
                ),
              }}
              defaultValue={inputValue}
              hideControls
              value={inputValue}
              onChange={(value) => setInputValue(value as number)}
            />
            <Dropdown
              defaultValue="ETH"
              options={tokenOptions}
              className="md:col-span-3 col-span-6"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <Typography size="xs">$120.20</Typography>
            <div className="flex items-center gap-1">
              <Image
                src="/img/icons/wallet.svg"
                width={16}
                height={16}
                alt=""
              />
              <Typography size="xs">1,234,589 ETH</Typography>
            </div>
          </div>
        </Card>

        <div className=" flex items-center justify-center">
          <button className="absolute bg-black border border-[3px] border_turq p-3">
            <Image
              src="/img/icons/arrow_swap1.svg"
              width={16}
              height={16}
              alt=""
            />
          </button>
        </div>

        <Card className="flex flex-col gap-4">
          <Typography secondary size="xs">
            Buy
          </Typography>

          <div className="grid grid-cols-12 md:flex-row items-center justify-between gap-3">
            <NumberInput
              classNames={{
                root: "md:col-span-9 col-span-6",
                input: `${dogica.className} text-start bg-transparent text-white text-2xl h-auto border-transparent rounded-none`,
              }}
              defaultValue="109.925"
              hideControls
            />
            <Dropdown
              defaultValue="USDC"
              options={tokenOptions}
              className="md:col-span-3 col-span-6"
            />
          </div>

          <Typography size="xs" ta="center">
            $109.97 (-0.21%)
          </Typography>
        </Card>
      </div>

      <Button className="w-full" onClick={onSwap}>
        <Typography secondary size="sm" tt="uppercase" fw={600}>
          SWAP
        </Typography>
      </Button>
      {inputValue != 0 && (
        <>
          <div className="flex justify-between w-full">
            <Typography size="xs">Rate</Typography>
            <Typography size="xs">1 USDC = 0.0027 ETH ($1.00)</Typography>
          </div>
          <div className="flex justify-between w-full">
            <Typography size="xs">Route</Typography>
            <Typography size="xs">Kyber Swap Aggregator</Typography>
            <Image
              src="/img/icons/arrow_down.svg"
              width={16}
              height={16}
              alt=""
            />
          </div>
          <div className="flex justify-between w-full">
            <Typography size="xs">Total cost:</Typography>
            <div className="flex items-center gap-1">
              <Image src="/img/icons/fee.svg" width={14} height={14} alt="" />
              <Typography size="xs" fw={700}>
                $5.34
              </Typography>
              <Image
                src="/img/icons/arrow_down.svg"
                width={16}
                height={16}
                alt=""
              />
            </div>
          </div>
          <div className="flex justify-between w-full">
            <Typography size="xs">Total Fee: 0.35%</Typography>
            <div className="flex items-center gap-1">
              <Typography size="xs" fw={700}>
                $0.04
              </Typography>
              <Image
                src="/img/icons/arrow_down.svg"
                width={16}
                height={16}
                alt=""
              />
            </div>
          </div>
        </>
      )}

      <Card>
        <Typography size="lg">
          WEWESWAP uses a highly-efficient Aggregator and Zaps.
        </Typography>
        <ul className="list-decimal list-inside pt-3 text-sm">
          <li>The best prices when you swap!</li>
          <li>Low slip and fees.</li>
        </ul>
      </Card>
    </>
  );
};
