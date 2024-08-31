import { ModalRootProps } from '@mantine/core';
import Image from 'next/image';
import React from 'react'
import { Button, Card, Modal, Typography } from '~/components/common'

type FailedModalProps = {
    onConfirm: () => void;
    onClose: () => void;
    onOpen: () => void;
  } & ModalRootProps;

const FailedModal = (props: FailedModalProps ) => {
    return (
        <Modal title="UNSUCCESSFUL" onClose={props.onClose} opened={props.opened}>
            <div className='flex flex-col items-center gap-4 text-center w-full'>
                <Image src="/img/icons/fail.png" alt='' width={72} height={72} />
                <Typography secondary>FAILED TX</Typography>
                <Button className='w-full'>
                    <Typography size='xs' secondary>
                        CLOSE
                    </Typography>
                </Button>
                <button className='w-full'>
                    <Typography className='custom_btn w-full' secondary size='xs'>
                        VIEW DETAILS
                    </Typography>
                </button>
            </div>
        </Modal>
      )
}

export default FailedModal