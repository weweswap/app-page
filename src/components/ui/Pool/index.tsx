"use client";

import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { PoolHome } from "./PoolHome";
import { PoolDetail } from "./PoolDetail";
import { PoolAddModal } from "./PoolAddModal";
import { PoolClaim } from "./PoolClaim";
import { PoolClaimModal } from "./PoolClaimModal";
import { PoolZapModal } from "./PoolZapModal";
import PoolZapIn from "./PoolZapIn";
import SuccessModal from "./SuccessModal";
import PoolCreate from "./PoolCreate";
import PoolsManage from "./PoolsManage";

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
      {step === 0 && <PoolHome onManage={() => setStep(5)}  onZap={handleZapModal} onNext={() => setStep(1)} onAdd={openAdd} />}
      {step === 1 && <PoolDetail onBack={() => setStep(0)} onAdd={() => setStep(3)} onZapIn={() => setStep(2)} />}
      {step === 2 && ( <PoolZapIn onBack={() => setStep(1)} onZap={handleZapModal} />)}
      {step === 3 && ( <PoolCreate onBack={() => setStep(1)} onNext={handleAdd} /> )}
      {step === 4 && (<SuccessModal onConfirm={handleAdd} />)}
      {step === 5 && (<PoolsManage onBack={() => setStep(0)}/>)}

      {/* <PoolClaim onBack={() => setStep(1)} onClaim={openClaim} /> */}
      {/* <PoolAddModal opened={addOpened} onClose={closeAdd} onAdd={handleAdd} /> */}
      {/* <PoolClaimModal opened={claimOpened} onClose={closeClaim} /> */}
      <PoolZapModal onConfirm={() => setStep(4)} opened={openedZapModal} onOpen={handleZapModal} onClose={closeZapModal} />
      
    </>
  );
};
