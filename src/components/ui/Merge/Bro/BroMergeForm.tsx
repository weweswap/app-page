import { useState } from "react";
import Image from "next/image";
import { NumberInput } from "@mantine/core";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button, Typography } from "~/components/common";
import { FailTXModal } from "~/components/common/FailTXModal";
import { Chain, CONTRACT_ADDRESSES } from "~/constants";
import { dogica } from "~/fonts";
import { useEaterRate } from "~/hooks/useEater";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { ERC20Abi } from "~/lib/abis";
import { cn } from "~/utils";
import * as dn from "dnum";
import { ethers } from "ethers";
import { formatEther, Hex } from "viem";
import { useAccount, useWatchContractEvent } from "wagmi";

import { MergeCompleteModal } from "./MergeCompleteModal";
import MergeProcessingModal from "./MergeProcessingModal";

export const BroMergeForm = () => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [amount, setAmount] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [amountClaimed, setAmountClaimed] = useState<string>();
  const [hash, setHash] = useState<Hex>();
  const { rate, isLoading: isRateLoading } = useEaterRate(
    CONTRACT_ADDRESSES.broEater
  );
  const handleSelect = (div: number) => {
    setAmount(dn.toString(dn.div([balanceBro, 18], div)));
  };

  const handleMerge = () => {
    setIsProcessing(true);
  };

  const { data: balanceBro, refetch: refetchBalance } = useTokenBalance(
    address,
    CONTRACT_ADDRESSES.broToken
  );

  useWatchContractEvent({
    address: CONTRACT_ADDRESSES.wewe,
    abi: ERC20Abi,
    eventName: "Transfer",
    args: [CONTRACT_ADDRESSES.broEater, address],
    poll: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onLogs(logs: any[]) {
      setAmountClaimed(
        Number(ethers.formatUnits(logs[0]?.args?.value || 0, 18)).toFixed(4)
      );
    },
  });

  const amountBigNumber = ethers.parseUnits(amount || "0", 18);

  return (
    <div className="flex flex-col gap-4">
      {/* <Card className="flex flex-col gap-5"> */}
      <div className="bg_light_dark flex items-center justify-between gap-3 p-4">
        <div className="flex flex-1 items-center gap-3">
          <Image src="/img/tokens/bro.svg" width={32} height={32} alt="" />
          <Typography secondary size="md">
            BRO
          </Typography>
        </div>
        <Image src="/img/icons/arrow_right.svg" width={16} height={16} alt="" />
        <div className="flex flex-1 items-center justify-end gap-3">
          <Image src="/img/tokens/wewe.svg" width={32} height={32} alt="" />
          <Typography secondary size="md">
            WEWE
          </Typography>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <div className="grid grid-cols-11  items-center justify-between gap-3 md:justify-normal md:bg-black">
            <div className="col-span-5 flex flex-1 items-center gap-3">
              <NumberInput
                classNames={{
                  root: "w-full md:w-full",
                  input: cn(
                    dogica.className,
                    "bg_light_dark h-auto rounded-none border-transparent p-0 text-lg text-white md:p-4 lg:w-[20.8rem]"
                  ),
                }}
                hideControls
                value={amount}
                allowNegative={false}
                trimLeadingZeroesOnBlur
                thousandSeparator
                onChange={(value) => setAmount(String(value))}
              />
            </div>
            <Image
              className="col-span-1"
              src="/img/icons/arrow_right.svg"
              width={16}
              height={16}
              alt=""
            />
            <div className="col-span-5 flex flex-1  items-center justify-end gap-3 md:flex-none">
              {!isRateLoading && (
                <div className="overflow-x-auto">
                  <Typography size="md">
                    {dn.format(dn.mul([rate, 2], dn.from(amount || 0)), {
                      locale: "en",
                    })}{" "}
                    WEWE
                  </Typography>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 flex w-full items-center gap-4">
            <div>
              <Typography size="xs" className="text_light_gray">
                Available:
              </Typography>
              <Typography size="xs" className="text_light_gray">
                {/* $4,690,420,090.00 */}
                {Math.trunc(Number(formatEther(balanceBro))).toLocaleString(
                  "en-US"
                )}
              </Typography>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="bg_light_dark px-3 py-2"
                onClick={() => handleSelect(4)}
              >
                <Typography size="xs">25%</Typography>
              </button>
              <button
                className="bg_light_dark px-3 py-2"
                onClick={() => handleSelect(2)}
              >
                <Typography size="xs">50%</Typography>
              </button>
              <button
                className="bg_light_dark px-3 py-2"
                onClick={() => handleSelect(1)}
              >
                <Typography size="xs">MAX</Typography>
              </button>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 md:w-auto ">
          <div className="flex flex-1 flex-col items-center gap-3 sm:flex-row ">
            <Button
              className="flex w-full items-center justify-center gap-3 md:h-[62px] md:w-auto"
              disabled={!address || !amount}
              onClick={isConnected ? handleMerge : () => openConnectModal?.()}
            >
              <Typography secondary size="sm" fw={700} tt="uppercase">
                Merge🔥
              </Typography>
            </Button>
          </div>
        </div>
      </div>
      {isProcessing && (
        <MergeProcessingModal
          onClose={() => {
            setIsProcessing(false);
          }}
          data={{
            amountToMerge:
              amountBigNumber < balanceBro
                ? amountBigNumber.toString()
                : balanceBro.toString(),
            token: {
              chain: Chain.BASE,
              symbol: "BRO",
              address: CONTRACT_ADDRESSES.broToken,
              icon: "/img/tokens/bro.svg",
              decimals: 18,
            },
            eater: CONTRACT_ADDRESSES.broEater,
          }}
          opened={isProcessing}
          onTxError={(hash) => {
            setHash(hash);
            setIsFailed(true);
            setIsProcessing(false);
          }}
          onMergeSuccess={(hash) => {
            setHash(hash);
            setIsCompleted(true);
            setIsProcessing(false);
            setAmount("");
            refetchBalance();
          }}
          onOpen={() => {}}
        />
      )}
      <FailTXModal
        hash={hash as Hex}
        opened={isFailed}
        onClose={() => {
          setHash(undefined);
          setIsFailed(false);
        }}
      />
      <MergeCompleteModal
        hash={hash as Hex}
        amount={amountClaimed}
        ratio={rate}
        inputToken="BRO"
        onClose={() => {
          setAmountClaimed(undefined);
          setIsCompleted(false);
        }}
        opened={isCompleted}
      />
    </div>
  );
};
