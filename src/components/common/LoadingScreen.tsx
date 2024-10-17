import React from 'react'
import { Typography } from './Typography'

export const LoadingScreen = () => {
  return (
    <>
      <Typography secondary className='h-full flex justify-center items-center text-center py-10 font-bold' size='xl'>
        LOADING ...
      </Typography>
    </>
  )
}
