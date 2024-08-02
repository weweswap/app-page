"use client";

import { Loader, Text } from "@mantine/core";
import Image from "next/image";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { Button, Card } from "~/components/common";
import { CONTRACT_ADDRESSES } from "~/constants";
import { useApproveAndCall, useQuoteVult, useTokenBalance } from "~/hooks";

export const MergeHome = () => {
  const { address } = useAccount();
  const { data: balanceWewe } = useTokenBalance(
    address,
    CONTRACT_ADDRESSES.wewe
  );
  const { data: quoteAmount } = useQuoteVult(balanceWewe);
  const { onWriteAsync: onApproveAndCall, isPending } = useApproveAndCall();

  const handleMerge = () => {
    onApproveAndCall(balanceWewe);
  };

  return (
    <>
      <Card>
        <Text size="xl" className="uppercase">
          MERGE YOUR COINS
        </Text>
        <Text size="sm" className="verdana uppercase pt-4">
          Forever merge your coins
        </Text>
      </Card>

      <Card className="flex flex-col gap-5">
        <div className="bg-gray-900 flex items-center justify-between gap-3 p-4">
          <div className="flex-1 flex items-center gap-3">
            <Image src="/img/tokens/wewe.png" width={32} height={32} alt="" />
            <Text size="md">WEWE</Text>
          </div>
          <Image
            src="/img/icons/arrow_right.svg"
            width={16}
            height={16}
            alt=""
          />
          <div className="flex-1 flex items-center justify-end gap-3">
            <Image src="/img/tokens/vult.svg" width={32} height={32} alt="" />
            <Text size="md">VULT</Text>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/img/tokens/wewe.png" width={24} height={24} alt="" />
              <Text size="md" className="verdana">
                WEWE
              </Text>
            </div>
            <div className="flex items-center gap-3 pt-3">
              <Text size="xs" className="verdana">
                {formatEther(balanceWewe)} WEWE
              </Text>
              <Image
                src="/img/icons/arrow_right1.svg"
                width={19}
                height={9}
                alt=""
              />
              <Text size="xs" className="verdana">
                Max: {formatEther(quoteAmount)} VULT
              </Text>
            </div>
          </div>

          <Button
            className="flex items-center gap-3"
            disabled={!address || !balanceWewe || isPending}
            onClick={handleMerge}
          >
            {isPending && <Loader color="white" size="sm" />}
            <Text size="sm" fw={700}>
              Merge
            </Text>
          </Button>
        </div>
      </Card>

      <Card>
        <Text size="lg" className="verdana">
          MERGE your WEWE into VULT
        </Text>

        <ul className="list-decimal list-inside pt-3 verdana text-sm">
          <li>You get VULT tokens before anyone else (yay!)</li>
          <li>
            The starting price is 1000 WEWE to 1 VULT, but it goes up quickly
            (careful!)
          </li>
          <li>
            The VULT tokens will be locked until the Public Launch is live
            (patience!)
          </li>
        </ul>
      </Card>
    </>
  );
};
