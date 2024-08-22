import React from 'react'
import Image from "next/image";
import { useState } from "react";
import { Button, Card, Typography } from "~/components/common";
import { DUMMY_TABLE_HEAD, DUMMY_TABLE_CONTENT } from "./dummy";

const ActivePoolTable = () => {
  return (
    <table className="w-[fit-content] min-w-[100%] table-auto text-left">
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
      <tbody>
        {DUMMY_TABLE_CONTENT.map(({ logo, type, pool, tvl, volume, apr }, index) => (
          <tr key={pool} className="bg-[#1c1c1c] w-[full] " style={{borderBottom: '2rem solid black'}}>
            <td className="p-4 flex items-center gap-2 font-bold text-[]">
              <div className='flex items-center'>
                <Image src={logo.first} alt='' width={32} height={32} />
                <Image src={logo.second} alt=''  width={32} height={32} className='ml-[-15px]' />
              </div>
              <div>

              <Typography size='lg'>{pool}</Typography>
              <Typography className='font-bold' size='xs'>{type}</Typography>

              </div>
            </td>
            <td className="p-4">
                {tvl}
            </td>
            <td className="p-4">
                {volume}
            </td>
            <td className="p-4">
                {apr}
            </td>
            <td className="p-4" align='right'>
            <Button  className="w-full md:w-auto">
            ZAP-IN
        </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  
  )
}

export default ActivePoolTable