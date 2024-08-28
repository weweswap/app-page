import Link from 'next/link';
import { Button, Typography } from '~/components/common';

export default function Custom404() {
  return (
    <>
   <Typography secondary size='xl' className='font-bold'>
    Page not found! 
   </Typography>
   <Button>
    <Link href="./">Go back home</Link>
   </Button>
   </>
  );
}