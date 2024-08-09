import Image from "next/image";
import { Button, Card, Typography } from "~/components/common";

type MigrateDetailProps = {
  onBack: () => void;
  onMigrate: () => void;
};

export const MigrateDetail = ({ onBack, onMigrate }: MigrateDetailProps) => {
  return (
    <>
      <Card className="flex flex-col gap-6 p-6">
        <div>
          <button onClick={onBack} className="w-full text-start">
            <Typography secondary size="xl">
              {"<"} Migrate Uniswap Liquidity
            </Typography>
          </button>
          <Typography size="xs" className="mt-3">
            All WEWESWAP pools are paired in USDC - this means easy to collect
            and earn fees. This migration will move your liquidity over.
          </Typography>
        </div>

        <div className="flex items-center justify-between bg-gray-900 p-4 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
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
            <Typography secondary className="text-xs sm:text-lg">
              WETH/WEWE
            </Typography>
          </div>

          <Typography secondary size="md">
            {">"}
          </Typography>

          <div className="flex flex-col md:flex-row items-center gap-3">
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
            <Typography secondary className="text-xs sm:text-lg">
              USDC/WEWE
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Typography size="xs">START WETH</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                0.001079432
              </Typography>
              <Image src="/img/tokens/weth.png" width={24} height={24} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">START WEWE</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                0.428156
              </Typography>
              <Image src="/img/tokens/wewe.png" width={24} height={24} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">END USDC</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                0.001079432
              </Typography>
              <Image src="/img/tokens/usdc.png" width={24} height={24} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">END WEWE</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                0.001079432
              </Typography>
              <Image src="/img/tokens/weth.png" width={24} height={24} alt="" />
            </div>
          </div>
        </div>

        <Button className="w-full" onClick={onMigrate}>
          <Typography secondary size="md" fw={700}>
            Migrate
          </Typography>
        </Button>
      </Card>

      <Card>
        <Typography size="lg">By pairing with USDC, WEWESWAP:</Typography>
        <ul className="list-decimal list-inside pt-3 text-sm">
          <li>Allows you to earn a stream of stable yield (nice!)</li>
          <li>
            Is a more stable “working asset”, which means less volatility in
            total (cool!)
          </li>
          <li>
            Is paired with a volatile asset, so potentially more volume and fees
            (yay!)
          </li>
        </ul>
      </Card>
    </>
  );
};
