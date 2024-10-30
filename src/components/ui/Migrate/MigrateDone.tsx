"use client";

import Image from "next/image";
import { Divider } from "@mantine/core";
import { Button, Typography } from "~/components/common";

type MigrateDoneProps = {
  onNext: () => void;
};

export const MigrateDone = (_props: MigrateDoneProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <Typography secondary size="xxxl" tt="uppercase" className="text_turq">
        Nice!!!
      </Typography>
      <Image
        src="/img/nice.png"
        width={300}
        height={300}
        className="max-w-full"
        alt=""
      />
      <div className="flex w-[30rem] flex-col items-center">
        <div className="flex w-full flex-col items-center gap-7">
          <Image src="/img/icons/success.svg" width={80} height={80} alt="" />
          <Typography size="md" secondary className="text-center">
            SUCCESSFULLY MIGRATED
          </Typography>

          <Divider className="w-full border-blue-700" />
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Image src="/img/icons/memes.svg" width={20} height={20} alt="" />
              <Typography size="xs" className="translate-x-1">
                MEMES: 1%
              </Typography>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex items-center">
                <Image
                  src="/img/icons/Infinity.svg"
                  className="translate-x-[5px]"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <Typography size="xs" className="translate-x-1">
                INFINITY
              </Typography>
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-3">
            <Typography secondary size="sm">
              AMOUNT
            </Typography>
            <div className="flex flex-col gap-2 text-right">
              <Typography>$34.54</Typography>
              <div className="flex items-center gap-2">
                <Typography className="text_light_gray" size="xs">
                  0.0000001231231 SHARES
                </Typography>
                <div className="flex items-center">
                  <Image
                    className="min-h-6 min-w-6"
                    src="/img/tokens/wewe.svg"
                    alt=""
                    width={32}
                    height={32}
                  />
                  <Image
                    className="ml-[-10px] min-h-6 min-w-6"
                    src="/img/tokens/usdc.png"
                    alt=""
                    width={32}
                    height={32}
                  />
                </div>
              </div>
            </div>
          </div>
          <Typography className="mb-3 flex w-full justify-end" size="xs">
            Total fee cost: $ 0.10
          </Typography>
        </div>
        <div className="flex w-full flex-col gap-4">
          <Button className="w-full">
            <Typography secondary size="xs" fw={700} tt="uppercase">
              COMPLETED
            </Typography>
          </Button>
          <button className="custom_btn w-full md:w-auto">
            <Typography secondary size="xs" fw={700} tt="uppercase">
              VIEW DETAILS
            </Typography>
          </button>
        </div>
      </div>
    </div>
  );
};
