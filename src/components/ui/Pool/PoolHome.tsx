import Image from "next/image";
import { Button, Card, Typography } from "~/components/common";

type PoolHomeProps = {
  onNext: () => void;
  onAdd: () => void;
};

export const PoolHome = ({ onNext, onAdd }: PoolHomeProps) => {
  return (
    <>
      <Card className="flex flex-col md:flex-row text-center md:text-start items-center justify-between gap-3">
        <div className="flex-1">
          <Typography secondary size="xl" tt="uppercase">
            WEWESWAP ACTIVE POOLS
          </Typography>
          <Typography size="xs" className="pt-3">
            Simple, passive yield earnt in USDC! Make your assets work for you.
          </Typography>
        </div>
        <Button onClick={onAdd} className="w-full md:w-auto">
          <Typography secondary size="sm" fw={700} tt="uppercase">
            Add to any pool
          </Typography>
        </Button>
      </Card>

      <Card className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex-1 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <Image
                className="rounded"
                src="/img/tokens/wewe.png"
                width={24}
                height={24}
                alt=""
              />
              <Typography size="md">WEWE</Typography>
            </div>
            <Typography size="xs" className="pt-3">
              1% Fee Tier 6,000,000,000 WEWE ($1,000,000) $1,000,000 volume
            </Typography>
          </div>
          <Button onClick={onNext} className="w-full md:w-auto">
            <Typography secondary size="sm" fw={700} tt="uppercase">
              Manage
            </Typography>
          </Button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <Image
                className="rounded"
                src="/img/tokens/weth.png"
                width={24}
                height={24}
                alt=""
              />
              <Typography size="md">WETH</Typography>
            </div>
            <Typography size="xs" className="pt-3">
              0.3% Fee Tier 6,000 WETH ($1,000,000) $1,000,000 volume
            </Typography>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <Image
                className="rounded"
                src="/img/tokens/usdt.png"
                width={24}
                height={24}
                alt=""
              />
              <Typography size="md">USDT</Typography>
            </div>
            <Typography size="xs" className="pt-3">
              0.05% Fee Tier 6,000,000 WETH ($1,000,000) $1,000,000 volume
            </Typography>
          </div>
        </div>
      </Card>

      <Card>
        <Typography size="lg">
          WEWESWAP pools are all paired to USDC:
        </Typography>
        <ul className="list-decimal list-inside pt-3 text-sm">
          <li>
            Your can zap into a pool with either USDC, the asset, or both.
          </li>
          <li>
            Your assets are distributed across an automatically re-balanced
            price range.
          </li>
          <li>All fees are collected in USDC for you.</li>
        </ul>
      </Card>
    </>
  );
};
