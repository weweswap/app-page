"use client";

import { Text } from "@mantine/core";
import Image from "next/image";
import { Button, Card } from "~/components/common";

export const MergeHome = () => {
  return (
    <>
      <Card>
        <Text size="xl" className="uppercase">
          MERGE YOUR COINS
        </Text>
        <Text size="sm" className="verdana uppercase pt-4">
          Forever merge your coins
        </Text>
      </Card>

      <Card className="flex flex-col gap-5">
        <div className="bg-gray-900 flex items-center justify-between gap-3 p-4">
          <div className="flex-1 flex items-center gap-3">
            <Image src="/img/tokens/wewe.png" width={32} height={32} alt="" />
            <Text size="md">WEWE</Text>
          </div>
          <Image
            src="/img/icons/arrow_right.svg"
            width={16}
            height={16}
            alt=""
          />
          <div className="flex-1 flex items-center justify-end gap-3">
            <Image src="/img/tokens/vult.svg" width={32} height={32} alt="" />
            <Text size="md">VULT</Text>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/img/tokens/wewe.png" width={24} height={24} alt="" />
              <Text size="md" className="verdana">
                WEWE
              </Text>
            </div>
            <div className="flex items-center gap-3 pt-3">
              <Text size="xs" className="verdana">
                1,616,522 WEWE
              </Text>
              <Image
                src="/img/icons/arrow_right1.svg"
                width={19}
                height={9}
                alt=""
              />
              <Text size="xs" className="verdana">
                Max: 1,650.52 VULT
              </Text>
            </div>
          </div>

          <Button>
            <Text size="sm" fw={700}>
              Merge
            </Text>
          </Button>
        </div>
      </Card>

      <Card>
        <Text size="lg" className="verdana">
          MERGE your WEWE into VULT
        </Text>

        <ul className="list-decimal list-inside pt-3 verdana text-sm">
          <li>
            Click MERGE to burn your $WEWE and get $VULT
          </li>
          <li>
            This is a way to get $VULT before anyone else
          </li>
          <li>
            Starting price is 1,000 $WEWE to 1 $VULT, but this will rise with conversions
          </li>
          <li>
            Burning your $WEWE earlier = get more $VULT
          </li>
          <li>
            Your $VULT will be locked until the public launch is live
          </li>
        </ul>
      </Card>
    </>
  );
};
