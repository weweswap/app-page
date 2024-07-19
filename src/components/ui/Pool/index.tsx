"use client";

import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { PoolHome } from "./PoolHome";
import { PoolDetail } from "./PoolDetail";
import { PoolAddModal } from "./PoolAddModal";

export const Pool = () => {
  const [step, setStep] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {step === 0 && <PoolHome onNext={() => setStep(1)} onAdd={open} />}
      {step === 1 && <PoolDetail onBack={() => setStep(0)} onAdd={open} />}
      <PoolAddModal opened={opened} onClose={close} />
    </>
  );
};
