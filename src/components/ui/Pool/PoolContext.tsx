import { useDisclosure } from "@mantine/hooks";
import React, { createContext, useContext, useState } from "react";
import { RouteData, BuildData } from "~/models";

interface PoolContextType {}

const PoolContext = createContext<PoolContextType | undefined>(undefined);
export type PoolStateProps = {};
const initialSwapState = {};
export const PoolProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedPool, setSelectedPool] = useState<any>();
  const value = {
    selectedPool,
    setSelectedPool,
  };

  return <PoolContext.Provider value={value}>{children}</PoolContext.Provider>;
};

export const useSwapContext = (): PoolContextType => {
  const context = useContext(PoolContext);
  if (!context) {
    throw new Error("useSwapContext must be used within a SwapProvider");
  }
  return context;
};
