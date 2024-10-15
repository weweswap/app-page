import { Card } from "@mantine/core"
import { Button, Typography } from "~/components/common"
import { LoadingScreen } from "~/components/common/LoadingScreen";
import * as dn from "dnum";
import dayjs from "dayjs";

interface GoodleClaimFormProps {
  lockedAmount: bigint;
  lockedUntil: bigint;
  isLoading: boolean;
}

export const GoodleClaimForm = ({ lockedAmount, lockedUntil, isLoading }: GoodleClaimFormProps) => {

  const remainingDays = dayjs.unix(Number(lockedUntil)).diff(dayjs(), "day");

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  if (lockedAmount === 0n) {
    return (
      <Typography secondary className='text-center py-10 font-bold' size='sm'>
        Claim your $WEWE 7 days after merging!
      </Typography>
    )
  }

  return (
    <div className="flex flex-col my-5 text-center">
      <Typography
        size="sm"
        secondary
        className="font-black text-yellow mb-5">
        YOUR REWARDS
      </Typography>

      <Typography
        size="sm"
        secondary
        className="font-black text-yellow">
        COUNTDOWN
      </Typography>

      <Typography
        size="sm"
        secondary
        className="font-black my-10">
        {remainingDays < 0 ? 0 : remainingDays} DAYS
      </Typography>


      <div className="flex flex-col justify-center">
        <Typography
          size="sm"
          secondary
          className="font-black text-yellow mb-5">
          AVAILABLE $WEWE:
        </Typography>

        <Typography
          size="sm"
          secondary
          className="font-black">
          {dn.format([lockedAmount, 18], { locale: "en", digits: 2 })}
        </Typography>

        <Button
          className="flex items-center justify-center gap-3 mt-5"
          disabled={Number(lockedUntil) > Date.now() / 1000}
        >
          <Typography secondary size="sm" fw={700} tt="uppercase">
            CLAIM
          </Typography>
        </Button>
      </div>
    </div>
  )
}