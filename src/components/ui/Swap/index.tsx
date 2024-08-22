"use client";

import { useDisclosure } from "@mantine/hooks";
import { SwapHome } from "./SwapHome";
import { SwapModal } from "./SwapModal";
import { SwapCompleteModal } from "./SwapCompleteModal";
import { SwapSettingModal } from "./SwapSettingModal";
import { useState } from "react";

export type SwapStateProps = {
  approved: boolean;
};

export const Swap = () => {
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
  const handleSwap = () => {
    closeSwapModal();
    openSwapCompleteModal();
  };

  const [swapSlippage, setSwapSlippage] = useState<number>(10);
  const [zapSlippage, setZapSlippage] = useState<number>(10);
  const [swapState, setSwapState] = useState<SwapStateProps>({
    approved: false,
  });
  return (
    <>
      <SwapHome onSwap={openSwapModal} onSetting={openSwapSettingModal} />
      <SwapModal
        opened={openedSwapModal}
        onClose={closeSwapModal}
        onSwap={handleSwap}
        swapState={swapState}
        setSwapState={setSwapState}
      />
      <SwapCompleteModal
        opened={openedSwapCompleteModal}
        onClose={closeSwapCompleteModal}
      />
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
