
import { Divider, Loader, ModalRootProps } from '@mantine/core';
import Image from 'next/image'
import React from 'react'
import { Button, Modal, Typography } from '~/components/common'
import { usePoolContext } from './PoolContext';

export type PayloadApproveModal = {
    amountToken0: number,
    amountToken1: number,
}

type ApproveTokensProps = {
    onClose: () => void;
    onOpen: () => void;
    onCreate: () => void;
    opened: boolean;
    data?: PayloadApproveModal
  } & ModalRootProps;
const ApproveTokens = ({ data, onClose, onCreate, opened}: ApproveTokensProps) => {
  const { selectedPool } = usePoolContext();
  return (
    <Modal title="DEPOSIT TOKENS" onClose={onClose} opened={opened}>
        <div className="flex items-center justify-between gap-4 flex-wrap py-4 sm:py-1 ">
          <div className="flex items-center gap-1">
              <Image src="/img/icons/Infinity.svg" width={20} height={20} alt="" />
              <Typography size="xs" className="translate-x-1">
                {selectedPool?.range}
              </Typography>
            </div>
          <div className="flex items-center gap-1">
            <Image src="/img/icons/memes.svg" width={20} height={20} alt="" />
            <Typography size="xs" className="translate-x-1">
              {selectedPool?.poolType}
            </Typography>
          </div>
        </div>
        {/* <div className='flex flex-col items-center '>
            <div className='flex items-center justify-between gap-3 w-full'>
                <Typography secondary size='sm'>DEPOSIT</Typography>
                <div className='text-right flex flex-col gap-2'>
                    <Typography>$34.54</Typography>
                </div>
            </div>
        </div> */}
        <div className='flex flex-col items-center '>
            <div className='flex items-center justify-between gap-3 w-full'>
                <Typography size='xs'>AMOUNT</Typography>
                <div className='text-right flex flex-col gap-2'>
                    <div className='flex gap-2 items-center'>
                        <Typography className='text_light_gray' size='xs'>{parseFloat(Number(data?.amountToken0).toFixed(2))}</Typography>
                        <Image src={selectedPool?.token0.icon!} alt='' width={24} height={24} />
                        <Typography className='text_light_gray' size='xs'>{parseFloat(Number(data?.amountToken1).toFixed(2))}</Typography>
                        <Image src={selectedPool?.token1.icon!} alt='' width={24} height={24} />
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-3'>
            <div className='flex gap-3 items-center'>
                <Image src="/img/icons/success.svg" width={36} height={36} alt='' />
                <Typography>Please Approve {selectedPool?.token0.symbol}</Typography>
            </div>
            <div className='flex gap-3 items-center'>
                <Image src="/img/icons/success.svg" width={36} height={36} alt='' />
                <Typography>Please Approve {selectedPool?.token1.symbol}</Typography>
            </div>
            <div className='flex gap-3 items-center'>
                <Loader color="grey" />
                <Typography>Please Deposit {selectedPool?.token1.symbol}</Typography>
            </div>
            <div className='flex gap-3 items-center'>
                <Image src="/img/icons/inform.svg" width={36} height={36} alt='' />
                <Typography>Please sign transaction</Typography>
            </div>
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

export default ApproveTokens