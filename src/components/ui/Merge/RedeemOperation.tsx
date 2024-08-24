import { NumberInput } from '@mantine/core'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import { Button, Card, Typography } from '~/components/common'
import { dogica } from '~/fonts'

const RedeemOperation = () => {
  return (
    <>
        <div className='flex lg:flex-row flex-col  justify-between py-5 gap-6 lg:gap-16 bg-black'>
            <div className=''>
            <NumberInput
                      classNames={{
                        root: "w-full md:w-full",
                        input: clsx(
                          dogica.className,
                          "bg-gray-900 md:p-4 p-0 text-white text-lg h-auto border-transparent rounded-none"
                        ),
                      }}
                      hideControls
                    />
                    <button className='bg_dark p-3'>
                        <Typography size='md'>
                            MAX
                        </Typography>
                    </button>
            </div>
            <button className='w-[8rem] h-[3.5rem]'>
            <Typography size='md'>
                {"> "} 1000 VULT
            </Typography>
            </button>
            <div className='h-[3.5rem]'>
            <Button
                    className="flex items-center justify-center gap-3 w-full h-full md:w-auto "
                    disabled
                  >
                    <Typography secondary size="xs" fw={700} tt="uppercase">
                      APPROVE
                    </Typography>
                  </Button>
            </div>
        </div>
    </>
  )
}

export default RedeemOperation