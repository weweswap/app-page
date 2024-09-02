import React, { useEffect } from 'react'
import Image from "next/image";
import { useState } from "react";
import { Button, Card, Typography } from "~/components/common";
import { DUMMY_TABLE_HEAD, DUMMY_TABLE_CONTENT } from "./dummy";
import PoolDetail from './PoolDetail';

type ActivePoolProps = {
  setPoolTypes: (number:number) => void;
  poolTypes: number;
  onNext: () => void;
  onZap: () => void
}

const ActivePools = ({setPoolTypes, poolTypes, onNext, onZap}: ActivePoolProps) => {

  const [poolDetail, setPoolDetail] = useState();
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleShowDetails = (value:any) => {
    console.log(showDetails)
    setPoolDetail(value)
    console.log(value)
  }

  useEffect(() => {
    if(poolDetail !== undefined) {
      setShowDetails(true)
    }
  }, [poolDetail])

  const handleHideDetails = () => {
    setShowDetails(false)
    setPoolDetail(undefined)
  }

  const handleZapIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onZap()


  }

  return (
    <>
    {!showDetails ? <Card className='overflow-x-scroll'>
      <div className="flex items-center justify-between w-full gap-6 md:flex-row flex-col">
        <div className="bg_light_dark sm:w-[30rem] w-full flex items-center justify-between gap-3 h-[3rem]">
            <div onClick={() => setPoolTypes(0)} className={`${poolTypes === 0 && "nav_selected"} nav`}>
                <Typography size="sm">ACTIVE</Typography>
                </div>
                <div onClick={() => setPoolTypes(1)} className={`${poolTypes === 1 && "nav_selected"} nav`}>
                <Typography size="sm">MY POOLS</Typography>
                </div>
        </div>
         <button onClick={onNext} className="w-full md:w-fit custom_btn p-3">
          <Typography secondary size="xs" >
            +NEW POOL
          </Typography>
          </button> 
    </div>
    <table className="w-[fit-content] min-w-[100%] table-auto text-left bg_dark mt-5">
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
          <tr onClick={() => handleShowDetails({ poolType, logo, type, pool, tvl, volume, apr })} key={pool} className="bg-[#1c1c1c] w-[full] cursor-pointer hover:bg-[#202020]" style={{borderBottom: '1rem solid black'}}>
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
            <Button onClick={handleZapIn}  className="w-full md:w-auto min-w-[6rem]">
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
    :
      <PoolDetail onBack={handleHideDetails} onZap={onZap} />
    }
    </>
  )
}

export default ActivePools