"use client";

import { Text } from "@mantine/core";
import Image from "next/image";
import { Button, Card } from "~/components/common";
import { dogica, verdana } from "~/fonts";

type PoolHomeProps = {
  onNext: () => void;
  onAdd: () => void;
};

export const PoolHome = ({ onNext, onAdd }: PoolHomeProps) => {
  return (
    <>
      <Card
        className={`flex flex-col md:flex-row text-center md:text-start items-center justify-between gap-3 ${verdana.className}`}
      >
        <div className="flex-1">
          <Text size="xl" className={`uppercase ${dogica.className}`}>
            WEWESWAP ACTIVE POOLS
          </Text>
          <Text size="xs" className="pt-3">
            Simple, passive yield earnt in USDC! Make your assets work for you.
          </Text>
        </div>
        <Button onClick={onAdd} className="w-full md:w-auto">
          <Text size="sm" fw={700} className={`uppercase ${dogica.className}`}>
            Add to any pool
          </Text>
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
              <Text size="md" >
                WEWE
              </Text>
            </div>
            <Text size="xs" className="pt-3">
              1% Fee Tier 6,000,000,000 WEWE ($1,000,000) $1,000,000 volume
            </Text>
          </div>
          <Button onClick={onNext} className="w-full md:w-auto">
            <Text size="sm" fw={700} className={`uppercase ${dogica.className}`}>
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
              <Text size="md" >
                WETH
              </Text>
            </div>
            <Text size="xs" className="pt-3">
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
              <Text size="md" >
                USDT
              </Text>
            </div>
            <Text size="xs" className=" pt-3">
              0.05% Fee Tier 6,000,000 WETH ($1,000,000) $1,000,000 volume
            </Text>
          </div>
        </div>
      </Card>

      <Card>
        <Text size="lg" >
          WEWESWAP pools are all paired to USDC:
        </Text>
        <ul className="list-decimal list-inside pt-3  text-sm">
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
