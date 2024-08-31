
import { Divider, ModalRootProps } from '@mantine/core';
import Image from 'next/image'
import React from 'react'
import { Button, Card, Modal, Typography } from '~/components/common'

type ApproveTokensProps = {
    onClose: () => void;
    onOpen: () => void;
    onCreate: () => void;
  } & ModalRootProps;
const ApproveTokens = (props: ApproveTokensProps) => {
  return (
    <Modal title="APPROVE TOKENS" onClose={props.onClose} opened={props.opened}>
    <div className='flex flex-col items-center '>
        {/* <div className='flex flex-col items-center gap-3'>
        <Image src="/img/icons/success.svg" width={80} height={80} alt='' />
        <Typography size='md' secondary>
            APPROVE TOKENS
        </Typography>
        </div> */}
        <div className='flex items-center justify-between gap-3 w-full'>
            <Typography secondary size='sm'>AMOUNT</Typography>
            <div className='text-right flex flex-col gap-2'>
                <Typography>$34.54</Typography>
                <div className='flex gap-2 items-center'>
                    <Typography className='text_light_gray' size='xs'>34.54 usdc</Typography>
                    <Image src="/img/tokens/usdc.png" alt='' width={24} height={24} />
                </div>
            </div>
        </div>
    </div>
    <div className='flex flex-col gap-3'>
            <div className='flex gap-3 items-center'>
            <Image src="/img/icons/success.svg" width={32} height={32} alt='' />
            <Typography>Correct Network</Typography>
            </div>

            <div className='flex gap-3  items-center'>
            <Image src="/img/icons/success.svg" width={32} height={32} alt='' />
            <Typography>Token A Approved</Typography>
            </div>

            <div className='flex gap-3  items-center'>
            <Image src="/img/icons/success.svg" width={32} height={32} alt='' />
            <Typography>Token B Approved</Typography>
            </div>

            <div className='flex gap-3  items-center'>
            <Image src="/img/icons/inform.svg" width={32} height={32} alt='' />
            <Typography>Please sign transaction</Typography>
            </div>
        </div>
        <Divider className="border-blue-700" />
        <div className='flex justify-end'>
            <Typography className='text_light_gray' size='xs'>
                Total fee cost: $0.10
            </Typography>
        </div>

            <Button onClick={props.onCreate}>
               <Typography secondary fw={900} size='xs'>
                CREATE POOL
                </Typography> 
            </Button>

     
  </Modal>
  )
}

export default ApproveTokens