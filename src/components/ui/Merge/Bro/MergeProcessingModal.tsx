
import { Divider, Loader, ModalRootProps } from '@mantine/core';
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Modal, Typography } from '~/components/common'
import { useApproveToken } from '~/hooks/useApproveToken';
import { useAccount } from 'wagmi';
import { useEat } from '~/hooks/useEater';
import { TokenItem } from '~/models';
import { Hex } from 'viem';

export type PayloadMergeProcessingModal = {
  amountToMerge: string,
  token: TokenItem
  eater: Hex
}

type MergeProcessingModalProps = {
  onClose: () => void;
  onOpen: () => void;
  onTxError: (hash?: Hex) => void;
  onMergeSuccess: (hash?: Hex) => void;
  opened: boolean;
  data: PayloadMergeProcessingModal;
} & ModalRootProps;

const MergeProcessingModal = ({ data, onClose, onTxError, onMergeSuccess, opened }: MergeProcessingModalProps) => {
  const { address } = useAccount();

  const {
    hash: hashApproveBroToken,
    isPending: isPendingApproveBroToken,
    isConfirming: isConfirmingApproveBroToken,
    isError: isErrorApproveBroToken,
    approve: approveBroToken,
  } = useApproveToken();

  const {
    hash: hashEatBroToken,
    isPending: isPendingEatBroToken,
    isError: isErrorEatBroToken,
    eat: eat,
  } = useEat(data.eater);

  useEffect(() => {
    async function startEat() {
      try{
        await approveBroToken(data.token.address, data.eater, BigInt(data.amountToMerge || '0'))
        await eat(data.amountToMerge)
      } catch (error) {
        console.error(error)
      }
    }
    startEat()
  }, [data, address])

  useEffect(() => {
    if (isErrorEatBroToken || isErrorApproveBroToken) {
      onTxError(hashEatBroToken || hashApproveBroToken)
    }
  }, [isErrorEatBroToken, isErrorApproveBroToken, hashEatBroToken, hashApproveBroToken])

  const finishSuccessfully = hashEatBroToken && hashApproveBroToken && (!isPendingApproveBroToken) && (!isPendingEatBroToken && !isConfirmingApproveBroToken)

  useEffect(() => {
    if (hashEatBroToken && !isPendingEatBroToken) {
      onMergeSuccess(hashEatBroToken)
    }
  }, [hashEatBroToken, isPendingEatBroToken])

  return (
    <Modal title="MERGE TOKENS" onClose={onClose} opened={opened}>
      <div className='flex flex-col gap-3'>
        <div className='flex gap-3 items-center'>
          {isPendingApproveBroToken || isConfirmingApproveBroToken || !hashApproveBroToken
            ? <>
              <Loader color="grey" />
              <Typography>Please Approve {data.token.symbol}</Typography>
            </>
            : <>
              <Image src="/img/icons/success.svg" width={36} height={36} alt='' />
              <Typography>{data.token.symbol} Approved</Typography>
            </>
          }
        </div>
        <div className='flex gap-3 items-center'>
          {isPendingEatBroToken || !hashEatBroToken
            ? <>
              <Loader color="grey" />
              <Typography>Please merge tokens</Typography>
            </>
            : <>
              <Image src="/img/icons/success.svg" width={36} height={36} alt='' />
              <Typography>Tokens merged</Typography>
            </>
          }
        </div>
        {
          !isConfirmingApproveBroToken && !isPendingEatBroToken && !finishSuccessfully &&
          <div className='flex gap-3 items-center'>
            <Image src="/img/icons/inform.svg" width={36} height={36} alt='' />
            <Typography>Please sign transaction</Typography>
          </div>
        }
      </div>
      <Divider className="border-blue-700" />
      <div className='flex justify-end'>
        <Typography className='text_light_gray' size='xs'>
          Total fee cost: $0.10
        </Typography>
      </div>
    </Modal>
  )
}

export default MergeProcessingModal