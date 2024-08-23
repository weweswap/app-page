
import Image from 'next/image'
import React from 'react'
import { Button, Card, Typography } from '~/components/common'

type SuccessModalProps = {
    onConfirm: () => void;
  };

const SuccessModal = (props: SuccessModalProps) => {
  return (
   <>
    <Card className='flex flex-col items-center gap-8 py-10 sm:px-16 w-fit'>
        <div className='flex flex-col items-center gap-3'>
        <Image src="/img/icons/success.svg" width={80} height={80} alt='' />
        <Typography size='md' secondary>
            SUCCESSFULLY ZAPPED-IN
        </Typography>
        </div>
       
        <div className='flex items-center gap-3'>
        <div className='flex items-center'>
                <Image className='min-w-6 min-h-6' src="/img/tokens/wewe.png" alt='' width={32} height={32} />
                <Image className='ml-[-10px] min-w-6 min-h-6' src="/img/tokens/usdc.png" alt=''  width={32} height={32} />
        </div>
        <div>
            <Typography className='font-bold' size='md'>0.000000012321232 LBS</Typography>
            <Typography className='text_light_gray' size='xs'>US $0.10 estimated fees</Typography>
        </div>

    
        </div>
        <div>
        <Typography className='text_light_gray' size='xs'>Received 100 VULT in Ethereum from Base</Typography>
        </div>

        <div className='flex flex-col gap-4 w-full'>
        <Button className="w-full">
          <Typography secondary size="sm" fw={700} tt="uppercase">
           COMPLETED
          </Typography>
        </Button>
        <Button className="w-full md:w-auto">
          <Typography secondary size="sm" fw={700} tt="uppercase">
           VIEW DETAILS
          </Typography>
        </Button>
        </div>
    </Card>
   </>
  )
}

export default SuccessModal