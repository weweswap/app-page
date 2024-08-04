import { Divider, ModalRootProps, Text } from "@mantine/core";
import Image from "next/image";
import { Button, Modal } from "~/components/common";
import { verdana } from "~/fonts";

type PoolAddModalProps = {
  onAdd: () => void;
} & ModalRootProps;

export const PoolAddModal = (props: PoolAddModalProps) => {
  return (
    <Modal title="Add liquidity" {...props}>
      <div className={`${verdana.className} flex flex-col gap-3`}>
        <div className="flex items-center justify-between">
          <Text size="xs">START WEWE</Text>
          <div className="flex items-center gap-2">
            <Text size="xs" fw={700}>
              0.428156
            </Text>
            <Image src="/img/tokens/wewe.png" width={40} height={40} alt="" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Text size="xs">END USDC</Text>
          <div className="flex items-center gap-2">
            <Text size="xs" fw={700}>
              0.001079432
            </Text>
            <Image src="/img/tokens/usdc.png" width={40} height={40} alt="" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Text size="xs">END WEWE</Text>
          <div className="flex items-center gap-2">
            <Text size="xs" fw={700}>
              0.001079432
            </Text>
            <Image src="/img/tokens/weth.png" width={40} height={40} alt="" />
          </div>
        </div>
      </div>

      <Divider className="border-blue-700" />

      <div className={`flex items-center justify-between ${verdana.className}`}>
        <Text size="xs">Refund</Text>
        <Text size="xs">Estimated ammount</Text>
      </div>

      <Button className="w-full" onClick={props.onAdd}>
        <Text size="md" fw={700}>
          Add Liquidity
        </Text>
      </Button>
    </Modal>
  );
};
