import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { SwapHome } from "./SwapHome";
import { SwapModal } from "./SwapModal";
import { SwapCompleteModal } from "./SwapCompleteModal";
import { SwapSettingModal } from "./SwapSettingModal";
import { useSwapContext } from "./SwapContext";
import { Hash } from "viem";
import { FailTXModal } from "~/components/common/FailTXModal";


export const Swap: React.FC = () => {
  const {
    swapState,
    setSwapState,
    routeData,
    encodedData,
    closeSwapModal,
    openedSwapModal,
  } = useSwapContext();

  const [
    openedSwapCompleteModal,
    { open: openSwapCompleteModal, close: closeSwapCompleteModal },
  ] = useDisclosure(false);
  const [
    openedSwapSettingModal,
    { open: openSwapSettingModal, close: closeSwapSettingModal },
  ] = useDisclosure(false);
  const [
    openedSwapFailModal,
    { open: openSwapFailModal, close: closeSwapFailModal },
  ] = useDisclosure(false);

  const [hash, setHash] = useState<Hash>();

  return (
    <>
      <SwapHome onSetting={openSwapSettingModal} />
      {routeData && (
        <SwapModal
          opened={openedSwapModal}
          onClose={closeSwapModal}
          openSwapComplete={openSwapCompleteModal}
          openSwapFail={openSwapFailModal}
          setHash={setHash}
        />
      )}
      {swapState.swapDone && encodedData && routeData && (
        <SwapCompleteModal
          opened={openedSwapCompleteModal}
          onClose={closeSwapCompleteModal}
          hash={hash!}
        />
      )}
      {swapState.swapError && encodedData && routeData && (
        <FailTXModal
          opened={openedSwapFailModal}
          onClose={closeSwapFailModal}
          hash={hash!}
        />
      )}
      <SwapSettingModal
        opened={openedSwapSettingModal}
        onClose={closeSwapSettingModal}
      />
    </>
  );
};
