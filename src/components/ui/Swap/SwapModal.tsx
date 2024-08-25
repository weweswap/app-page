import { Divider, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import { Button, Modal, Typography } from "~/components/common";
import { SwapStateProps } from ".";
import { RouteData, RouteSummary } from "~/models";
import { formatStringUnits } from "~/utils";
type SwapModalProps = {
  onClose: () => void;
  onApprove: () => void;
  onConfirm: () => void;
  routeData: RouteData;
  swapState: SwapStateProps;
  setSwapState: React.Dispatch<React.SetStateAction<SwapStateProps>>;
} & ModalRootProps;

export const SwapModal = (props: SwapModalProps) => {
  return (
    <Modal title="Review swap" onClose={props.onClose} opened={props.opened}>
      <div className="flex flex-col gap-4">
        <Typography secondary size="xs">
          Sell
        </Typography>
        <div className="flex items-center justify-between gap-3">
          <Typography secondary size="xl">
            {Number(
              formatStringUnits(
                props.routeData.routeSummary.amountIn,
                props.routeData.inputToken.decimals
              )
            )}{" "}
            {props.routeData.inputToken.symbol}
          </Typography>
          <Image
            src={props.routeData.inputToken.icon}
            width={36}
            height={36}
            alt={props.routeData.inputToken.symbol}
          />
        </div>
        <Typography size="xs">
          ${Number(props.routeData.routeSummary.amountInUsd).toLocaleString()}
        </Typography>
      </div>

      <div className="flex flex-col gap-4">
        <Typography secondary size="xs">
          Buy
        </Typography>
        <div className="flex items-center justify-between gap-3">
          <Typography secondary size="xl">
            {Number(
              formatStringUnits(
                props.routeData.routeSummary.amountOut,
                props.routeData.outputToken.decimals
              )
            ).toLocaleString()}{" "}
            {props.routeData.outputToken.symbol}
          </Typography>
          <Image
            src={props.routeData.outputToken.icon}
            width={36}
            height={36}
            alt={props.routeData.outputToken.symbol}
          />
        </div>
        <Typography size="xs">
          ${Number(props.routeData.routeSummary.amountOutUsd).toLocaleString()}
        </Typography>
      </div>

      <Divider className="border-blue-700" />

      <div className="flex items-center justify-between gap-3">
        <Typography size="xs">Rate</Typography>
        <Typography size="xs">
          1 {props.routeData.inputToken.symbol} ={" "}
          {(
            Number(
              formatStringUnits(
                props.routeData.routeSummary.amountOut,
                props.routeData.outputToken.decimals
              )
            ) /
            Number(
              formatStringUnits(
                props.routeData.routeSummary.amountIn,
                props.routeData.inputToken.decimals
              )
            )
          ).toLocaleString()}{" "}
          {props.routeData.outputToken.symbol} ($1.00)
        </Typography>
      </div>
      <div className="flex justify-between w-full">
        <Typography size="xs">Route</Typography>
        <Typography size="xs">Kyber Swap Aggregator</Typography>
        <Image src="/img/icons/arrow_down.svg" width={16} height={16} alt="" />
      </div>
      <div className="flex items-center justify-between gap-3">
        <Typography size="xs">
          Total Fee:{" "}
          {props.routeData.routeSummary.extraFee.chargeFeeBy == ""
            ? "0.0%"
            : `${props.routeData.routeSummary.extraFee.chargeFeeBy}%`}
        </Typography>
        <Typography size="xs" fw={700}>
          {"<"}$
          {Number(
            props.routeData.routeSummary.extraFee.feeAmount
          ).toLocaleString()}
        </Typography>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Typography size="xs">Total cost</Typography>
        <div className="flex items-center gap-1">
          <Image src="/img/icons/fee.svg" width={14} height={14} alt="" />
          <Typography size="xs" fw={700}>
            ${Number(props.routeData.routeSummary.gasUsd).toLocaleString()}
          </Typography>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={() => {
          props.onApprove();
        }}
        disabled={props.swapState.approved || props.swapState.loading}
      >
        <Typography secondary size="md" fw={700} tt="uppercase">
          approve swap
        </Typography>
      </Button>

      <Button
        className="w-full"
        onClick={props.onConfirm}
        disabled={!props.swapState.approved || props.swapState.loading || props.swapState.pendingSwap}
      >
        <Typography secondary size="md" fw={700} tt="uppercase">
          {props.swapState.pendingSwap ? "Pending wallet confirm" :  " Confirm Swap"}
        </Typography>
      </Button>
    </Modal>
  );
};
