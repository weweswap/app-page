
"use client"

import Image from "next/image";
import { useState } from "react";
import { Button, Card, Typography } from "~/components/common";

type MigrateDetailProps = {
  onBack: () => void;
  onMigrate: () => void;
};

export const MigrateDetail = ({ onBack, onMigrate }: MigrateDetailProps) => {
  const [migrateRange, setMigrateRange] = useState<number>(0);

  return (
    <>
      <Card className="flex flex-col gap-6 p-5">
        <div>
          <button onClick={onBack} className="w-full text-start">
            <div
              className="flex items-center justify-between gap-3 lg:flex-nowrap flex-wrap">
              <Typography secondary
              size="md"
              tt="uppercase">MIGRATE UNISWAP LIQUIDITY</Typography>
              <div className="flex items-center gap-3">
                <Button disabled>
                  <Typography secondary size="xs" fw={700}>
                    INCENTIVIZE
                  </Typography>
                </Button>
                <Button disabled>
                  <Typography secondary size="xs" fw={700}>
                    MIGRATE
                  </Typography>
                </Button>
              </div>
            </div>
          </button>
          <Typography size="xs" className="mt-3">
            All WEWESWAP pools are paired in USDC - this means easy to collect <br />
            and earn fees.
            This migration will move your liquidity over.
          </Typography>
        </div>
      </Card>
      <div className="py-2 w-full">UNISWAP MIGRATION STATUS</div>
      <Card>
        <div className="flex items-center justify-between">
          <Typography size="lg">VALUE</Typography>
          <div className="flex items-center gap-2">
            <Image
              src="/img/icons/settings.svg"
              width={24}
              height={24}
              alt=""
            />
          </div>
        </div>
        <div className="flex items-center justify-between py-3">
          <Typography size="sm" className="font-bold">
            100%
          </Typography>
          
          <div className="flex items-center gap-2 font-extrabold text-black text-sm">
          <Typography className="text-white">$34.56</Typography>
            <button className="bg-[#33E6BF]  px-3 py-2">50%</button>
            <button className="bg-[#33E6BF] px-3 py-2">MAX</button>
          </div>
        </div>
        <div className="pb-3">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-full h-2 bg-[#33E6BF] rounded-lg appearance-none cursor-pointer "
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg_light_dark flex items-center justify-between gap-3 p-4">
            <div className="flex-1 flex items-center gap-3">
              <Image src="/img/tokens/wewe.png" width={32} height={32} alt="" />
              <Typography secondary size="xs">
                WEWE/WETH
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
              <Typography secondary size="xs">
                WEWE/USDC
              </Typography>
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-3 gap-3 pt-3">
          <button
            className={`bg-gray-900 px-3 py-2 ${migrateRange === 0 && "selected"}`}
            onClick={() => setMigrateRange(0)}
          >
            <Typography size="sm">WIDE 170%</Typography>
          </button>
          <button
            className={`bg-gray-900 px-3 py-2 ${migrateRange === 1 && "selected"}`}
            onClick={() => setMigrateRange(1)}
          >
            <Typography size="sm">MID 100%</Typography>
          </button>
          <button
            className={`bg-gray-900 px-3 py-2 ${migrateRange === 2 && "selected"}`}
            onClick={() => setMigrateRange(2)}
          >
            <Typography size="sm">NARROW 40%</Typography>
          </button>
        </div> */}
         <Button onClick={onMigrate} className="outline px-10 my-5 w-full">
        <Typography secondary size="xs" fw={700}>
          MIGRATE
        </Typography>
      </Button>
      </Card>
     
      <div className="w-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Typography size="xs">TOTAL LP</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                0.001079432
              </Typography>
              <Image src="/img/tokens/weth.png" width={24} height={24} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">INITIAL WETH</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                0.428156
              </Typography>
              <Image src="/img/tokens/wewe.png" width={24} height={24} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">INITIAL WEWE</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                0.001079432
              </Typography>
              <Image src="/img/tokens/usdc.png" width={24} height={24} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">END USDC</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                0.001079432
              </Typography>
              <Image src="/img/tokens/weth.png" width={24} height={24} alt="" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Typography size="xs">END WEWE</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                0.001079432
              </Typography>
              <Image src="/img/tokens/weth.png" width={24} height={24} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">NEW LP</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                0.001079432
              </Typography>
              <Image src="/img/tokens/weth.png" width={24} height={24} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">Slippage 1.05%</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                Estimated amount: $0.017
              </Typography>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">Slippage 1.05%</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                Estimated amount: $0.017
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <Card>
        <Typography size="lg">By pairing with USDC, WEWESWAP:</Typography>
        <ul className="list-decimal list-inside pt-3 text-sm">
          <li>Allows you to earn a stream of stable yield (nice!)</li>
          <li>
            Is a more stable “working asset”, which means less volatility in
            total (cool!)
          </li>
          <li>
            Is paired with a volatile asset, so potentially more volume and fees
            (yay!)
          </li>
        </ul>
      </Card>
    </>
  );
};
