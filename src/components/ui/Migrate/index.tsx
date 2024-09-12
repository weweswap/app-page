"use client";

import { useEffect, useState } from "react";
import { MigrateDetail } from "./MigrateDetail";
import { MigrateHome } from "./MigrateHome";
import { MigrateDone } from "./MigrateDone";
import { useSafeTransfer } from "~/hooks/useMigrate";
import { useAccount } from "wagmi";
import { Position } from "~/models";
import { useDisclosure } from "@mantine/hooks";
import { MigrateCompleteModal } from "./MigrateCompleteModal";

export const Migrate = () => {
  const [step, setStep] = useState(0);
  const { address } = useAccount();
  const [currentPoisiton, setCurrentPosition] = useState<Position>();
  const [
    openedMigrateCompleteModal,
    { open: openMigrateCompleteModal, close: closeMigrateCompleteModal },
  ] = useDisclosure(false);



  const handleSelectPosition = (position: Position) => {
    setCurrentPosition(position);
    setStep(1);
  };


  return (
    <>
      {step === 0 && (
        <MigrateHome
          onSelectPosition={(position: Position) =>
            handleSelectPosition(position)
          }
        />
      )}
      {currentPoisiton && step === 1 && (
        <MigrateDetail onBack={() => setStep(0)} position={currentPoisiton} />
      )}
    </>
  );
};
