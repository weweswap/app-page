"use client";

import { Divider, Text } from "@mantine/core";
import Image from "next/image";
import { Button, Card } from "~/components/common";

export const EarnHome = () => {
  return (
    <>
      <Card className="flex flex-col gap-10">
        <div>
          <Text size="xxl" fw={700} className="uppercase">
            Your Rewards
          </Text>
          <Text size="xs" className="verdana pt-3">
            View and claim your token rewards.
          </Text>
        </div>

        <div>
          <Text size="xs" className="verdana">
            Total CHAOS Earned
          </Text>
          <Text size="lg" fw={700} className="verdana pt-4">
            1200 CHAOS
          </Text>
        </div>

        <div className="border_violet p-4 flex flex-col gap-6">
          <Text size="xs">Claim CHAOS</Text>
          <Divider className="border-blue-700" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <Text size="sm">Claim CHAOS</Text>
            <Button className="w-full sm:w-auto">
              <Text size="xs" fw={700}>
                Claim CHAOS
              </Text>
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <Text size="sm" className="verdana pb-5">
          Payout History
        </Text>

        <div>
          {new Array(4).fill(0).map((_, key) => (
            <div
              className={`flex items-center justify-between gap-3 py-5 border-t ${
                key === 0 ? "border-blue-700" : "border-blue-900"
              }`}
            >
              <div className="flex items-center gap-4">
                <button className="w-9 h-9 bg_turq flex items-center justify-center">
                  <Image
                    src="/img/icons/download.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                </button>
                <div>
                  <Text size="xs">Payout</Text>
                  <Text size="xs" className="verdana pt-3">
                    Sun Jun 19 2024
                  </Text>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg_turq opacity-20" />
                <Text size="sm">500 CHAOS</Text>
              </div>
            </div>
          ))}
        </div>

        <button>
          <Text size="xs" className="verdana opacity-50">
            View More
          </Text>
        </button>
      </Card>
    </>
  );
};
