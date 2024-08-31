import { Card, Divider, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import { Button, Dropdown, Modal, Typography } from "~/components/common";
import { DUMMY_POOL_OPTIONS } from "./dummy";

type ZapOutModalProps = {
    onClose: () => void;
    onOpen: () => void;
    onConfirm: () => void
  } & ModalRootProps;

export const PoolZapOutModal = (props: ZapOutModalProps) => {

  const poolOptions = DUMMY_POOL_OPTIONS.map((pool) => ({
    value: pool.symbol,
    icon: pool.icon,
  }));

  const [migrateRange, setMigrateRange] = useState<number>(0);

  return (
    <Modal title="ZAP OUT" onClose={props.onClose} opened={props.opened}>
    <div className="flex items-center justify-start gap-8">
            <div className="flex items-center gap-3">
            <div className='flex items-center'>
              <Image className='min-w-6 min-h-6' src="/img/tokens/wewe.svg" alt='' width={24} height={24} />
              <Image className='ml-[-10px] min-w-6 min-h-6'  src="/img/tokens/usdc.png" alt=''  width={24} height={24} />
            </div>
              <Typography secondary size="xs">
                WEWE/USDC
              </Typography>
            </div>
            <Image
              src="/img/icons/arrow_left.svg"
              width={16}
              height={16}
              alt=""
            />
          </div>
          <Card className="bg_dark">
      <div className="flex items-center justify-between">
        <Typography size="xs" secondary>AMOUNT</Typography>
        <div className="flex items-center gap-2">
          <Image
            src="/img/icons/settings.svg"
            width={24}
            height={24}
            alt=""
          />
        </div>
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
      <div>
        <Typography secondary size="md">TOTAL EXPECTED</Typography>
        <Typography className="my-3" size="xl" fw={900}>$34.54</Typography>
        <Typography size="xs" className="text_light_gray">0.0000001231231  SHARES </Typography>
      </div>
     <Button className="w-full mt-3"> 
      <Typography secondary size="sm">
        CONFIRM
      </Typography>
     </Button>
    </div>
  </Modal>
  );
};
