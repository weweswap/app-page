import { Divider, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import { Button, Modal, Typography } from "~/components/common";

export const SwapModal = (props: ModalRootProps) => {
  return (
    <Modal title="Review swap" {...props}>
      <div className="flex flex-col gap-4">
        <Typography secondary size="xs">
          Sell
        </Typography>
        <div className="flex items-center justify-between gap-3">
          <Typography secondary size="xl">
            0.030 ETH
          </Typography>
          <Image src="/img/tokens/eth.png" width={36} height={36} alt="" />
        </div>
        <Typography size="xs">$120.20</Typography>
      </div>

      <div className="flex flex-col gap-4">
        <Typography secondary size="xs">
          Buy
        </Typography>
        <div className="flex items-center justify-between gap-3">
          <Typography secondary size="xl">
            109.925 USDC
          </Typography>
          <Image src="/img/tokens/usdc.png" width={36} height={36} alt="" />
        </div>
        <Typography size="xs">$109.97</Typography>
      </div>

      <Divider className="border-blue-700" />

      <div className="flex items-center justify-between gap-3">
        <Typography size="xs">Rate</Typography>
        <Typography size="xs">1 USDC = 0.0027 ETH ($1.00)</Typography>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Typography size="xs">Fee (0.25%)</Typography>
        <Typography size="xs" fw={700}>
          {"<"}$0.01
        </Typography>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Typography size="xs">Network cost</Typography>
        <div className="flex items-center gap-1">
          <Image src="/img/icons/fee.svg" width={14} height={14} alt="" />
          <Typography size="xs" fw={700}>
            $5.34
          </Typography>
        </div>
      </div>

      <Button className="w-full" onClick={props.onClose}>
        <Typography secondary size="md" fw={700}>
          Confirm Swap
        </Typography>
      </Button>
    </Modal>
  );
};
