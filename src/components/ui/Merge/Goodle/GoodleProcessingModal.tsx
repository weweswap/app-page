import { ModalRootProps } from '@mantine/core';
import React from 'react'
import { Hex } from 'viem';
import { PayloadMergeProcessingModal } from '../Bro/MergeProcessingModal';
import { Modal } from '~/components/common';

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
      <div>
        
      </div>
    </Modal>
  )
}

export default GoodleProcessingModal