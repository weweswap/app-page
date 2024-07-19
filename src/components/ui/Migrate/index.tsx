"use client";

import { useState } from "react";
import { MigrateDetail } from "./MigrateDetail";
import { MigrateHome } from "./MigrateHome";
import { MigrateDone } from "./MigrateDone";

export const Migrate = () => {
  const [step, setStep] = useState(0);

  return (
    <>
      {step === 0 && <MigrateHome onMigrate={() => setStep(1)} />}
      {step === 1 && (
        <MigrateDetail onBack={() => setStep(0)} onMigrate={() => setStep(2)} />
      )}
      {step === 2 && <MigrateDone onNext={() => setStep(0)} />}
    </>
  );
};
