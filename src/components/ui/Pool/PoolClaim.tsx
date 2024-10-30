import Image from "next/image";
import { Divider } from "@mantine/core";
import { Button, Card, Typography } from "~/components/common";

type PoolClaimProps = {
  onBack: () => void;
  onClaim: () => void;
};

export const PoolClaim = ({ onBack, onClaim }: PoolClaimProps) => {
  return (
    <>
      <Card>
        <button onClick={onBack} className="flex items-center gap-3">
          <Typography secondary size="xl">
            {"<"}
          </Typography>
          <Image src="/img/tokens/wewe.png" width={24} height={24} alt="" />
          <Typography secondary size="xl">
            WEWE
          </Typography>
        </button>
      </Card>

      <Card className="flex justify-between gap-3">
        <div>
          <Typography secondary size="sm">
            LP Value
          </Typography>
          <Typography secondary size="lg" fw={700} className="pt-5">
            $2,000.00
          </Typography>
        </div>
        <div>
          <Typography secondary size="sm">
            Generated Fees
          </Typography>
          <Typography secondary size="lg" fw={700} className="pt-5">
            $260.56
          </Typography>
        </div>
      </Card>

      <div className="border_violet translate-none flex w-full flex-col gap-6 p-4 sm:w-auto lg:translate-x-[50%]">
        <Typography secondary size="xs">
          Claim USDC
        </Typography>
        <Divider className="border-blue-700" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Typography secondary size="sm">
            1200 USDC
          </Typography>
          <Button className="w-full sm:w-auto" onClick={onClaim}>
            <Typography secondary size="xs" fw={700}>
              Claim USDC
            </Typography>
          </Button>
        </div>
      </div>
    </>
  );
};
