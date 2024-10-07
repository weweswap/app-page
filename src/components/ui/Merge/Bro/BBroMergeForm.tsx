import { Loader, NumberInput } from "@mantine/core";
import { dogica } from "~/fonts";
import { cn } from "~/utils";
import Image from "next/image";
import { Button, Typography } from "~/components/common";
import { formatEther, Hex } from "viem";
import { useState } from "react";
import { MergeCompleteModal } from "./MergeCompleteModal";
import { FailTXModal } from "~/components/common/FailTXModal";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { useAccount, useWatchContractEvent } from "wagmi";
import { Chain, CONTRACT_ADDRESSES } from "~/constants";
import MergeProcessingModal from "./MergeProcessingModal";
import { ethers } from "ethers";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ERC20Abi } from "~/lib/abis";
import { useEaterRate } from "~/hooks/useEater";
import * as dn from "dnum";

export const BBroMergeForm = () => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [amount, setAmount] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [hash, setHash] = useState<Hex>();
  const [amountClaimed, setAmountClaimed] = useState<string>();
  const { rate, isLoading: isRateLoading } = useEaterRate(CONTRACT_ADDRESSES.bbroEater);

  const handleSelect = (div: number) => {
    setAmount(dn.toString(dn.div([balanceBBro, 18], div)));
  };

  const handleMerge = () => {
    setIsProcessing(true);
  };

  const { data: balanceBBro } = useTokenBalance(
    address,
    CONTRACT_ADDRESSES.bbroToken
  );

  useWatchContractEvent({
    address: CONTRACT_ADDRESSES.wewe,
    abi: ERC20Abi,
    eventName: 'Transfer',
    args: [CONTRACT_ADDRESSES.bbroEater, address],
    poll: false,
    onLogs(logs: any[]) {
      setAmountClaimed(Number(ethers.formatUnits(logs[0]?.args?.value || 0, 18)).toFixed(4))
    },
  });

  const amountBigNumber = ethers.parseUnits(amount || "0", 18);

  return (
    <div className="flex flex-col gap-4">
      {/* <Card className="flex flex-col gap-5"> */}
      <div className="bg_light_dark flex items-center justify-between gap-3 p-4">
        <div className="flex-1 flex items-center gap-3">
          <Image src="/img/tokens/bbro.svg" width={32} height={32} alt="" />
          <Typography secondary size="md">
            bBRO
          </Typography>
        </div>
        <Image
          src="/img/icons/arrow_right.svg"
          width={16}
          height={16}
          alt=""
        />
        <div className="flex-1 flex items-center justify-end gap-3">
          <Image src="/img/tokens/wewe.svg" width={32} height={32} alt="" />
          <Typography secondary size="md">
            WEWE
          </Typography>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3">
        <div className="flex-1">
          <div className="grid grid-cols-11  md:bg-black items-center justify-between md:justify-normal gap-3 p-4 md:p-0">
            <div className="col-span-5 flex-1 flex items-center gap-3">
              <NumberInput
                classNames={{
                  root: "w-full md:w-full",
                  input: cn(
                    dogica.className,
                    "bg_light_dark md:p-4 p-0 text-white text-lg h-auto border-transparent rounded-none lg:w-[20.8rem]"
                  ),
                }}
                hideControls
                value={amount}
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
            <div className="col-span-5 items-center flex-1  md:flex-none flex justify-end gap-3">
              {!isRateLoading && (
                <div className="overflow-x-auto">
                  <Typography size="md">
                    {dn.format(dn.mul([rate, 2], dn.from(amount || 0)), { locale: "en" })} WEWE
                  </Typography>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex items-center gap-4 mt-3">
            <div>
              <Typography size="xs" className="text_light_gray">
                Available:
              </Typography>
              <Typography size="xs" className="text_light_gray">
                {/* $4,690,420,090.00 */}
                {Math.trunc(
                  Number(formatEther(balanceBBro))
                ).toLocaleString("en-US")}
              </Typography>
            </div>
            <div className="flex gap-3 items-center">
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

        <div className="flex flex-col gap-3 w-full md:w-auto ">
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-3 ">
            <Button
              className="flex items-center justify-center gap-3 w-full md:w-auto md:h-[62px]"
              disabled={!address || !amount}
              onClick={
                isConnected
                  ? () => handleMerge()
                  : () => openConnectModal && openConnectModal()
              }
            >
              <Typography secondary size="sm" fw={700} tt="uppercase">
                Merge🔥
              </Typography>
            </Button>
          </div>
        </div>
      </div>
      {
        isProcessing &&
        <MergeProcessingModal
          onClose={() => {
            setIsProcessing(false)
          }}
          data={{
            amountToMerge: amountBigNumber < balanceBBro ? amountBigNumber.toString() : balanceBBro.toString(),
            token: {
              chain: Chain.BASE,
              symbol: "bBRO",
              address: CONTRACT_ADDRESSES.bbroToken,
              icon: "/img/tokens/bbro.svg",
              decimals: 18,
            },
            eater: CONTRACT_ADDRESSES.bbroEater,
          }}
          opened={isProcessing}
          onTxError={(hash) => {
            setHash(hash)
            setIsFailed(true)
            setIsProcessing(false)
          }}
          onMergeSuccess={hash => {
            setHash(hash)
            setIsProcessing(false)
            setIsCompleted(true)
          }}
          onOpen={() => { }}
        />
      }
      <FailTXModal
        hash={hash as Hex}
        opened={isFailed}
        onClose={() => {
          setHash(undefined)
          setIsFailed(false)
        }
        }
      />
      <MergeCompleteModal
        hash={hash as Hex}
        amount={amountClaimed}
        ratio={rate}
        inputToken="bBRO"
        onClose={() => {
          setAmountClaimed(undefined)
          setIsCompleted(false)
        }}
        opened={isCompleted} />
    </div>
  );
};