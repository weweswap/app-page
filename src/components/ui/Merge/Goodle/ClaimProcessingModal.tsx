import { Divider, Loader, ModalRootProps } from '@mantine/core';
import React, { useEffect } from 'react'
import { Hex } from 'viem';
import { Modal, Typography } from '~/components/common';
import Image from 'next/image';
import { useMemeEat, useMemeEaterClaim } from '~/hooks/useMemeEater';
import { useAccount } from 'wagmi';
import { CONTRACT_ADDRESSES } from '~/constants';

type ClaimProcessingProps = {
  onClose: () => void;
  onOpen: () => void;
  onTxError: (hash?: Hex) => void;
  onMergeSuccess: (hash?: Hex) => void;
  opened: boolean;
} & ModalRootProps;

const ClaimProcessingModal = ({ onClose, onTxError, onMergeSuccess, opened }: ClaimProcessingProps) => {

  const { address } = useAccount();

  const {
    hash,
    isPending,
    isError,
    claim,
  } = useMemeEaterClaim(CONTRACT_ADDRESSES.goodleEater);

  useEffect(() => {
    async function startClaim() {
      try {
        await claim()
      } catch (error) {
        console.error(error)
      }
    }
    startClaim()
  }, [address])


  useEffect(() => {
    if (isError) {
      onTxError(hash)
    }
  }, [isError, hash])

  const finishSuccessfully = hash && (!isPending)

  useEffect(() => {
    if (hash && !isPending) {
      onMergeSuccess(hash)
    }
  }, [hash, isPending])


  return (
    <Modal title='CLAIM WEWE TOKENS' onClose={onClose} opened={opened}>
      <div className='flex gap-3 items-center'>
        {isPending || !hash
          ? <>
            <Loader color="grey" />
            <Typography>Please claim tokens</Typography>
          </>
          : <>
            <Image src="/img/icons/success.svg" width={36} height={36} alt='' />
            <Typography>Tokens claimed</Typography>
          </>
        }
      </div>
      {
        !isPending && !finishSuccessfully &&
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

export default ClaimProcessingModal;
