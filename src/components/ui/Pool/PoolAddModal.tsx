import Image from "next/image";
import { Divider, ModalRootProps } from "@mantine/core";
import { Button, Modal, Typography } from "~/components/common";

type PoolAddModalProps = {
  onAdd: () => void;
} & ModalRootProps;

export const PoolAddModal = (props: PoolAddModalProps) => {
  return (
    <Modal title="Add liquidity" {...props}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Typography size="xs">START WEWE</Typography>
          <div className="flex items-center gap-2">
            <Typography size="xs" fw={700}>
              0.428156
            </Typography>
            <Image src="/img/tokens/wewe.png" width={40} height={40} alt="" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Typography size="xs">END USDC</Typography>
          <div className="flex items-center gap-2">
            <Typography size="xs" fw={700}>
              0.001079432
            </Typography>
            <Image src="/img/tokens/usdc.png" width={40} height={40} alt="" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Typography size="xs">END WEWE</Typography>
          <div className="flex items-center gap-2">
            <Typography size="xs" fw={700}>
              0.001079432
            </Typography>
            <Image src="/img/tokens/weth.png" width={40} height={40} alt="" />
          </div>
        </div>
      </div>

      <Divider className="border-blue-700" />

      <div className="flex items-center justify-between">
        <Typography size="xs">Refund</Typography>
        <Typography size="xs">Estimated ammount</Typography>
      </div>

      <Button className="w-full" onClick={props.onAdd}>
        <Typography secondary size="md" fw={700}>
          Add Liquidity
        </Typography>
      </Button>
    </Modal>
  );
};
