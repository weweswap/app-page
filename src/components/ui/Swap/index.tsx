"use client";

import { useDisclosure } from "@mantine/hooks";
import { SwapHome } from "./SwapHome";
import { SwapModal } from "./SwapModal";
import { SwapCompleteModal } from "./SwapCompleteModal";
import { SwapSettingModal } from "./SwapSettingModal";
import { useEffect, useState } from "react";
import { BuildData, RouteData, RouterMessageType } from "~/models";

import {
  useSendTransaction,
  useSignMessage,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useAccount } from "wagmi";
import api from "~/api/swap";
import { Chain } from "~/constants";
export type SwapStateProps = {
  approved: boolean;
  loading?: boolean;
  pendingSwap?: boolean;
  confirmingSwap?: boolean;
  swapDone?: boolean;
};

export const Swap = () => {
  const { address, chain } = useAccount();

  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const [swapSlippage, setSwapSlippage] = useState<number>(100);
  const [zapSlippage, setZapSlippage] = useState<number>(100);
  const [routeData, setRouteData] = useState<RouteData>();
  const [encodedData, setEncodedData] = useState<BuildData>();
  const [swapState, setSwapState] = useState<SwapStateProps>({
    approved: false,
  });
  const [openedSwapModal, { open: openSwapModal, close: closeSwapModal }] =
    useDisclosure(false);
  const [
    openedSwapCompleteModal,
    { open: openSwapCompleteModal, close: closeSwapCompleteModal },
  ] = useDisclosure(false);
  const [
    openedSwapSettingModal,
    { open: openSwapSettingModal, close: closeSwapSettingModal },
  ] = useDisclosure(false);

  const handleSwap = (routeData: RouteData) => {
    setRouteData(routeData);
    setSwapState({ approved: false });
    openSwapModal();
  };
  const handleApprove = async () => {
    setSwapState({ ...swapState, loading: true });
    api.router
      .build(Chain.BASE, routeData!.routeSummary, address!, swapSlippage)
      .then((res) => {
        setSwapState({ ...swapState, loading: false });
        const data = res.data;
        if (data.message == RouterMessageType.Succussful) {
          setSwapState({ ...swapState, approved: true });
          setEncodedData(data.data as BuildData);
        } else {
          setSwapState({ ...swapState, approved: false });
          setEncodedData(undefined);
        }
      })
      .catch((err) => {
        console.log("err:", err);
        setSwapState({ ...swapState, approved: false, loading: false });
        setEncodedData(undefined);
      });
  };

  const handleConfirm = async () => {
    if (!encodedData) return;
    console.log("sign");
    console.log({
      to: routeData?.routerAddress,
      value: BigInt(encodedData.amountIn),
      data: encodedData.data,
    });

    sendTransaction({
      to: routeData?.routerAddress,
      value: BigInt(encodedData.amountIn),
      data: encodedData.data,
    });
  };
  useEffect(() => {
    setSwapState({
      ...swapState,
      pendingSwap: isPending,
      confirmingSwap: isConfirming,
      swapDone: isConfirmed,
    });
    if (isConfirmed) {
      closeSwapModal();
      openSwapCompleteModal();
    }
    console.log(swapState);
  }, [isPending, isConfirming, isConfirmed]);

  const handleDetails = () => {
    window.open(
      `https://basescan.org/tx/${hash}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  return (
    <>
      <SwapHome onSwap={handleSwap} onSetting={openSwapSettingModal} />
      {routeData && (
        <>
          <SwapModal
            routeData={routeData!}
            opened={openedSwapModal}
            onApprove={handleApprove}
            onConfirm={handleConfirm}
            onClose={closeSwapModal}
            swapState={swapState}
            setSwapState={setSwapState}
          />
          <SwapCompleteModal
            onDetails={handleDetails}
            opened={openedSwapCompleteModal}
            onClose={closeSwapCompleteModal}
            data={encodedData as BuildData}
            outputToken={routeData.outputToken}
          />
        </>
      )}
      <SwapSettingModal
        opened={openedSwapSettingModal}
        onClose={closeSwapSettingModal}
        setSwapSlippage={setSwapSlippage}
        swapSlippage={swapSlippage}
        setZapSlippage={setZapSlippage}
        zapSlippage={zapSlippage}
      />
    </>
  );
};
