"use client"

import Image from "next/image";
import { Button, Typography } from "~/components/common";

type MigrateDoneProps = {
  onNext: () => void;
};

export const MigrateDone = ({ onNext }: MigrateDoneProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6">
      <Typography secondary size="xxxl" tt="uppercase">
        Nice!!!
      </Typography>
      <Image
        src="/img/nice.png"
        width={400}
        height={400}
        className="max-w-full"
        alt=""
      />
      <Button className="w-[400px] max-w-full" onClick={onNext}>
        <Typography secondary size="md" fw={700} className="text-white">
          View Pool
        </Typography>
      </Button>
    </div>
  );
};
