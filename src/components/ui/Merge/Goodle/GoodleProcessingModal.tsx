import { Divider, Loader, ModalRootProps } from '@mantine/core';
import React, { useEffect } from 'react'
import { Hex } from 'viem';
import { PayloadMergeProcessingModal } from '../Bro/MergeProcessingModal';
import { Modal, Typography } from '~/components/common';
import Image from 'next/image';
import { useApproveToken } from '~/hooks/useApproveToken';
import { useMemeEat } from '~/hooks/useMemeEater';
import { useAccount } from 'wagmi';

type GoodleMergeProcessingProps = {
    onClose: () => void;
    onOpen: () => void;
    onTxError: (hash?: Hex) => void;
    onMergeSuccess: (hash?:Hex) => void;
    opened: boolean;
    data: PayloadMergeProcessingModal;
} & ModalRootProps;

const GoodleProcessingModal = ({data, onClose, onTxError, onMergeSuccess, opened}:GoodleMergeProcessingProps) => {

  const { address } = useAccount();
 
  const {
    hash: hashApproveGoodleToken,
    isPending: isPendingApproveGoodleToken,
    isConfirming: isConfirmingApproveGoodleToken,
    isError: isErrorApproveGoodleToken,
    approve: approveGoodleToken,
  } = useApproveToken();

  const {
    hash: hashEatGoodleToken,
    isPending: isPendingEatGoodleToken,
    isError: isErrorEatGoodleToken,
    eat: eat,
  } = useMemeEat(data.eater);

  useEffect(() => {
    async function startEat() {
      try{
        await approveGoodleToken(data.token.address, data.eater, BigInt(data.amountToMerge || '0'))
        await eat(data.amountToMerge)
      } catch (error) {
        console.error(error)
      }
    }
    startEat()
  }, [data, address])


  useEffect(() => {
    if (isErrorEatGoodleToken || isErrorApproveGoodleToken) {
      onTxError(hashEatGoodleToken || hashApproveGoodleToken)
    }
  }, [isErrorEatGoodleToken, isErrorApproveGoodleToken, hashEatGoodleToken, hashApproveGoodleToken])

  const finishSuccessfully = hashEatGoodleToken && hashApproveGoodleToken && (!isPendingApproveGoodleToken) && (!isPendingEatGoodleToken && !isConfirmingApproveGoodleToken)

  useEffect(() => {
    if (hashEatGoodleToken && !isPendingEatGoodleToken) {
      onMergeSuccess(hashEatGoodleToken)
    }
  }, [hashEatGoodleToken, isPendingEatGoodleToken])


  return (
    <Modal title='MERGE GOODLE TOKENS' onClose={onClose} opened={opened}>
      <div className='flex gap-3 items-center'>
      {isPendingApproveGoodleToken || isConfirmingApproveGoodleToken || !hashApproveGoodleToken
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
      {isPendingEatGoodleToken || !hashEatGoodleToken
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
          !isConfirmingApproveGoodleToken && !isPendingEatGoodleToken && !finishSuccessfully &&
          <div className='flex gap-3 items-center'>
            <Image src="/img/icons/inform.svg" width={36} height={36} alt='' />
            <Typography>Please sign transaction</Typography>
          </div>
      }
          <Divider className="border-blue-700" />
      <div className='flex justify-end'>
        <Typography className='text_light_gray' size='xs'>
          Total fee cost: $0.10
        </Typography>
      </div>
    </Modal>
  )
}

export default GoodleProcessingModal