import React, { useState } from "react";
import Image from "next/image";
import { NumberInput } from "@mantine/core";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button, Typography } from "~/components/common";
import { FailTXModal } from "~/components/common/FailTXModal";
import { WEWE_COINGECKO_ID } from "~/constants";
import { MergeConfig } from "~/constants/mergeConfigs";
import { dogica } from "~/fonts";
import { useCoinGeckoGetPrice } from "~/hooks/useCoingeckoGetPrice";
import {
  useMemeEaterIsPaused,
  useMemeEaterRate,
  useMemeGetTotalWeWe,
  useVestingsInfo,
} from "~/hooks/useMemeEater";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { cn } from "~/utils";
import * as dn from "dnum";
import { ethers, formatUnits } from "ethers";
import { Hex } from "viem";
import { useAccount } from "wagmi";

import MergeCompleteModal from "./MergeCompleteModal";
import MergeProcessingModal from "./MergeProcessingModal";

interface MemeMergeFormProps {
  mergeConfig: MergeConfig;
}

const MemeMergeForm = ({ mergeConfig }: MemeMergeFormProps) => {
  const { refetch: refetchVestings } = useVestingsInfo(
    mergeConfig.eaterContractAddress
  );
  const [amount, setAmount] = useState("");
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hash, setHash] = useState<Hex>();
  const { rate, isLoading: isRateLoading } = useMemeEaterRate(
    mergeConfig.eaterContractAddress
  );
  const { isPaused } = useMemeEaterIsPaused(mergeConfig.eaterContractAddress);

  const { data: tokenPrices, isLoading: isTokenPriceLoading } =
    useCoinGeckoGetPrice([mergeConfig.tokenCoinGeckoId, WEWE_COINGECKO_ID]);
  const inputTokenPrice = tokenPrices?.[0] ?? 0;
  const weweTokenPrice = tokenPrices?.[1] ?? 0;

  const amountBigNumber = ethers.parseUnits(
    amount || "0",
    mergeConfig.inputToken.decimals
  );

  const { data: balanceMeme, refetch: refetchBalance } = useTokenBalance(
    address,
    mergeConfig.inputToken.address
  );

  const handleSelect = (div: number) => {
    setAmount(
      dn.toString(dn.div([balanceMeme, mergeConfig.inputToken.decimals], div))
    );
  };

  const handleMerge = () => {
    if (isConnected) {
      setIsProcessing(true);
    } else {
      openConnectModal?.();
    }
  };

  const { totalWeWe, isLoading: isTotalWeWeLoading } = useMemeGetTotalWeWe(
    mergeConfig.eaterContractAddress,
    amountBigNumber
  );

  const claimableAmount = dn.format([totalWeWe, 18], {
    locale: "en",
    digits: 2,
  });

  return (
    <>
      <div className="bg_light_dark mt-5 flex items-center justify-between gap-3 p-4">
        <div className="flex flex-1 items-center gap-1">
          <Image
            className="rounded-full"
            src={mergeConfig.inputToken.icon}
            width={32}
            height={32}
            alt=""
          />
          <Typography secondary size="sm">
            {mergeConfig.inputToken.symbol}
          </Typography>
        </div>
        <Image src="/img/icons/arrow_right.svg" width={16} height={16} alt="" />
        <div className="flex flex-1 items-center justify-end gap-1">
          <Image src="/img/tokens/wewe.svg" width={32} height={32} alt="" />
          <Typography secondary size="sm">
            WEWE
          </Typography>
        </div>
      </div>
      <div className="mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <div className="grid grid-cols-11  items-center justify-between gap-3 md:justify-normal md:bg-black">
            <div className="col-span-5 flex flex-1 items-center gap-3">
              <div className="flex flex-col">
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
                <div className="text_light_gray">
                  {isTokenPriceLoading ? (
                    <Typography size="sm" className="animate-pulse p-0 md:py-4">
                      Calculating...
                    </Typography>
                  ) : (
                    <Typography size="sm" className="p-0 md:py-4">
                      $
                      {dn.format(
                        dn.mul(
                          dn.from(
                            amount || "0",
                            mergeConfig.inputToken.decimals
                          ),
                          inputTokenPrice
                        ),
                        { locale: "en", digits: 6 }
                      )}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-6 flex flex-1  items-center justify-end gap-3 md:flex-none">
              {!isRateLoading && (
                <div className="overflow-x-auto">
                  {isTotalWeWeLoading ? (
                    <Typography
                      size="sm"
                      className="text_light_gray animate-pulse p-0 md:py-4"
                    >
                      Calculating...
                    </Typography>
                  ) : (
                    <div className="flex flex-col">
                      <Typography size="md" className="p-0 text-right md:py-4">
                        {claimableAmount} WEWE
                      </Typography>
                      <div className="text_light_gray text-right">
                        {isTokenPriceLoading ? (
                          <Typography
                            size="sm"
                            className="animate-pulse p-0 md:py-4"
                          >
                            Calculating...
                          </Typography>
                        ) : (
                          <Typography size="sm" className="p-0 md:py-4">
                            $
                            {dn.format(
                              dn.mul(dn.from([totalWeWe, 18]), weweTokenPrice),
                              { locale: "en", digits: 6 }
                            )}
                          </Typography>
                        )}
                      </div>
                    </div>
                  )}
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
                {Math.trunc(
                  Number(
                    formatUnits(balanceMeme, mergeConfig.inputToken.decimals)
                  )
                ).toLocaleString("en-US")}
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

        <div className="flex w-full flex-col gap-3 sm:w-auto ">
          <div className="flex flex-1 flex-col items-center gap-3 sm:flex-row ">
            <Button
              className="flex w-full items-center justify-center gap-3 md:h-[62px] md:w-auto"
              disabled={
                mergeConfig.isMergeDisabled || !address || !amount || isPaused
              }
              onClick={
                isConnected
                  ? () => handleMerge()
                  : () => openConnectModal && openConnectModal()
              }
            >
              <Typography secondary size="sm" fw={700} tt="uppercase">
                MERGE🔥
              </Typography>
            </Button>
          </div>
        </div>
      </div>
      {isProcessing && (
        <MergeProcessingModal
          opened={isProcessing}
          data={{
            amountToMerge:
              amountBigNumber < balanceMeme
                ? amountBigNumber.toString()
                : balanceMeme.toString(),
            token: mergeConfig.inputToken,
            eater: mergeConfig.eaterContractAddress,
            uniAdapter: mergeConfig.uniAdaptorAddress,
          }}
          onTxError={(hash) => {
            setHash(hash);
            setIsFailed(true);
            setIsProcessing(false);
          }}
          onClose={() => {
            setIsProcessing(false);
          }}
          onMergeSuccess={(hash) => {
            setHash(hash);
            setIsProcessing(false);
            setIsComplete(true);
            refetchBalance();
          }}
          onOpen={() => {}}
        />
      )}
      <FailTXModal
        hash={hash as Hex}
        opened={isFailed}
        onClose={() => {
          setIsFailed(false);
          setHash(undefined);
        }}
      />

      <MergeCompleteModal
        key="merge-complete-modal"
        amount={claimableAmount}
        hash={hash as Hex}
        ratio={rate}
        inputToken={mergeConfig.inputToken}
        onClose={() => {
          setAmount("");
          setIsComplete(false);
          refetchVestings();
        }}
        opened={isComplete}
      />
    </>
  );
};

export default MemeMergeForm;
