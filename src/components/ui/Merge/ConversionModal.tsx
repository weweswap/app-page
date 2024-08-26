import {  Divider, ModalRootProps } from '@mantine/core'
import Image from 'next/image';
import React from 'react'
import { Button, Card, Modal, Typography } from '~/components/common';


type ConversionModalProps = {
    onOpen: () => void;
    onClose: () => void;
    onConfirm: () => void;
} & ModalRootProps

const ConversionModal = (props: ConversionModalProps) => {
  return (
    
<Modal title="CONVERSION" opened={props.opened} onClose={props.onClose} >
<div>
    <div className='flex gap-3 items-center py-5'>
        <Image src="/img/tokens/vult.base.svg" width={48} height={48} alt='' />
        <div className='flex flex-col gap-1'>
            <Typography size='md' className='font-bold'>100 VULT</Typography>
            <Typography size='xs' className='font-bold text_light_gray'>US $0.02</Typography>
        </div>
    </div>

    <div className='flex items-center justify-between gap-4 my-5'>
    <div className='flex flex-col gap-2 '>
        <Image src="/img/tokens/vult.base.svg" width={48} height={48} alt='' />
            <Typography size='sm' className='font-bold w-[8rem]'>
                100 VULT from Base
            </Typography>
        </div>
        <Typography size='xl' className='font-bold'>
            {">"}
        </Typography>
        <div className='flex flex-col gap-2 items-end text-right'>
        <Image src="/img/tokens/vult.eth.svg" width={48} height={48} alt='' />
            <Typography size='sm' className='font-bold w-[8rem]'>
                100 VULT to Ethereum
            </Typography>
        </div>
    </div>

    <div className='flex flex-col gap-8 py-5'>

    <div className='flex items-center gap-3'>
        <Image src="/img/icons/success.svg" alt='' width={48} height={56} />
        <Typography size='sm'>
            Correct Network
        </Typography>
    </div>

    <div className='flex items-center gap-3'>
        <Image src="/img/icons/success.svg" alt='' width={48} height={56} />
        <Typography size='sm'>
            Please approve tokens
        </Typography>
    </div>

    <div className='flex items-center gap-3'>
        <Image src="/img/tokens/eth.base.svg" alt='' width={48} height={56} />
        <div>
        <Typography size='xl' className='font-bold'>
            0.00007172
        </Typography>
        <Typography size='xs' >
            US $0.00 estimated fees
        </Typography>
        </div>
    </div>
    </div>
    <Divider className="border-blue-700" />
    <div className='flex items-center justify-between py-10'>
        <Typography size='xs'>
            1 VULT = 0.0027 ETH ($1.00)
        </Typography>

        <div className='flex gap-2'>
        <Image src="/img/icons/gas.svg" alt='' width={18} height={18} />
        <Typography size='xs' className='font-bold'>
            $0.34
        </Typography>
        </div>
    </div>
    <Button onClick={() => {
        props.onConfirm()
        props.onClose()
    }} className="w-full my-2">
          <Typography secondary size="sm" tt="uppercase" fw="bold">
            Bridge
          </Typography>
        </Button>
</div>
</Modal>
    
  )
}

export default ConversionModal