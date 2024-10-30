import React, { createContext, useContext, useState } from "react";
import { WewePool } from "~/hooks/usePool";
import { WewePosition } from "~/hooks/useWewePositions";

interface PoolContextType {
  selectedPool?: WewePool;
  setSelectedPool: React.Dispatch<React.SetStateAction<WewePool | undefined>>;
  selectedPosition?: WewePosition;
  setSelectedPosition: React.Dispatch<
    React.SetStateAction<WewePosition | undefined>
  >;
}

const PoolContext = createContext<PoolContextType | undefined>(undefined);

export const PoolProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedPool, setSelectedPool] = useState<WewePool>();
  const [selectedPosition, setSelectedPosition] = useState<WewePosition>();
  const value = {
    selectedPool,
    setSelectedPool,
    selectedPosition,
    setSelectedPosition,
  };

  return <PoolContext.Provider value={value}>{children}</PoolContext.Provider>;
};

export const usePoolContext = (): PoolContextType => {
  const context = useContext(PoolContext);
  if (!context) {
    throw new Error("usePoolContext must be used within a PoolProvider");
  }
  return context;
};
