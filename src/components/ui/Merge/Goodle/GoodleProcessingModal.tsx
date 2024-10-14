import { Divider, Loader, ModalRootProps } from '@mantine/core';
import React from 'react'
import { Hex } from 'viem';
import { PayloadMergeProcessingModal } from '../Bro/MergeProcessingModal';
import { Modal, Typography } from '~/components/common';
import Image from 'next/image';

type GoodleMergeProcessingProps = {
    onClose: () => void;
    onOpen: () => void;
    onTxError: (hash?: Hex) => void;
    onMergeSuccess: (hash?:Hex) => void;
    opened: boolean;
    data: PayloadMergeProcessingModal;
} & ModalRootProps;

const GoodleProcessingModal = ({data, onClose, onTxError, onMergeSuccess, opened}:GoodleMergeProcessingProps) => {
  return (
    <Modal title='MERGE GOODLE TOKENS' onClose={onClose} opened={opened}>
      <div className='flex gap-3 items-center'>
      <Loader color="grey" />
      <Typography>Please Approve {data.token.symbol}</Typography>
      </div>
      <div className='flex gap-3 items-center'>
      <Loader color="grey" />
      <Typography>Please merge tokens</Typography>
      </div>

      <div className='flex gap-3 items-center'>
            <Image src="/img/icons/inform.svg" width={36} height={36} alt='' />
            <Typography>Please sign transaction</Typography>
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

export default GoodleProcessingModal