import { Divider, ModalRootProps, Slider, Text } from "@mantine/core";
import Image from "next/image";
import { Button, Modal } from "~/components/common";

export const PoolClaimModal = (props: ModalRootProps) => {
  return (
    <Modal title="Zap out" {...props}>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <Image src="/img/tokens/wewe.png" width={24} height={24} alt="" />
          <Text size="lg">WEWE</Text>
        </div>

        <div className="flex flex-col gap-3">
          <Text size="xs" className="uppercase">
            Amount
          </Text>

          <div className="flex items-center justify-between">
            <Text size="lg" fw={700} className="verdana">
              100%
            </Text>
            <Button className="bg_turq">
              <Text size="xs" className="text-black">
                MAX
              </Text>
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
            <Text size="xs" className="uppercase verdana">
              Pool tokens
            </Text>
            <div className="flex items-center gap-2">
              <Text size="xs" fw={700} className="text-right verdana">
                4,283.156
              </Text>
              <Image src="/img/tokens/wewe.png" width={40} height={40} alt="" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Text size="xs" className="uppercase verdana">
              Pool fees
            </Text>
            <div className="flex items-center gap-2">
              <Text size="xs" fw={700} className="text-right verdana">
                107.9432
              </Text>
              <Image src="/img/tokens/usdc.png" width={40} height={40} alt="" />
            </div>
          </div>
        </div>

        <Divider className="border-blue-700" />

        <Button className="w-full" onClick={props.onClose}>
          <Text size="md" fw={700} className="uppercase">
            Confirm
          </Text>
        </Button>
      </div>
    </Modal>
  );
};
