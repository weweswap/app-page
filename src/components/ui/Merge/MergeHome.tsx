"use client";

import { Loader, NumberInput } from "@mantine/core";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { Button, Card, Typography } from "~/components/common";
import { CONTRACT_ADDRESSES } from "~/constants";
import { dogica } from "~/fonts";
import { useApproveAndCall, useQuoteVult, useTokenBalance } from "~/hooks";

export const MergeHome = () => {
  const { address } = useAccount();
  const { data: balanceWewe } = useTokenBalance(
    address,
    CONTRACT_ADDRESSES.wewe
  );
  const [amount, setAmount] = useState<string | number>("");
  const amountValue = parseEther(String(amount) ?? 0);
  const { data: quoteAmount, isFetching } = useQuoteVult(amountValue);
  const { onWriteAsync: onApproveAndCall, isPending } = useApproveAndCall();

  const handleSelect = (div: number) => {
    setAmount(Number(formatEther(balanceWewe)) / div);
  };

  const handleMerge = () => {
    onApproveAndCall(amountValue);
  };

  return (
    <>
      <Card>
        <div className="md:flex items-center justify-between gap-3 text-center md:text-start  ">
          <Typography secondary size="xl" tt="uppercase">
            MERGE NOW
          </Typography>
          <Typography secondary size="xl">
            🔥 🔥 🔥
          </Typography>
        </div>
        <Typography
          size="sm"
          tt="uppercase"
          className="pt-4 text-center md:text-start"
        >
          Forever merge your coins
        </Typography>
      </Card>

      <Card className="flex flex-col gap-5">
        <div className="bg-gray-900 flex items-center justify-between gap-3 p-4">
          <div className="flex-1 flex items-center gap-3">
            <Image src="/img/tokens/wewe.png" width={32} height={32} alt="" />
            <Typography secondary size="md">
              WEWE
            </Typography>
          </div>
          <Image
            src="/img/icons/arrow_right.svg"
            width={16}
            height={16}
            alt=""
          />
          <div className="flex-1 flex items-center justify-end gap-3">
            <Image src="/img/tokens/vult.svg" width={32} height={32} alt="" />
            <Typography secondary size="md">
              VULT
            </Typography>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <NumberInput
            classNames={{
              root: "flex-1 w-full md:w-auto",
              input: clsx(
                dogica.className,
                "bg-gray-900 p-4 text-white text-lg h-auto border-transparent rounded-none"
              ),
            }}
            hideControls
            value={amount}
            onChange={setAmount}
          />

          <div className="flex-1 flex items-center">
            <div className="flex-1 flex items-center justify-center gap-3">
              {!isFetching && (
                <>
                  <Image
                    src="/img/icons/arrow_right1.svg"
                    width={19}
                    height={9}
                    alt=""
                  />
                  <Typography size="xl">
                    {Number(formatEther(quoteAmount)).toLocaleString()} VULT
                  </Typography>
                </>
              )}
            </div>

            <Button
              className="flex items-center justify-center gap-3"
              disabled={!address || !amountValue || isPending}
              onClick={handleMerge}
            >
              {isPending && <Loader color="white" size="sm" />}
              <Typography secondary size="sm" fw={700} tt="uppercase">
                Merge
              </Typography>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 flex items-center justify-end gap-3">
            <button
              className="bg-gray-900 px-3 py-2"
              onClick={() => handleSelect(4)}
            >
              <Typography size="sm">25%</Typography>
            </button>
            <button
              className="bg-gray-900 px-3 py-2"
              onClick={() => handleSelect(2)}
            >
              <Typography size="sm">50%</Typography>
            </button>
            <button
              className="bg-gray-900 px-3 py-2"
              onClick={() => handleSelect(1)}
            >
              <Typography size="sm">100%</Typography>
            </button>
          </div>
          <div className="flex-1" />
        </div>
      </Card>

      <Card>
        <Typography size="lg">MERGE your WEWE into VULT</Typography>

        <ul className="list-decimal list-inside pt-3 text-sm">
          <li>Click MERGE to burn your $WEWE and receive $VULT</li>
          <li>Starting price is 1,000 $WEWE to 1 $VULT, but this will rise</li>
          <li>Your $VULT will be locked until the public launch</li>
        </ul>
      </Card>
    </>
  );
};
