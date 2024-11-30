
import { Divider, Loader, ModalRootProps } from '@mantine/core';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button, Modal, Typography } from '~/components/common'
import { usePoolContext } from './PoolContext';
import { useDualDeposit, useEstimateMintShares } from '~/hooks/useDepositWewePool';
import { useApproveToken } from '~/hooks/useApproveToken';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { usdConverter } from '~/utils';

export type PayloadApproveModal = {
    amountToken0: number,
    amountToken1: number,
}

const handleDetails = (hash: string) => {
  window.open(
    `https://basescan.org/tx/${hash}`,
    "_blank",
    "noopener,noreferrer"
  );
};

type ApproveTokensProps = {
    onClose: () => void;
    onOpen: () => void;
    onTxError: (hash?: string) => void;
    opened: boolean;
    data?: PayloadApproveModal
  } & ModalRootProps;

const ApproveTokens = ({ data, onClose, onTxError, opened}: ApproveTokensProps) => {
  const { selectedPool } = usePoolContext();
  const { address } = useAccount();
  
  const [totalGasFee, setTotalGasFee] = useState<number>()
  const { data: estimationMintShares } = useEstimateMintShares
  (
    selectedPool, 
    ethers.parseUnits((data?.amountToken0 || 0).toFixed(selectedPool?.token0?.decimals || 18), selectedPool?.token0?.decimals || 18).toString(), 
    ethers.parseUnits((data?.amountToken1 || 0).toFixed(selectedPool?.token1?.decimals || 18), selectedPool?.token1?.decimals || 18).toString(), 
  )

  const {
    hash: hashApproveToken0,
    isPending: isPendingApproveToken0,
    isConfirming: isConfirmingApproveToken0,
    isError: isErrorApproveToken0,
    approve: approveToken0,
  } = useApproveToken();

  const {
    hash: hashApproveToken1,
    isPending: isPendingApproveToken1,
    isConfirming: isConfirmingApproveToken1,
    isError: isErrorApproveToken1,
    approve: approveToken1,
  } = useApproveToken();

  const {
    hash: hashDualDeposit,
    isPending: isPendingDualDeposit,
    isConfirming: isConfirmingDualDeposit,
    isError: isErrorDualDeposit,
    dualDeposit,
  } = useDualDeposit();

  useEffect(() => {
    async function deposit () {
      if (selectedPool && estimationMintShares && address) {
        await approveToken0(selectedPool.token0.address, selectedPool.address, estimationMintShares.amount0)
        await approveToken1(selectedPool.token1.address, selectedPool.address, estimationMintShares.amount1)
        const txReceipt = await dualDeposit(selectedPool.address, estimationMintShares.mintAmount, address)
        const gasUsed = txReceipt?.gasUsed ?? 0n;
        const gasPrice = txReceipt?.gasUsed ?? 0n;
        const totalFee = gasUsed * gasPrice;
        const getUsdFees = async () => {
          const finalUsdValue = totalFee > 0n ? await usdConverter(totalFee) : 0;
          setTotalGasFee(finalUsdValue)
        }
        getUsdFees()  
      }
    }
    deposit()
  }, [selectedPool, estimationMintShares, address])

  useEffect(() => {
    if (isErrorApproveToken0 || isErrorApproveToken1 || isErrorDualDeposit) {
      onTxError(hashApproveToken0 || hashApproveToken1 || hashDualDeposit)
    }
  }, [isErrorApproveToken0, isErrorApproveToken1, isErrorDualDeposit, hashApproveToken0, hashApproveToken1, hashDualDeposit])

  const finishSuccessfully = 
    hashDualDeposit && hashApproveToken0 && hashApproveToken1 && 
    (!isPendingApproveToken0 || !isPendingApproveToken1 || !isPendingDualDeposit) && 
    (!isConfirmingApproveToken0 || !isConfirmingApproveToken1 || !isConfirmingDualDeposit)

  return (
    <Modal title="DEPOSIT TOKENS" onClose={onClose} opened={opened}>
        {
          finishSuccessfully && 
          <div className='flex flex-col items-center gap-3'>
            <Image src="/img/icons/success.svg" width={80} height={80} alt='' />
            <Typography size='md' secondary>
                NEW DEPOSIT
            </Typography>
          </div>
        }
        <div className="flex items-center justify-between gap-4 flex-wrap py-4 sm:py-1 ">
          <div className="flex items-center gap-1">
              <Image src="/img/icons/Infinity.svg" width={20} height={20} alt="" />
              <Typography size="xs" className="translate-x-1">
                {selectedPool?.range}
              </Typography>
            </div>
          <div className="flex items-center gap-1">
            <Image src="/img/icons/memes.svg" width={20} height={20} alt="" />
            <Typography size="xs" className="translate-x-1">
              {selectedPool?.poolType}
            </Typography>
          </div>
        </div>
        {/* <div className='flex flex-col items-center '>
            <div className='flex items-center justify-between gap-3 w-full'>
                <Typography secondary size='sm'>DEPOSIT</Typography>
                <div className='text-right flex flex-col gap-2'>
                    <Typography>$34.54</Typography>
                </div>
            </div>
        </div> */}
        <div className='flex flex-col items-center '>
            <div className='flex items-center justify-between gap-3 w-full'>
                <Typography size='xs'>AMOUNT</Typography>
                <div className='text-right flex flex-col gap-2'>
                    <div className='flex gap-2 items-center'>
                        <Typography className='text_light_gray' size='xs'>{Number(data?.amountToken0) < 0.01 ? '<0.01' : parseFloat(Number(data?.amountToken0).toFixed(2))}</Typography>
                        <Image src={selectedPool?.token0.icon!} alt='' width={24} height={24} />
                        <Typography className='text_light_gray' size='xs'>{Number(data?.amountToken1) < 0.01 ? '<0.01' : parseFloat(Number(data?.amountToken1).toFixed(2))}</Typography>
                        <Image src={selectedPool?.token1.icon!} alt='' width={24} height={24} />
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col items-center '>
            <div className='flex items-center justify-between gap-3 w-full'>
                <Typography size='xs'>EXPECTED AMOUNT</Typography>
                <div className='text-right flex flex-col'>
                    <div className='flex gap-2 items-center'>
                        <Typography className='text_light_gray' size='xs'>{ethers.formatUnits(estimationMintShares?.mintAmount?.toString() || '0').toString()} SHARES</Typography>
                        <div className="flex items-center">
                          <Image
                            src={selectedPool?.logo.first!}
                            width={24}
                            height={24}
                            className="translate-x-1.5"
                            alt=""
                          />
                          <Image
                            src={selectedPool?.logo.second!}
                            width={24}
                            height={24}
                            alt=""
                          />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-3'>
            <div className='flex gap-3 items-center'>
                { isPendingApproveToken0 || isConfirmingApproveToken0 || !hashApproveToken0 
                    ? <>
                      <Loader color="grey" />
                      <Typography>Please Approve {selectedPool?.token0.symbol}</Typography>
                    </>
                    : <>
                      <Image src="/img/icons/success.svg" width={36} height={36} alt='' />
                      <Typography>{selectedPool?.token0.symbol} Approved</Typography>
                    </>
                }
            </div>
            <div className='flex gap-3 items-center'>
                { isPendingApproveToken1 || isConfirmingApproveToken1 || !hashApproveToken1
                    ? <>
                      <Loader color="grey" />
                      <Typography>Please Approve {selectedPool?.token1.symbol}</Typography>
                    </>
                    : <>
                      <Image src="/img/icons/success.svg" width={36} height={36} alt='' /> 
                      <Typography>{selectedPool?.token1.symbol} Approved</Typography>
                    </>
                }
            </div>
            <div className='flex gap-3 items-center'>
                { isPendingDualDeposit || !hashDualDeposit 
                    ? <>
                      <Loader color="grey" />
                      <Typography>Please deposit tokens</Typography>
                    </>
                    : <>
                      <Image src="/img/icons/success.svg" width={36} height={36} alt='' />
                      <Typography>Tokens deposited</Typography>
                    </>
                }
            </div>
            {
              !isConfirmingApproveToken0 && !isConfirmingApproveToken1 && !isConfirmingDualDeposit && !finishSuccessfully &&
              <div className='flex gap-3 items-center'>
                <Image src="/img/icons/inform.svg" width={36} height={36} alt='' />
                <Typography>Please sign transaction</Typography>
              </div>
            }
        </div>
        <Divider className="border-blue-700" />
        <div className='flex justify-end'>
            {totalGasFee && <Typography className='text_light_gray' size='xs'>
                Total fee cost: {Number(totalGasFee).toFixed(4)}
            </Typography>}
        </div>
        {
          finishSuccessfully &&
          <div className='flex flex-col gap-4 w-full'>
            <Button onClick={onClose} className="w-full">
              <Typography secondary size="xs" fw={700} tt="uppercase">
                COMPLETED
              </Typography>
            </Button>
            <Button className="w-full md:w-auto" onClick={() => handleDetails(hashDualDeposit!)}>
              <Typography secondary size="xs" fw={700} tt="uppercase">
                VIEW DETAILS
              </Typography>
            </Button>
          </div>
        }
  </Modal>
  )
}

export default ApproveTokens