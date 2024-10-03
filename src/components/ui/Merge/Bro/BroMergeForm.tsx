import { Loader, NumberInput } from "@mantine/core";
import { dogica } from "~/fonts";
import { cn } from "~/utils";
import Image from "next/image";
import { Button, Typography } from "~/components/common";
import { formatEther, Hex } from "viem";
import { useState } from "react";
import { BroMergeCompleteModal } from "./BroMergeCompleteModal";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { Chain, CONTRACT_ADDRESSES } from "~/constants";
import { useAccount } from "wagmi";
import MergeProcessingModal from "./MergeProcessingModal";
import { ethers } from "ethers";
import { FailTXModal } from "~/components/common/FailTXModal";


export const BroMergeForm = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [hash, setHash] = useState<Hex>()
  // fetching calculated amount
  const isFetching = false;
  const handleSelect = (div: number) => {
    setAmount(String(Number(formatEther(balanceBro)) / div));
  };

  const handleMerge = () => {
    setIsProcessing(true);
  };

  const { data: balanceBro } = useTokenBalance(
    address,
    CONTRACT_ADDRESSES.broToken
  );

  const isPending = false;
  return (
    <div className="flex flex-col gap-4">
      {/* <Card className="flex flex-col gap-5"> */}
      <div className="bg_light_dark flex items-center justify-between gap-3 p-4">
        <div className="flex-1 flex items-center gap-3">
          <Image src="/img/tokens/bro.svg" width={32} height={32} alt="" />
          <Typography secondary size="md">
            BRO
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
              {!isFetching && (
                <div className="overflow-x-auto">
                  <Typography size="xl">
                    {Number(formatEther(0n)).toLocaleString()} WEWE
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
                  Number(formatEther(balanceBro))
                ).toLocaleString()}
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
              // disabled={!address || !amountValue || isPending}
              onClick={handleMerge}
            >
              {isPending && <Loader color="white" size="sm" />}
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
            amountToMerge: ethers.parseUnits(amount, 18).toString(),
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
            setHash(hash)
            setIsFailed(true)
            setIsProcessing(false)
          }}
          onMergeSuccess={hash => {
            setHash(hash)
            setIsProcessing(false)
            setIsCompleted(true)
          }}
          onOpen={() => {}}     
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
      <BroMergeCompleteModal hash={hash as Hex} amount={"1000"} ratio={100n} inputToken="BRO" onClose={() => setIsCompleted(false)} opened={isCompleted} />
    </div>
  );
};