"use client";

import { Text } from "@mantine/core";
import Image from "next/image";

type MigrateDoneProps = {
  onNext: () => void;
};

export const MigrateDone = ({ onNext }: MigrateDoneProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Text size="xxxl" className="uppercase">
        Nice!!!
      </Text>
      <Image src="/img/nice.png" width={400} height={400} alt="" />
      <button className="w-[400px] bg-blue-800 px-8 py-2" onClick={onNext}>
        <Text size="md" className="text-white">
          View Pool
        </Text>
      </button>
    </div>
  );
};
