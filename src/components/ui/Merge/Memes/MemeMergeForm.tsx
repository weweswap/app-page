import { NumberInput } from '@mantine/core'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { formatEther, Hex } from 'viem'
import { Button, Typography } from '~/components/common'
import { dogica } from '~/fonts'
import { cn } from '~/utils'
import MergeCompleteModal from './MergeCompleteModal'
import { FailTXModal } from '~/components/common/FailTXModal'
import { useAccount } from 'wagmi'
import { useTokenBalance } from '~/hooks/useTokenBalance'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import * as dn from "dnum"
import MergeProcessingModal from './MergeProcessingModal'
import { ethers, formatUnits } from 'ethers'
import { useMemeEaterRate, useMemeGetTotalWeWe, useVestingsInfo } from '~/hooks/useMemeEater'
import { MergeConfig } from '~/constants/mergeConfigs'

interface MemeMergeFormProps {
  mergeConfig: MergeConfig;
}

const MemeMergeForm = ({ mergeConfig }: MemeMergeFormProps) => {
  const { refetch: refetchVestings } = useVestingsInfo(mergeConfig.eaterContractAddress)
  const [amount, setAmount] = useState("")
  const { address, isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isFailed, setIsFailed] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [hash, setHash] = useState<Hex>()
  const { rate, isLoading: isRateLoading } = useMemeEaterRate(mergeConfig.eaterContractAddress);

  const amountBigNumber = ethers.parseUnits(amount || "0", mergeConfig.inputToken.decimals);

  const { data: balanceMeme, refetch: refetchBalance } = useTokenBalance(
    address,
    mergeConfig.inputToken.address,
  )

  const handleSelect = (div: number) => {
    setAmount(dn.toString(dn.div([balanceMeme, mergeConfig.inputToken.decimals], div)))
  };



  const handleMerge = () => {
    isConnected ? setIsProcessing(true) : openConnectModal?.()
  }

  const { totalWeWe, isLoading: isTotalWeWeLoading } = useMemeGetTotalWeWe(mergeConfig.eaterContractAddress, amountBigNumber);

  const claimableAmount = dn.format([totalWeWe, 18], { locale: "en", digits: 2 });

  return (
    <>
      <div className="bg_light_dark flex items-center justify-between gap-3 p-4 mt-5">
        <div className="flex-1 flex items-center gap-1">
          <Image className="rounded-full" src={mergeConfig.inputToken.icon} width={32} height={32} alt="" />
          <Typography secondary size="sm">
            {mergeConfig.inputToken.symbol}
          </Typography>
        </div>
        <Image
          src="/img/icons/arrow_right.svg"
          width={16}
          height={16}
          alt=""
        />
        <div className="flex-1 flex items-center justify-end gap-1">
          <Image src="/img/tokens/wewe.svg" width={32} height={32} alt="" />
          <Typography secondary size="sm">
            WEWE
          </Typography>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 mt-5">
        <div className="flex-1">
          <div className="grid grid-cols-11  md:bg-black items-center justify-between md:justify-normal gap-3">
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
            <div className="col-span-5 items-center flex-1  md:flex-none flex justify-end gap-3">
              {!isRateLoading && (
                <div className="overflow-x-auto">
                  {
                    isTotalWeWeLoading ? (
                      <Typography size="sm" className="animate-pulse">
                        Calculating...
                      </Typography>
                    ) : (
                      <Typography size="md">
                      {claimableAmount} WEWE
                    </Typography>
                    )
                  }
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
                {Math.trunc(
                  Number(formatUnits(balanceMeme, mergeConfig.inputToken.decimals))
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

        <div className="flex flex-col gap-3 w-full sm:w-auto ">
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-3 ">
            <Button
              className="flex items-center justify-center gap-3 w-full md:w-auto md:h-[62px]"
              // disabled={!address || !amount}
              disabled
              onClick={
                isConnected
                  ? () => handleMerge()
                  : () => openConnectModal && openConnectModal()
              }
            >
              <Typography secondary size="sm" fw={700} tt="uppercase">
                Soon🔥
              </Typography>
            </Button>
          </div>
        </div>
      </div>
      {
        isProcessing && (
          <MergeProcessingModal
            opened={isProcessing}
            data={{
              amountToMerge: amountBigNumber < balanceMeme ? amountBigNumber.toString() : balanceMeme.toString(),
              token: mergeConfig.inputToken,
              eater: mergeConfig.eaterContractAddress,
              uniAdapter: mergeConfig.uniAdaptorAddress,
            }}
            onTxError={(hash) => {
              setHash(hash)
              setIsFailed(true)
              setIsProcessing(false)
            }}
            onClose={() => {
              setIsProcessing(false)
            }}
            onMergeSuccess={hash => {
              setHash(hash)
              setIsProcessing(false)
              setIsComplete(true)
              refetchBalance()
              
            }}
            onOpen={() => { }} />
        )
      }
      <FailTXModal
        hash={hash as Hex}
        opened={isFailed}
        onClose={() => {
          setIsFailed(false)
          setHash(undefined)
        }} />

      <MergeCompleteModal
        key="merge-complete-modal"
        amount={claimableAmount}
        hash={hash as Hex}
        ratio={rate}
        inputToken={mergeConfig.inputToken}
        onClose={() => {
          setAmount("")
          setIsComplete(false)
          refetchVestings()
        }}
        opened={isComplete}
      />

    </>
  )
}

export default MemeMergeForm;
