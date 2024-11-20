"use client"

import React from 'react'
import { Typography } from '~/components/common'
import ChaosPoints from '~/components/common/ChaosPoints'

const ChaosPage = () => {
  return (
    <div className='flex flex-col items-center max-w-[36rem]'>
       {/* <div className="xl:absolute top-26 right-6 mb-10 w-full xl:w-fit">
        <ChaosPoints />
      </div> */}
        <Typography secondary size='lg'>
            CHAOS LEADERBOARD
        </Typography>
        <Typography className='text-center capitalize py-4' size='xs'>
        CHAOS is a point system used for rewarding loyal community members. By gathering points you get a share on the future WEWE airdrop. 
        </Typography>

        <div className='flex items-center justify-between w-full py-6 gap-3'>
            <Typography secondary size='xs'>Your position</Typography>
            <Typography secondary size='xs' fw={900} className='text_yellow'>23.</Typography>
            <Typography secondary size='xs' className='text-right'>123,456 points</Typography>
        </div>
        <div className="overflow-x-auto w-full border_stroke p-4 max-h-[20rem] overflow-scroll">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th align='left'>
            <Typography secondary size='xs' className='w-full text_light_gray'>
                Place
            </Typography>
            </th>
            <th align='center'>
            <Typography secondary size='xs' className='w-full text_light_gray'>
                Address
            </Typography>
            </th>
            <th align='right'>
            <Typography secondary size='xs' className='w-full text_light_gray'>
                CHAOS Points
            </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td align='left'>
                <Typography size='xs' className='pt-4' secondary>1.</Typography>
              </td>
              <td align='center'>
              <Typography size='xs' className='pt-4' secondary>0x12...1516</Typography>
              </td>
              <td align='right'>
              <Typography size='xs' className='pt-4' secondary>564,344</Typography>
              </td>
            </tr>

            <tr>
              <td align='left'>
                <Typography size='xs' className='pt-4' secondary>2.</Typography>
              </td>
              <td align='center'>
              <Typography size='xs' className='pt-4' secondary>0x12...1516</Typography>
              </td>
              <td align='right'>
              <Typography size='xs' className='pt-4' secondary>564,344</Typography>
              </td>
            </tr>
        </tbody>
      </table>
    </div>

    <div className='w-full'>
        <Typography secondary size='lg' className='text-center py-8'>
            GET CHAOS
        </Typography>
    <div className="overflow-x-auto w-full border_stroke p-4 max-h-[20rem] overflow-scroll">
    <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th align='left'>
            <Typography secondary size='xs' className='w-full text_light_gray'>
                Action
            </Typography>
            </th>
            <th align='right'>
            <Typography secondary size='xs' className='w-full text_light_gray'>
                Details
            </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td align='left'>
                <Typography size='xs' className='pt-4'>
                    Provide Liquidity
                </Typography>
              </td>
              <td align='right'>
              <Typography size='xs' className='pt-4'>
                10 CHAOS per 1 USDC LPed per 1 hr 
              </Typography>
              </td>
            </tr>

            <tr>
              <td align='left'>
                <Typography size='xs' className='pt-4'>
                    Merge into WEWE
                </Typography>
              </td>
              <td align='right'>
              <Typography size='xs' className='pt-4'>
                10 CHAOS per 1 USDC Merged
              </Typography>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
    </div>

    </div>
  )
}

export default ChaosPage