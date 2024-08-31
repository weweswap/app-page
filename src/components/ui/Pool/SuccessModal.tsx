
import { ModalRootProps } from '@mantine/core';
import Image from 'next/image'
import React from 'react'
import { Button, Card, Modal, Typography } from '~/components/common'

type SuccessModalProps = {
    onConfirm: () => void;
    onClose: () => void;
    onOpen: () => void;
  } & ModalRootProps;

const SuccessModal = (props: SuccessModalProps) => {
  return (
    <Modal title="SUCCESSFUL" onClose={props.onClose} opened={props.opened}>
    <div className='flex flex-col items-center'>
        <div className='flex flex-col items-center gap-7'>
       
        <Typography size='md' secondary className='text-center'>
            SUCCESSFULLY ZAPPED-IN
        </Typography>
        <Image src="/img/icons/success.svg" width={80} height={80} alt='' />
        <Typography size='md' secondary className='text-center'>
            NEW LP
        </Typography>
        <div className='flex items-center justify-between w-full gap-2'>
          <Typography>ID: XYZ</Typography>
          <div className="flex items-center gap-1">
            <Image src="/img/icons/memes.svg" width={20} height={20} alt="" />
            <Typography size="xs" className="translate-x-1">
              MEMES: 1%
            </Typography>
          </div>

          <div className="flex items-center gap-1">
              <Image src="/img/icons/infinity.svg" width={20} height={20} alt="" />
              <Typography size="xs" className="translate-x-1">
                INFINITY
              </Typography>
            </div>
        </div>
        <div className='flex items-center justify-between gap-3 w-full'>
            <Typography secondary size='sm'>AMOUNT</Typography>
            <div className='text-right flex flex-col gap-2'>
                <Typography>$34.54</Typography>
                <div className='flex gap-2 items-center'>
                    <Typography className='text_light_gray' size='xs'>0.0000001231231 SHARES</Typography>
                    <div className='flex items-center'>
                <Image className='min-w-6 min-h-6' src="/img/tokens/wewe.svg" alt='' width={32} height={32} />
                <Image className='ml-[-10px] min-w-6 min-h-6'  src="/img/tokens/usdc.png" alt=''  width={32} height={32} />
              </div>
                </div>
            </div>
        </div>

<Typography className='flex justify-end w-full mb-3' size='xs'>Total fee cost: $ 0.10</Typography>
</div>



        <div className='flex flex-col gap-4 w-full'>
        <Button className="w-full">
          <Typography secondary size="xs" fw={700} tt="uppercase">
           COMPLETED
          </Typography>
        </Button>
        <button className="w-full md:w-auto custom_btn">
          <Typography secondary size="xs" fw={700} tt="uppercase">
           VIEW DETAILS
          </Typography>
        </button>
        </div>
    </div>
   </Modal>
  )
}

export default SuccessModal