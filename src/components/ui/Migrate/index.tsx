"use client";

import { useEffect, useState } from "react";
import { MigrateDetail } from "./MigrateDetail";
import { MigrateHome } from "./MigrateHome";
import { MigrateDone } from "./MigrateDone";
import { useSafeTransfer } from "~/hooks/useMigrate";
import { useAccount } from "wagmi";

export const Migrate = () => {
  const [step, setStep] = useState(0);
  const { address } = useAccount();
  const { hash, isPending, isError, safeTransferFrom } = useSafeTransfer();
  const handleMigrate = (tokenId: bigint) => {
    safeTransferFrom(address!, tokenId);
  };
  return (
    <>
      {step === 0 && <MigrateHome onMigrate={(tokenId: bigint) => handleMigrate(tokenId)} />}
      {/* {step === 1 && (
        <MigrateDetail
          onBack={() => setStep(0)}
          onMigrate={}
        />
      )} */}
      {step === 2 && <MigrateDone onNext={() => setStep(0)} />}
    </>
  );
};
