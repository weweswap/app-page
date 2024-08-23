"use client";

import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { PoolHome } from "./PoolHome";
import { PoolDetail } from "./PoolDetail";
import { PoolAddModal } from "./PoolAddModal";
import { PoolClaim } from "./PoolClaim";
import { PoolClaimModal } from "./PoolClaimModal";
import { PoolZapModal } from "./PoolZapModal";
import NewPoolAdd from "./NewPoolAdd";
import SuccessModal from "./SuccessModal";

export const Pool = () => {
  const [step, setStep] = useState(0);
  const [openedZapModal, {open: openZapModal, close: closeZapModal}] = useDisclosure(false)
  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [claimOpened, { open: openClaim, close: closeClaim }] =
    useDisclosure(false);

  const handleAdd = () => {
    closeAdd();
    setStep(step+1);
  };


  const handleZapModal = () => {
    openZapModal()
  }


  return (
    <>
      {step === 0 && <PoolHome onZap={handleZapModal} onNext={() => setStep(1)} onAdd={openAdd} />}
      {step === 1 && <PoolDetail onBack={() => setStep(0)} onAdd={handleAdd} />}
      {step === 2 && ( <NewPoolAdd onZap={handleZapModal} />)}
      {step === 3 && (<SuccessModal onConfirm={handleAdd} />)}

      {/* <PoolClaim onBack={() => setStep(1)} onClaim={openClaim} /> */}
      {/* <PoolAddModal opened={addOpened} onClose={closeAdd} onAdd={handleAdd} /> */}
      {/* <PoolClaimModal opened={claimOpened} onClose={closeClaim} /> */}
      <PoolZapModal onConfirm={handleAdd} opened={openedZapModal} onOpen={handleZapModal} onClose={closeZapModal} />
    </>
  );
};
