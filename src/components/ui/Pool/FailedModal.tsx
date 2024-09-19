import { ModalRootProps } from '@mantine/core';
import Image from 'next/image';
import React from 'react'
import { Button, Card, Modal, Typography } from '~/components/common'

type FailedModalProps = {
    onClose: () => void;
    hash: string
  } & ModalRootProps;

const FailedModal = (props: FailedModalProps ) => {
    const handleDetails = () => {
        window.open(
          `https://basescan.org/tx/${props.hash}`,
          "_blank",
          "noopener,noreferrer"
        );
      };
    return (
        <Modal title="UNSUCCESSFUL" onClose={props.onClose} opened={props.opened}>
            <div className='flex flex-col items-center gap-4 text-center w-full'>
                <Image src="/img/icons/fail.png" alt='' width={72} height={72} />
                <Typography secondary>FAILED TX</Typography>
                <Button className='w-full' onClick={props.onClose}>
                    <Typography size='xs' secondary>
                        CLOSE
                    </Typography>
                </Button>
                <Button
                    className="w-full bg-black border border-1 border-white"
                    onClick={handleDetails}
                >
                    <Typography secondary size="md" fw={700} tt="uppercase">
                        view details
                    </Typography>
                </Button>
            </div>
        </Modal>
      )
}

export default FailedModal