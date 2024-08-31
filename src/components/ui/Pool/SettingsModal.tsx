import { ModalRootProps } from '@mantine/core';
import Image from 'next/image';
import React from 'react'
import { Button, Card, Dropdown, Modal, Typography } from '~/components/common'

type SettingsModalProps = {
    onClose: () => void;
    onOpen: () => void;
  } & ModalRootProps;

const SettingsModal = (props: SettingsModalProps ) => {
  return (
    <Modal title="SETTINGS" onClose={props.onClose} opened={props.opened}>
      <div>
        <Typography size='xs'  secondary>SWAP</Typography>

        <div className="flex items-center justify-between gap-2">
       <Typography size='sm' secondary>SLIPPAGE %</Typography>
       <div className='flex gap-2'>
        <button className='turq_btn font-bold'>
            <Typography fw={1000}>1%</Typography>
        </button>
        <button disabled className='turq_btn font-bold'>
            <Typography fw={1000}>2%</Typography>
        </button>
        <button disabled className='turq_btn font-bold  flex items-center'>
          <input className='bg-transparent outline-none w-[5rem]'/>
            <Typography fw={1000}>%</Typography>
        </button>
       </div>
        </div>
        <div className="py-2">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-full h-2 bg-[#33E6BF] rounded-lg appearance-none cursor-pointer "
          />
        </div>
        </div>

        <div>
        <Typography size='xs'  secondary>ZAPS</Typography>

        <div className="flex items-center justify-between gap-2">
       <Typography size='sm' secondary>SLIPPAGE %</Typography>
       <div className='flex gap-2'>
        <button disabled className='turq_btn font-bold'>
            <Typography fw={1000}>1%</Typography>
        </button>
        <button  className='turq_btn font-bold'>
            <Typography fw={1000}>2%</Typography>
        </button>
        <button disabled className='turq_btn font-bold  flex items-center'>
          <input className='bg-transparent outline-none w-[5rem]'/>
            <Typography fw={1000}>%</Typography>
        </button>
       </div>
        </div>
        <div className="py-2">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-full h-2 bg-[#33E6BF] rounded-lg appearance-none cursor-pointer "
          />
        </div>
        </div>
    </Modal>
  )
}

export default SettingsModal