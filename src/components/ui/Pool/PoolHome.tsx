"use client";

import { Text } from "@mantine/core";
import Image from "next/image";
import { Button, Card } from "~/components/common";

type PoolHomeProps = {
  onNext: () => void;
  onAdd: () => void;
};

export const PoolHome = ({ onNext, onAdd }: PoolHomeProps) => {
  return (
    <>
      <Card className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <Text size="xl" className="uppercase">
            WEWESWAP ACTIVE POOLS
          </Text>
          <Text size="xs" className="verdana pt-3">
            Simple, passive yield earnt in USDC! Make your assets work for you.
          </Text>
        </div>
        <Button onClick={onAdd}>
          <Text size="sm" fw={700} className="uppercase">
            Add to any pool
          </Text>
        </Button>
      </Card>

      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <Image
                className="rounded"
                src="/img/tokens/wewe.png"
                width={24}
                height={24}
                alt=""
              />
              <Text size="md" className="verdana">
                WEWE
              </Text>
            </div>
            <Text size="xs" className="verdana pt-3">
              1% Fee Tier 6,000,000,000 WEWE ($1,000,000) $1,000,000 volume
            </Text>
          </div>
          <Button onClick={onNext}>
            <Text size="sm" fw={700} className="uppercase">
              Manage
            </Text>
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
              <Text size="md" className="verdana">
                WETH
              </Text>
            </div>
            <Text size="xs" className="verdana pt-3">
              0.3% Fee Tier 6,000 WETH ($1,000,000) $1,000,000 volume
            </Text>
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
              <Text size="md" className="verdana">
                USDT
              </Text>
            </div>
            <Text size="xs" className="verdana pt-3">
              0.05% Fee Tier 6,000,000 WETH ($1,000,000) $1,000,000 volume
            </Text>
          </div>
        </div>
      </Card>

      <Card>
        <Text size="lg" className="verdana">
          WEWESWAP pools are all paired to USDC:
        </Text>
        <ul className="list-decimal list-inside pt-3 verdana text-sm">
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
