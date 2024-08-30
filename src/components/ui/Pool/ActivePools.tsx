import React from 'react'
import Image from "next/image";
import { useState } from "react";
import { Button, Card, Typography } from "~/components/common";
import { DUMMY_TABLE_HEAD, DUMMY_TABLE_CONTENT } from "./dummy";

const ActivePools = () => {

  const [poolDetail, setPoolDetail] = useState();
  const [showDetails, setShowDetails] = useState();

  const handleShowDetails = (value:any) => {
    setPoolDetail(value)
    console.log(value)
  }

  return (
    <>
    <Card className='overflow-x-scroll'>
    <table className="w-[fit-content] min-w-[100%] table-auto text-left bg_dark">
      <thead>
        <tr>
          {DUMMY_TABLE_HEAD.map((head) => (
            <th key={head} className="  bg-blue-gray-50 p-4">
              <Typography
                variant="md"
                className="font-bold leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
       <Typography className='px-4 text-sm py-2'>
            MEMES 1%
        </Typography>
      <tbody>
        {DUMMY_TABLE_CONTENT.map(({ poolType, logo, type, pool, tvl, volume, apr }, index) => (
          <>
          {/* <tr key={type} className='px-4 text-sm py-2'>
            {poolType}
        </tr> */}
          <tr onClick={() => handleShowDetails(poolType)} key={pool} className="bg-[#1c1c1c] w-[full]" style={{borderBottom: '1rem solid black'}}>
            <td className="p-4 font-bold ">
              <div className='flex items-center gap-2'>
              <div className='flex items-center'>
                <Image className='min-w-6 min-h-6' src={logo.first} alt='' width={32} height={32} />
                <Image className='ml-[-10px] min-w-6 min-h-6' src={logo.second} alt=''  width={32} height={32} />
              </div>
              <Typography size='xs'>{type}</Typography>
              </div>
            </td>
            <td className="p-4">
            <Typography size='xs'>{tvl}</Typography>
            </td>
            <td className="p-4">
            <Typography size='xs'>{volume}</Typography>
            </td>
            <td className="p-4">
            <Typography size='xs'>{apr}</Typography>
            </td>
            <td className="p-4" align='right'>
            <Button  className="w-full md:w-auto min-w-[6rem] ">
            <Typography secondary size='xs' ff="900">
            ZAP-IN
            </Typography>
        </Button>
            </td>
          </tr>
          </>
        ))}
      </tbody>
    </table>
    </Card>
    </>
  )
}

export default ActivePools