import React, { createContext, useContext, useState } from "react";
import { WewePool } from "~/hooks/usePool";

interface PoolContextType {
  selectedPool?: WewePool;
  setSelectedPool: React.Dispatch<React.SetStateAction<WewePool | undefined>>;
}

const PoolContext = createContext<PoolContextType | undefined>(undefined);
export type PoolStateProps = {};
export const PoolProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedPool, setSelectedPool] = useState<WewePool>();
  const value = {
    selectedPool,
    setSelectedPool,
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
