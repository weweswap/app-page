"use client";

import { useDisclosure } from "@mantine/hooks";
import { SwapHome } from "./SwapHome";
import { SwapModal } from "./SwapModal";
import { SwapCompleteModal } from "./SwapCompleteModal";
import { SwapSettingModal } from "./SwapSettingModal";
import { useState } from "react";
import { RouteData, RouterMessageType, RouteSummary } from "~/models";
import { useAccount } from "wagmi";
import api from "~/api/swap";
import { Chain } from "~/constants";
export type SwapStateProps = {
  approved: boolean;
  loading?: boolean;
};

export const Swap = () => {
  const { address } = useAccount();
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
    openSwapModal();
  };
  const handleApprove = () => {
    setSwapState({ ...swapState, loading: true });
    api.router
      .build(Chain.BASE, routeData!.routeSummary, address!, swapSlippage)
      .then((res) => {
        setSwapState({ ...swapState, loading: false });
        const data = res.data;
        if (data.message == RouterMessageType.Succussful) {
          setSwapState({ ...swapState, approved: true });
        }
      })
      .catch((err) => {
        console.log("err:", err);
        setSwapState({ ...swapState, approved: false, loading: false });
      });
  };
  const handleConfirm = () => {};
  const [swapSlippage, setSwapSlippage] = useState<number>(1);
  const [zapSlippage, setZapSlippage] = useState<number>(1);
  const [routeData, setRouteData] = useState<RouteData>();
  const [swapState, setSwapState] = useState<SwapStateProps>({
    approved: false,
  });
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
            opened={openedSwapCompleteModal}
            onClose={closeSwapCompleteModal}
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
