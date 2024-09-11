"use client";

import { useEffect, useState } from "react";
import { MigrateDetail } from "./MigrateDetail";
import { MigrateHome } from "./MigrateHome";
import { MigrateDone } from "./MigrateDone";
import { useSafeTransfer } from "~/hooks/useMigrate";
import { useAccount } from "wagmi";

export const Migrate = () => {
  const [step, setStep] = useState(0);
  return (
    <>
      {step === 0 && <MigrateHome />}
      {step === 1 && <MigrateDetail onBack={() => setStep(0)} />}
      {step === 2 && <MigrateDone onNext={() => setStep(0)} />}
    </>
  );
};
