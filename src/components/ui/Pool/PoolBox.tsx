import React from "react";
import Image from "next/image";
import { Button, Typography } from "~/components/common";

import { DUMMY_POOLS } from "./dummy";

const PoolBox = () => {
  return (
    <>
      <div className="flex w-full flex-col gap-6">
        {DUMMY_POOLS.map(
          ({
            title,
            exchangePair,
            state,
            range,
            lpValue,
            rewards,
            positionId,
          }) => {
            return (
              <div key={title} className="bg_dark min-h-40 w-full p-4">
                <Typography>{title}</Typography>
                <div className="flex flex-wrap items-center justify-between gap-3 py-7 sm:py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Image
                        src="/img/tokens/weth.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <Image
                        src="/img/tokens/wewe.png"
                        width={24}
                        height={24}
                        alt=""
                        className="-translate-x-1.5"
                      />
                    </div>
                    <Typography
                      secondary
                      size="xs"
                      className="font-bold"
                      tt="uppercase"
                    >
                      {exchangePair}
                    </Typography>
                  </div>
                  <div></div>
                  <div></div>
                  <div className="flex flex-col gap-2 lg:text-right">
                    <Typography size="xs" className="text_light_gray">
                      LP VALUE
                    </Typography>
                    <Typography size="lg" className="font-extrabold">
                      ${lpValue}
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-2 text-right">
                    <Typography size="xs" className="text_light_gray">
                      REWARDS
                    </Typography>
                    <Typography size="lg" className="font-extrabold">
                      ${rewards}
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 py-4 sm:py-1 ">
                  <div className="flex gap-6">
                    <Typography
                      size="xs"
                      className={`${state == "Active" ? "bg_active" : "bg_inactive"} flex w-[4.5rem] justify-center rounded-full py-1`}
                    >
                      {state}
                    </Typography>
                    <div className="flex items-center gap-1">
                      {range === "NARROW" ? (
                        <Image
                          src="/img/links/narrow.svg"
                          width={23}
                          height={23}
                          alt=""
                        />
                      ) : range === "MID" ? (
                        <Image
                          src="/img/links/mid.svg"
                          width={23}
                          height={23}
                          alt=""
                        />
                      ) : (
                        <Image
                          src="/img/links/wide.svg"
                          width={23}
                          height={23}
                          alt=""
                        />
                      )}
                      <Typography size="xs" className="translate-x-1">
                        {range}
                      </Typography>
                    </div>
                  </div>
                  <Typography size="xs">
                    {`RANGE: 0.0006900>0.007000`}
                  </Typography>
                  <Typography size="xs">Position ID: {positionId}</Typography>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-4 py-3">
                  <Button className="w-full md:w-auto">
                    <Typography secondary size="xs" fw={700} tt="uppercase">
                      MANAGE
                    </Typography>
                  </Button>

                  <Button className="w-full md:w-auto">
                    <Typography secondary size="xs" fw={700} tt="uppercase">
                      CLAIM
                    </Typography>
                  </Button>

                  <Button className="w-full md:w-auto">
                    <Typography secondary size="xs" fw={700} tt="uppercase">
                      ZAP-OUT
                    </Typography>
                  </Button>
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default PoolBox;
