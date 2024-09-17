"use client";

import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { PoolHome } from "./PoolHome";
import { PoolAddModal } from "./PoolAddModal";
import { PoolClaim } from "./PoolClaim";
import { PoolClaimModal } from "./PoolClaimModal";
import { PoolZapModal } from "./PoolZapModal";
import PoolZapIn from "./PoolZapIn";
import SuccessModal from "./SuccessModal";
import PoolCreate from "./PoolCreate";
import PoolsManage from "./PoolsManage";
import { PoolZapOutModal } from "./PoolZapOutModal";
import ApproveTokens from "./ApproveTokens";
import SettingsModal from "./SettingsModal";
import ClaimedFeesModal from "./ClaimFeesModal";
import ClaimSuccessModal from "./ClaimSuccessModal";

export const Pool = () => {
  const [step, setStep] = useState(0);
  const [openedZapModal, {open: openZapModal, close: closeZapModal}] = useDisclosure(false)
  const [openedZapOutModal, {open: openZapOutModal, close: closeZapOutModal}] = useDisclosure(false)
  const [openedApproveModal, {open: openApproveModal, close: closeApproveModal}] = useDisclosure(false)
  const [openedSuccessModal, {open: openSuccessModal, close: closeSuccessModal}] = useDisclosure(false)
  const [openedSettingsModal, {open: openSettingsModal, close: closeSettingsModal}] = useDisclosure(false)
  const [openedClaimFeesModal, {open: openClaimFeesModal, close: closeClaimFeesModal}] = useDisclosure(false)
  const [openedClaimSuccessModal, {open: openClaimSuccessModal, close: closeClaimSuccessModal}] = useDisclosure(false)
  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);

    useDisclosure(false);

  const handleAdd = () => {
    closeAdd();
    setStep(step+1);
  };


  const handleZapModal = () => {
    openZapModal()
  }

  const handleZapOutModal = () => {
    openZapOutModal()
  }

  const handleApproveTokenModal = () => {
    closeZapModal()
    openApproveModal()
  }

  const handleSuccessModal = () => {
    closeApproveModal()
    openSuccessModal()
  } 

  const handleSettingsModal = () => {
    openSettingsModal()
  }

  const handleClaimFeesModal = () => {
    openClaimFeesModal()
  }

  const handleClaimSuccessModal = () => {
    closeClaimFeesModal()
    openClaimSuccessModal()
  }


  return (
    <>
      {step === 0 && <PoolHome onClaim={handleClaimFeesModal} onZapOut={handleZapOutModal} onDeposit={handleZapModal} onManage={() => setStep(5)} onNext={() => setStep(1)} onAdd={openAdd} />}
      {step === 1 && <PoolCreate onBack={() => setStep(0)} onNext={handleAdd} />}
      {/* {step === 2 && ( <PoolZapIn onBack={() => setStep(1)} onZap={handleZapModal} />)} */}
      {/* {step === 4 && (<SuccessModal onConfirm={handleAdd} />)} */}

      <PoolZapModal onSettings={handleSettingsModal} onConfirm={handleApproveTokenModal} opened={openedZapModal} onOpen={handleZapModal} onClose={closeZapModal} />
      <PoolZapOutModal onConfirm={() => setStep(4)} opened={openedZapOutModal} onOpen={handleZapOutModal} onClose={closeZapOutModal} />
      <ApproveTokens onCreate={handleSuccessModal} opened={openedApproveModal} onOpen={handleApproveTokenModal} onClose={closeApproveModal} />
      <SuccessModal onConfirm={closeSuccessModal} opened={openedSuccessModal} onOpen={handleSuccessModal} onClose={closeSuccessModal}/>
      <SettingsModal onOpen={handleSettingsModal} opened={openedSettingsModal} onClose={closeSettingsModal} />
      <ClaimedFeesModal onClaim={handleClaimSuccessModal} onOpen={handleClaimFeesModal} opened={openedClaimFeesModal} onClose={closeClaimFeesModal} />
      <ClaimSuccessModal onOpen={handleClaimSuccessModal} opened={openedClaimSuccessModal} onClose={closeClaimSuccessModal} />
    </>
  );
};
