"use client";

import { Divider, Text } from "@mantine/core";
import Image from "next/image";
import { Button, Card } from "~/components/common";

type PoolClaimProps = {
  onBack: () => void;
  onClaim: () => void;
};

export const PoolClaim = ({ onBack, onClaim }: PoolClaimProps) => {
  return (
    <>
      <Card>
        <button onClick={onBack} className="flex items-center gap-3">
          <Text size="xl">{"<"}</Text>
          <Image src="/img/tokens/wewe.png" width={24} height={24} alt="" />
          <Text size="xl">WEWE</Text>
        </button>
      </Card>

      <Card className="flex justify-between gap-3">
        <div>
          <Text size="sm">LP Value</Text>
          <Text size="lg" fw={700} className="pt-5">
            $2,000.00
          </Text>
        </div>
        <div>
          <Text size="sm">Generated Fees</Text>
          <Text size="lg" fw={700} className="pt-5">
            $260.56
          </Text>
        </div>
      </Card>

      <div className="w-full sm:w-auto border_violet p-4 flex flex-col gap-6 translate-none lg:translate-x-[50%]">
        <Text size="xs">Claim USDC</Text>
        <Divider className="border-blue-700" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Text size="sm">1200 USDC</Text>
          <Button className="w-full sm:w-auto" onClick={onClaim}>
            <Text size="xs" fw={700}>
              Claim USDC
            </Text>
          </Button>
        </div>
      </div>
    </>
  );
};
