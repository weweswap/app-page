import Image from "next/image";
import { Divider } from "@mantine/core";
import { Button, Card, Typography } from "~/components/common";

export const EarnHome = () => {
  return (
    <>
      <Card className="flex flex-col gap-10">
        <div>
          <Typography secondary size="xxl" fw={700} tt="uppercase">
            Your Rewards
          </Typography>
          <Typography size="xs" className="pt-3">
            View and claim your token rewards.
          </Typography>
        </div>

        <div>
          <Typography size="xs">Total CHAOS Earned</Typography>
          <Typography size="lg" fw={700} className="pt-4">
            1200 CHAOS
          </Typography>
        </div>

        <div className="border_violet flex flex-col gap-6 p-4">
          <Typography secondary size="xs">
            Claim CHAOS
          </Typography>
          <Divider className="border-blue-700" />
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <Typography secondary size="sm">
              Claim CHAOS
            </Typography>
            <Button className="w-full sm:w-auto">
              <Typography secondary size="xs" fw={700}>
                Claim CHAOS
              </Typography>
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <Typography size="sm" className="pb-5">
          Payout History
        </Typography>

        <div>
          {new Array(4).fill(0).map((_, key) => (
            <div
              key={key}
              className={`flex items-center justify-between gap-3 border-t py-5 ${
                key === 0 ? "border-blue-700" : "border-blue-900"
              }`}
            >
              <div className="flex items-center gap-4">
                <button className="bg_turq flex size-9 items-center justify-center">
                  <Image
                    src="/img/icons/download.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                </button>
                <div>
                  <Typography secondary size="xs">
                    Payout
                  </Typography>
                  <Typography size="xs" className="pt-3">
                    Sun Jun 19 2024
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg_turq size-9 rounded-full opacity-20" />
                <Typography secondary size="sm">
                  500 CHAOS
                </Typography>
              </div>
            </div>
          ))}
        </div>

        <button>
          <Typography size="xs" opacity={0.5}>
            View More
          </Typography>
        </button>
      </Card>
    </>
  );
};
