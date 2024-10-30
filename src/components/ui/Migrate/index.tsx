"use client";

import { useState } from "react";
import { Position } from "~/models";

import { MigrateDetail } from "./MigrateDetail";
import { MigrateHome } from "./MigrateHome";

export const Migrate = () => {
  const [step, setStep] = useState(0);
  const [currentPoisiton, setCurrentPosition] = useState<Position>();
  const handleSelectPosition = (position: Position) => {
    setCurrentPosition(position);
    setStep(1);
  };
  return (
    <>
      {step === 0 && (
        <MigrateHome
          onSelectPosition={(position: Position) =>
            handleSelectPosition(position)
          }
        />
      )}
      {currentPoisiton && step === 1 && (
        <MigrateDetail onBack={() => setStep(0)} position={currentPoisiton} />
      )}
    </>
  );
};
