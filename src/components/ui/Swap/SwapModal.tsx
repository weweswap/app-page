import { Divider, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import { Button, Modal, Typography } from "~/components/common";
import { SwapStateProps } from ".";
type SwapModalProps = {
  onClose: () => void;
  onSwap: () => void;
  swapState: SwapStateProps;
  setSwapState: React.Dispatch<React.SetStateAction<SwapStateProps>>;
} & ModalRootProps;

export const SwapModal = (props: SwapModalProps) => {
  return (
    <Modal title="Review swap" onClose={props.onClose} opened={props.opened} >
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
      <div className="flex justify-between w-full">
        <Typography size="xs">Route</Typography>
        <Typography size="xs">Kyber Swap Aggregator</Typography>
        <Image src="/img/icons/arrow_down.svg" width={16} height={16} alt="" />
      </div>
      <div className="flex items-center justify-between gap-3">
        <Typography size="xs">Total Fee: 0.25%</Typography>
        <Typography size="xs" fw={700}>
          {"<"}$0.01
        </Typography>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Typography size="xs">Total cost</Typography>
        <div className="flex items-center gap-1">
          <Image src="/img/icons/fee.svg" width={14} height={14} alt="" />
          <Typography size="xs" fw={700}>
            $5.34
          </Typography>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={() =>
          props.setSwapState((prevState: SwapStateProps) => ({
            ...prevState,
            approved: true,
          }))
        }
        disabled={props.swapState.approved}
      >
        <Typography secondary size="md" fw={700} tt="uppercase">
          approve swap
        </Typography>
      </Button>

      <Button
        className="w-full"
        onClick={props.onSwap}
        disabled={!props.swapState.approved}
      >
        <Typography secondary size="md" fw={700} tt="uppercase">
          Confirm Swap
        </Typography>
      </Button>
    </Modal>
  );
};
