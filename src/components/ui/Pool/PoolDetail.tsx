"use client";

import { NumberInput, Text } from "@mantine/core";
import Image from "next/image";
import { Button, Card } from "~/components/common";

type PoolDetailProps = {
  onBack: () => void;
};

export const PoolDetail = ({ onBack }: PoolDetailProps) => {
  return (
    <>
      <Card>
        <button onClick={onBack}>
          <Text size="xl">{"<"} WEWE</Text>
        </button>
      </Card>

      <Card className="flex items-center gap-4">
        <NumberInput
          classNames={{
            root: "flex-1",
            input:
              "bg-gray-900 p-4 vcr text-white text-lg h-auto border-transparent rounded-none",
          }}
          hideControls
        />
        <div className="flex-1 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image src="/img/tokens/wewe.png" width={40} height={40} alt="" />
            <Text size="md" className="verdana">
              WEWE
            </Text>
            <Image
              src="/img/icons/arrow_down.svg"
              width={16}
              height={16}
              alt=""
            />
          </div>
          <Button>
            <Text size="sm">Add</Text>
          </Button>
        </div>
      </Card>

      <Card>
        <Text size="lg" className="verdana">
          When you add liquidity to an Active Pool:
        </Text>
        <Text size="xs" className="verdana pt-3">
          <ul className="list-decimal list-inside">
            <li>Your assets are swapped to be added correctly to the pool.</li>
            <li>
              Any assets that can’t fit in the pool are refunded back to you.
            </li>
            <li>
              You may experience a small slip when you enter a pool that is
              out-of-balance.
            </li>
          </ul>
        </Text>
      </Card>
    </>
  );
};
