"use client";

import { useState } from "react";
import { PoolHome } from "./PoolHome";

export const Pool = () => {
  const [step, setStep] = useState(0);

  return <>{step === 0 && <PoolHome onNext={() => setStep(1)} />}</>;
};
