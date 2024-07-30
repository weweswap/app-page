"use client";

import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { PoolHome } from "./PoolHome";
import { PoolDetail } from "./PoolDetail";
import { PoolAddModal } from "./PoolAddModal";
import { PoolClaim } from "./PoolClaim";
import { PoolClaimModal } from "./PoolClaimModal";

export const Pool = () => {
  const [step, setStep] = useState(0);
  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [claimOpened, { open: openClaim, close: closeClaim }] =
    useDisclosure(false);

  const handleAdd = () => {
    closeAdd();
    setStep(2);
  };

  return (
    <>
      {step === 0 && <PoolHome onNext={() => setStep(1)} onAdd={openAdd} />}
      {step === 1 && <PoolDetail onBack={() => setStep(0)} onAdd={openAdd} />}
      {step === 2 && (
        <PoolClaim onBack={() => setStep(1)} onClaim={openClaim} />
      )}
      <PoolAddModal opened={addOpened} onClose={closeAdd} onAdd={handleAdd} />
      <PoolClaimModal opened={claimOpened} onClose={closeClaim} />
    </>
  );
};
