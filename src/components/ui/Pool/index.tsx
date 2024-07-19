"use client";

import { useState } from "react";
import { PoolHome } from "./PoolHome";
import { PoolDetail } from "./PoolDetail";

export const Pool = () => {
  const [step, setStep] = useState(0);

  return (
    <>
      {step === 0 && <PoolHome onNext={() => setStep(1)} />}
      {step === 1 && <PoolDetail onBack={() => setStep(0)} />}
    </>
  );
};
