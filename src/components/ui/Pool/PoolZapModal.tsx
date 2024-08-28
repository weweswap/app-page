import { Card, Divider, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import { Button, Modal, Typography } from "~/components/common";

type ZapModalProps = {
    onClose: () => void;
    onOpen: () => void;
    onConfirm: () => void
  } & ModalRootProps;

export const PoolZapModal = (props: ZapModalProps) => {

  const [migrateRange, setMigrateRange] = useState<number>(0);

  return (
    <Modal title="ZAP IN" onClose={props.onClose} opened={props.opened} >
      <div className="flex items-center justify-between gap-3 p-4">
              <div className="flex-1 flex items-center gap-3">
                <Image
                  src="/img/tokens/wewe.png"
                  width={24}
                  height={24}
                  alt=""
                />
                <Typography secondary size="xs">
                  WEWE
                </Typography>
              </div>
              <Image
                src="/img/icons/arrow_right.svg"
                width={16}
                height={16}
                alt=""
              />
              <div className="flex-1 flex items-center justify-end gap-3">
                <Image
                  src="/img/tokens/vult.svg"
                  width={24}
                  height={24}
                  alt=""
                />
                <Typography secondary size="xs">
                  WEWE/USDC
                </Typography>
              </div>
            </div>
            <Card className="bg_dark">
        <div className="flex items-center justify-between">
          <Typography size="lg">AMOUNT</Typography>
          <div className="flex items-center gap-2">
            <Image
              src="/img/icons/settings.svg"
              width={24}
              height={24}
              alt=""
            />
          </div>
        </div>
        <div className="flex items-center justify-between py-3">
          <Typography size="xs" className="font-bold">
            100%
          </Typography>
          <Typography size="xs" secondary className="font-bold">
            35.65
          </Typography>
          <div className="flex items-center gap-2 font-extrabold text-black text-sm">
          <Button className="bg_turq">
                     <Typography secondary size="xs" fw={700} tt="uppercase">50%</Typography>
                </Button>
                <Button className="bg_turq">
                     <Typography secondary size="xs" fw={700} tt="uppercase">MAX</Typography>
                </Button>
          </div>
        </div>
        <div className="pb-3">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-full h-2 bg-[#33E6BF] rounded-lg appearance-none cursor-pointer "
          />
        </div>
      </Card>

      <div className="w-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Typography size="xs">INITIAL USDC</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
               34,56
              </Typography>
              <Image src="/img/tokens/weth.png" width={24} height={24} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">ZAPPED WEWE</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                $17.27
              </Typography>
              <Image src="/img/tokens/wewe.png" width={24} height={24} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">ZAPPED USDC</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                $17.27
              </Typography>
              <Image src="/img/tokens/usdc.png" width={24} height={24} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">RANGE TYPE 40%</Typography>
            <div className="flex items-center gap-2">
              <Typography className="font-bold" size="xs" fw={700}>
                NARROW
              </Typography>
              <Image src="/img/tokens/weth.png" width={24} height={24} alt="" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Typography size="xs">WAMM LBS</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                0.000000001079432
              </Typography>
              <Image src="/img/tokens/weth.png" width={24} height={24} alt="" />
            </div>
          </div>
          <div className="flex items-center justify-between pt-10">
            <Typography size="xs">POOL TOKENS</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs">4,283.15</Typography>
              <Image src="/img/tokens/wewe.png" width={24} height={24} alt="" />
            </div>
            <div className="flex items-center gap-2">
              <Typography size="xs">17.10</Typography>
              <Image src="/img/tokens/usdc.png" width={24} height={24} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-10">
              <Typography size="xs">0.05% Performance Fee:</Typography>
              <Typography size="xs">Estimated amount: $0.017</Typography>
          </div>

          <hr />

          <div>
          <Button onClick={() => {
            props.onConfirm()
            props.onClose()
          }} className="bg_blue w-full mt-2">
            <Typography secondary size="xs" fw={700} tt="uppercase">CONFIRM</Typography>
          </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
