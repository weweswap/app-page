import Image from "next/image";
import { Divider, ModalRootProps, Slider } from "@mantine/core";
import { Button, Modal, Typography } from "~/components/common";

export const PoolClaimModal = (props: ModalRootProps) => {
  return (
    <Modal title="Zap out" {...props}>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <Image src="/img/tokens/wewe.png" width={24} height={24} alt="" />
          <Typography secondary size="lg">
            WEWE
          </Typography>
        </div>

        <div className="flex flex-col gap-3">
          <Typography secondary size="xs" tt="uppercase">
            Amount
          </Typography>

          <div className="flex items-center justify-between">
            <Typography size="lg" fw={700}>
              100%
            </Typography>
            <Button className="bg_turq">
              <Typography secondary size="xs" className="text-black">
                MAX
              </Typography>
            </Button>
          </div>

          <Slider
            defaultValue={100}
            radius={0}
            classNames={{ thumb: "bg_blue border-none", bar: "bg_turq" }}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Typography size="xs" tt="uppercase">
              Pool tokens
            </Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700} ta="right">
                4,283.156
              </Typography>
              <Image src="/img/tokens/wewe.png" width={40} height={40} alt="" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Typography size="xs" tt="uppercase">
              Pool fees
            </Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700} ta="right">
                107.9432
              </Typography>
              <Image src="/img/tokens/usdc.png" width={40} height={40} alt="" />
            </div>
          </div>
        </div>

        <Divider className="border-blue-700" />

        <Button className="w-full" onClick={props.onClose}>
          <Typography secondary size="md" fw={700} tt="uppercase">
            Confirm
          </Typography>
        </Button>
      </div>
    </Modal>
  );
};
