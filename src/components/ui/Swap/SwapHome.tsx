import { NumberInput } from "@mantine/core";
import clsx from "clsx";
import Image from "next/image";
import { Button, Card, Dropdown, Typography } from "~/components/common";
import { TOKEN_LIST } from "~/constants/tokens";
import { dogica } from "~/fonts";

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
        <Typography secondary size="xl" tt="uppercase">
          Swap
        </Typography>
        <Image src="/img/icons/settings.svg" width={24} height={24} alt="" />
      </div>

      <div className="w-full flex flex-col">
        <Card className="flex flex-col gap-4">
          <Typography secondary size="xs">
            Sell
          </Typography>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <NumberInput
              classNames={{
                root: "flex-1 w-full md:w-auto",
                input: clsx(
                  dogica.className,
                  "text-center md:text-start bg-transparent text-white text-2xl h-auto border-transparent rounded-none"
                ),
              }}
              defaultValue="0.030"
              hideControls
            />
            <Dropdown
              defaultValue="ETH"
              options={tokenOptions}
              className="w-full md:w-auto"
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

        <div className="h-1 flex items-center justify-center">
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

          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <NumberInput
              classNames={{
                root: "flex-1 w-full md:w-auto",
                input: `${dogica.className} text-center md:text-start bg-transparent text-white text-2xl h-auto border-transparent rounded-none`,
              }}
              defaultValue="109.925"
              hideControls
            />
            <Dropdown
              defaultValue="USDC"
              options={tokenOptions}
              className="w-full md:w-auto"
            />
          </div>

          <Typography size="xs" ta="center">
            $109.97 (-0.21%)
          </Typography>
        </Card>
      </div>

      <Button className="w-full" onClick={onSwap}>
        <Typography secondary size="sm" tt="uppercase">
          SWAP
        </Typography>
      </Button>

      <div className="w-full flex items-center justify-between gap-3">
        <Typography size="xs">1 USDC = 0.0027 ETH ($1.00)</Typography>
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

      <Card>
        <Typography size="lg">
          WEWESWAP pools use a highly-efficient Concentrated Liquidity Formula:
        </Typography>
        <ul className="list-decimal list-inside pt-3 text-sm">
          <li>The best prices when you swap!</li>
          <li>Low slip and fees.</li>
        </ul>
      </Card>
    </>
  );
};
