import Link from 'next/link'
import React from 'react'
import { useAccount } from 'wagmi'
import { Card, Typography } from '~/components/common'
import GoodleMergeForm from '~/components/ui/Merge/Goodle/GoodleMergeForm'
import { CONTRACT_ADDRESSES } from '~/constants'
import { useEaterRate } from '~/hooks/useEater'
import { useTokenBalance } from '~/hooks/useTokenBalance'
import * as dn from "dnum";

const GoodleMergePage = () => {

  const { rate } = useEaterRate(CONTRACT_ADDRESSES.goodle);

  console.log("RATE:", dn.format([rate, 2], { locale: "en" }))

  return (
    <div>
        <div className="col-span-12 gap-3 xl:w-[50rem] h-[100%]">
        <Card>
          <div className="md:flex items-center justify-between gap-3 text-center md:text-start">
            <Link href="/merge">
              <Typography secondary size="xl" tt="uppercase">
                <span>{"<"}</span>  MERGE NO&ensp;W
              </Typography>
            </Link>
          </div>
          <div className="md:flex items-center justify-between gap-3 text-center md:text-start mt-5">
            <Typography
              size="sm"
              tt="uppercase"
              className="text-center md:text-start"
            >
              Merge your coins
            </Typography>
          </div>
        </Card>
        <Card className="border-t-0">
          <div className="flex flex-col my-5">
            <Typography size="lg">MERGE your GOODLE into WEWE</Typography>

            <ul className="list-decimal list-inside pt-3 text-sm text_light_gray">
              <li>Merge your $GOODLE to grab your $WEWE</li>
              <li>Fixed Rate of <strong>1 $GOODLE to 36.45 $WEWE</strong></li>
            </ul>
          </div>
        </Card>
        <Card>
        <div id="dexscreener-embed" className='h-[25rem] lg:h-[40rem]'>
          <iframe 
            className='w-full h-full' 
            src="https://dexscreener.com/base/0x5E9BB3d7682A9537DB831060176C4247aB80D1Ec?embed=1&theme=dark"> 
          </iframe>
        </div>
        <GoodleMergeForm />
        </Card>
        <Card>
            <Typography className='text-center py-5'>MERGE 1:1 your $GOODLE for $WEWE</Typography>
        </Card>       
      </div>
    </div>
  )
}

export default GoodleMergePage