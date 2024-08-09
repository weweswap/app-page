import Image from "next/image";
import { Button, Card, Typography } from "~/components/common";

export const MergeHome = () => {
  return (
    <>
      <Card>
        <div className="md:flex items-center justify-between gap-3 text-center md:text-start  ">
          <Typography secondary size="xl" tt="uppercase">
            MERGE NOW
          </Typography>
          <Typography secondary size="xl">
            🔥 🔥 🔥
          </Typography>
        </div>
        <Typography
          size="sm"
          tt="uppercase"
          className="pt-4 text-center md:text-start"
        >
          Forever merge your coins
        </Typography>
      </Card>

      <Card className="flex flex-col gap-5">
        <div className="bg-gray-900 flex items-center justify-between gap-3 p-4">
          <div className="flex-1 flex items-center gap-3">
            <Image src="/img/tokens/wewe.png" width={32} height={32} alt="" />
            <Typography secondary size="md">
              WEWE
            </Typography>
          </div>
          <Image
            src="/img/icons/arrow_right.svg"
            width={16}
            height={16}
            alt=""
          />
          <div className="flex-1 flex items-center justify-end gap-3">
            <Image src="/img/tokens/vult.svg" width={32} height={32} alt="" />
            <Typography secondary size="md">
              VULT
            </Typography>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/img/tokens/wewe.png" width={24} height={24} alt="" />
              <Typography size="md">WEWE</Typography>
            </div>
            <div className="flex items-center gap-3 pt-3">
              <Typography size="xs">1,616,522 WEWE</Typography>
              <Image
                src="/img/icons/arrow_right1.svg"
                width={19}
                height={9}
                alt=""
              />
              <Typography size="xs">Max: 1,650.52 VULT</Typography>
            </div>
          </div>

          <Button className="w-full sm:w-auto">
            <Typography secondary size="sm" fw={700} tt="uppercase">
              Merge
            </Typography>
          </Button>
        </div>
      </Card>

      <Card>
        <Typography size="lg">MERGE your WEWE into VULT</Typography>

        <ul className="list-decimal list-inside pt-3 text-sm">
          <li>Click MERGE to burn your $WEWE and receive $VULT</li>
          <li>Starting price is 1,000 $WEWE to 1 $VULT, but this will rise</li>
          <li>Your $VULT will be locked until the public launch</li>
        </ul>
      </Card>
    </>
  );
};
