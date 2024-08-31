import { useDisclosure } from "@mantine/hooks";
import React, { createContext, useContext, useState } from "react";
import { RouteData, BuildData } from "~/models";

interface SwapContextType {
  initialSwapState: SwapStateProps;
  swapState: SwapStateProps;
  setSwapState: React.Dispatch<React.SetStateAction<SwapStateProps>>;
  swapSlippage: number;
  setSwapSlippage: React.Dispatch<React.SetStateAction<number>>;
  zapSlippage: number;
  setZapSlippage: React.Dispatch<React.SetStateAction<number>>;
  routeData?: RouteData;
  setRouteData: React.Dispatch<React.SetStateAction<RouteData | undefined>>;
  encodedData?: BuildData;
  setEncodedData: React.Dispatch<React.SetStateAction<BuildData | undefined>>;
  openSwapModal: () => void;
  closeSwapModal: () => void;
  openedSwapModal: boolean;
}

const SwapContext = createContext<SwapContextType | undefined>(undefined);
export type SwapStateProps = {
  approved: boolean;
  permitted?: boolean;
  loading?: boolean;
  pendingSwap?: boolean;
  confirmingSwap?: boolean;
  swapDone?: boolean;
  swapError: boolean;
  buildErrorCode?: string;
};
const initialSwapState = {
  approved: false,
  permitted: false,
  loading: false,
  pendingSwap: false,
  confirmingSwap: false,
  swapDone: false,
  swapError: false,
  buildErrorCode: "",
};
export const SwapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [swapState, setSwapState] = useState<SwapStateProps>(initialSwapState);
  const [swapSlippage, setSwapSlippage] = useState<number>(1);
  const [zapSlippage, setZapSlippage] = useState<number>(2);
  const [routeData, setRouteData] = useState<RouteData>();
  const [encodedData, setEncodedData] = useState<BuildData>();
  const [openedSwapModal, { open: openSwapModal, close: closeSwapModal }] =
    useDisclosure(false);

  const value = {
    initialSwapState,
    swapState,
    setSwapState,
    swapSlippage,
    setSwapSlippage,
    zapSlippage,
    setZapSlippage,
    routeData,
    setRouteData,
    encodedData,
    setEncodedData,
    openSwapModal,
    closeSwapModal,
    openedSwapModal,
  };

  return <SwapContext.Provider value={value}>{children}</SwapContext.Provider>;
};

export const useSwapContext = (): SwapContextType => {
  const context = useContext(SwapContext);
  if (!context) {
    throw new Error("useSwapContext must be used within a SwapProvider");
  }
  return context;
};
