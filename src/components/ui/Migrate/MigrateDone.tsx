"use client";

import { Text } from "@mantine/core";
import Image from "next/image";
import { Button } from "~/components/common";

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
      <Button className="w-[400px]" onClick={onNext}>
        <Text size="md" fw={700} className="text-white">
          View Pool
        </Text>
      </Button>
    </div>
  );
};
