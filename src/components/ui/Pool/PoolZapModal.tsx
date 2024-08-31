import { Card, Divider, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import { Button, Dropdown, Modal, Typography } from "~/components/common";
import { DUMMY_POOL_OPTIONS } from "./dummy";

type ZapModalProps = {
    onClose: () => void;
    onOpen: () => void;
    onConfirm: () => void;
    onSettings: () => void
  } & ModalRootProps;

export const PoolZapModal = (props: ZapModalProps) => {

  const poolOptions = DUMMY_POOL_OPTIONS.map((pool) => ({
    value: pool.symbol,
    icon: pool.icon,
  }));

  const [migrateRange, setMigrateRange] = useState<number>(0);

  return (
    
    <Modal title="ZAP IN" onClose={props.onClose} opened={props.opened}>
      <div className="flex items-center justify-between gap-3">
      <Image
                src="/img/icons/arrow_right.svg"
                width={16}
                height={16}
                alt=""
              />
              <div className="flex-1 flex items-center gap-3">
              <div className='flex items-center'>
                <Image className='min-w-6 min-h-6' src="/img/tokens/wewe.svg" alt='' width={24} height={24} />
                <Image className='ml-[-10px] min-w-6 min-h-6'  src="/img/tokens/usdc.png" alt=''  width={24} height={24} />
              </div>
                <Typography secondary size="xs">
                  WEWE/USDC
                </Typography>
              </div>
            </div>
            <Card className="bg_dark">
        <div className="flex items-center justify-between">
          <Typography size="xs" secondary>SELECT AMOUNT</Typography>
          <button onClick={props.onSettings} className="flex items-center gap-2">
            <Image
              src="/img/icons/settings.svg"
              width={24}
              height={24}
              alt=""
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
        <div className="flex md:flex-row flex-col gap-4 justify-between w-full my-5">
          <div className="flex flex-col md:w-1/2  gap-5">
            <input value={35.56} className="inputField"/>
          </div>
         
          <div className="flex flex-col md:w-1/2   gap-5">   
            <Dropdown
              defaultValue="USDC"
              options={poolOptions}
              className="w-full bg-black"
            />
          </div>
        </div>
        </div>
        <div className="pb-1">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-full h-2 bg-[#33E6BF] rounded-lg appearance-none cursor-pointer "
          />
        </div>
        <div className="flex items-center justify-between py-3">

          <div>
          </div>
          <div className="flex items-center gap-2 font-extrabold text-black text-sm">
          <Button className="bg_turq">
                     <Typography secondary size="xs" fw={700} tt="uppercase">50%</Typography>
                </Button>
                <Button className="bg_turq">
                     <Typography secondary size="xs" fw={700} tt="uppercase">MAX</Typography>
                </Button>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <Typography size="xs">Zap Route</Typography>
        <Image src="/img/icons/arrow_right.svg" alt="" height={12} width={12} />
        <Typography size="xs">Kyber Swap Aggregator</Typography>
        <Image src="/img/icons/arrow_right.svg" alt="" height={12} width={12} />
        <Typography size="xs">Uniswap v3</Typography>
      </div>

      <div className="w-full">
        <Typography secondary size="xs">RANGE</Typography>
      <div className="grid grid-cols-4 gap-2 py-3  w-full">
          <button disabled
            className={`bg_gray flex items-center justify-center gap-2 px-3 py-2`}
          >
            <Image src="/img/links/wide.svg" width={12} height={12} alt="" />
            <Typography size="xs">WIDE</Typography>
          </button>
          <button disabled
            className={`bg_gray flex items-center justify-center gap-2 px-3 py-2`}
          >
            <Image src="/img/links/mid.svg" width={12} height={12} alt="" />
            <Typography size="xs">MID</Typography>
          </button>
          <button disabled
            className={`bg_gray flex items-center justify-center gap-2 px-3 py-2`}
          >
            <Image src="/img/links/narrow.svg" width={12} height={12} alt="" />
            <Typography size="xs">NARROW</Typography>
          </button>
          <button 
            className={`bg_gray flex items-center justify-center gap-2 px-3 py-2`}
          >
            <Image src="/img/icons/infinity.svg" width={12} height={12} alt="" />
            <Typography size="xs">INFINITY</Typography>
          </button>
        </div>
        <div className="flex justify-between gap-1">
          <Typography secondary size="xs">EXPECTED DEPOSIT</Typography>
          <div className="text-right">
            <Typography fw={900} size="lg">$34</Typography>
            <Typography fw={500} size="xs">0.0000001231231 SHARES </Typography>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 py-4">
        <Typography fw={500} size="xs">0.05% Performance Fee</Typography>
        <Typography fw={500} size="xs">Estimated ammount: $0,017</Typography>
        </div>
       <Button onClick={props.onConfirm} className="w-full"> 
        <Typography secondary size="sm">
          CONFIRM
        </Typography>
       </Button>
      </div>
    </Modal>
  );
};
