import { useEffect } from "react";
import Image from "next/image";
import { Divider, ModalRootProps } from "@mantine/core";
import { Button, Modal, Typography } from "~/components/common";
import { formatStringUnits } from "~/utils";
import { Hash } from "viem";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";

import { useSwapContext } from "./SwapContext";

type SwapModalProps = {
  onClose: () => void;
  openSwapComplete: () => void;
  openSwapFail: () => void;
  setHash: (value: Hash) => void;
} & ModalRootProps;

export const SwapModal = (props: SwapModalProps) => {
  const { data: hash, isPending, sendTransaction } = useSendTransaction();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
  } = useWaitForTransactionReceipt({ hash });
  const { swapState, routeData, encodedData, setSwapState } = useSwapContext();

  const handleConfirm = async () => {
    if (!encodedData) return;

    sendTransaction({
      to: routeData?.routerAddress,
      value:
        routeData?.inputToken.symbol.toLowerCase() === "eth"
          ? BigInt(encodedData.amountIn)
          : 0n,
      data: encodedData.data,
    });
  };
  useEffect(() => {
    setSwapState({
      ...swapState,
      pendingSwap: isPending,
      confirmingSwap: isConfirming,
      swapDone: isConfirmed,
      swapError: isError,
    });

    if (isConfirmed) {
      props.setHash(hash!);
      props.onClose();
      props.openSwapComplete();
    }
    if (isError) {
      props.setHash(hash!);
      props.onClose();
      props.openSwapFail();
    }
  }, [isPending, isConfirming, isConfirmed, isError]);
  return (
    <Modal title="Review swap" onClose={props.onClose} opened={props.opened}>
      {routeData && (
        <>
          <div className="flex flex-col gap-4">
            <Typography secondary size="xs">
              Sell
            </Typography>
            <div className="flex items-center justify-between gap-3">
              <Typography secondary size="lg">
                {Number(
                  formatStringUnits(
                    routeData.routeSummary.amountIn,
                    routeData.inputToken.decimals
                  )
                ).toFixed(6)}{" "}
                {routeData.inputToken.symbol}
              </Typography>
              <Image
                src={routeData.inputToken.icon}
                width={36}
                height={36}
                alt={routeData.inputToken.symbol}
              />
            </div>
            <Typography size="xs">
              $
              {Number(routeData.routeSummary.amountInUsd).toLocaleString(
                "en-US"
              )}
            </Typography>
          </div>

          <div className="flex flex-col gap-4">
            <Typography secondary size="xs">
              Buy
            </Typography>
            <div className="flex items-center justify-between gap-3">
              <Typography secondary size="lg">
                {Number(
                  formatStringUnits(
                    routeData.routeSummary.amountOut,
                    routeData.outputToken.decimals
                  )
                ).toFixed(6)}{" "}
                {routeData.outputToken.symbol}
              </Typography>
              <Image
                src={routeData.outputToken.icon}
                width={36}
                height={36}
                alt={routeData.outputToken.symbol}
              />
            </div>
            <Typography size="xs">
              $
              {Number(routeData.routeSummary.amountOutUsd).toLocaleString(
                "en-US"
              )}
            </Typography>
          </div>

          <Divider className="border-blue-700" />

          <div className="flex items-center justify-between gap-3">
            <Typography size="xs">Rate</Typography>
            <Typography size="xs">
              1 {routeData.inputToken.symbol} ={" "}
              {(
                Number(
                  formatStringUnits(
                    routeData.routeSummary.amountOut,
                    routeData.outputToken.decimals
                  )
                ) /
                Number(
                  formatStringUnits(
                    routeData.routeSummary.amountIn,
                    routeData.inputToken.decimals
                  )
                )
              ).toLocaleString("en-US")}{" "}
              {routeData.outputToken.symbol} ($1.00)
            </Typography>
          </div>
          <div className="flex w-full justify-between">
            <Typography size="xs">Route</Typography>
            <Typography size="xs">Kyber Swap Aggregator</Typography>
            <Image
              src="/img/icons/arrow_down.svg"
              width={16}
              height={16}
              alt=""
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <Typography size="xs">
              Total Fee:{" "}
              {routeData.routeSummary.extraFee.chargeFeeBy == ""
                ? "0.0%"
                : `${routeData.routeSummary.extraFee.chargeFeeBy}%`}
            </Typography>
            <Typography size="xs" fw={700}>
              {"<"}$
              {Number(routeData.routeSummary.extraFee.feeAmount).toLocaleString(
                "en-US"
              )}
            </Typography>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Typography size="xs">Total cost</Typography>
            <div className="flex items-center gap-1">
              <Image src="/img/icons/fee.svg" width={14} height={14} alt="" />
              <Typography size="xs" fw={700}>
                ${Number(routeData.routeSummary.gasUsd).toLocaleString("en-US")}
              </Typography>
            </div>
          </div>

          {swapState.buildErrorCode == "422" && (
            <div className="rounded-lg bg-orange-600 p-2">
              <Typography size="xs">
                There was an issue while confirming your price and minimum
                amount received. You may consider adjusting your Max Slippage
                and then trying to swap again.
              </Typography>
            </div>
          )}

          {swapState.buildErrorCode ? (
            <Button className="w-full" onClick={props.onClose}>
              <Typography secondary size="md" fw={700} tt="uppercase">
                Dismiss
              </Typography>
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={handleConfirm}
              disabled={
                !swapState.approved ||
                swapState.loading ||
                swapState.pendingSwap ||
                swapState.confirmingSwap
              }
            >
              <Typography secondary size="md" fw={700} tt="uppercase">
                {swapState.pendingSwap
                  ? "Pending wallet confirm"
                  : swapState.confirmingSwap
                    ? "Pending ..."
                    : " Confirm Swap"}
              </Typography>
            </Button>
          )}
        </>
      )}
    </Modal>
  );
};
