import { Table } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { Card, Typography } from "~/components/common";
import { OngoingMergers } from "~/components/ui/Merge/OngoingMergers";



const MergePage = () => {

  return (
    <div className="w-full flex bg-black p-2 flex-col gap-8">
      <div className="text-center">
        <Typography secondary size="xxl" tt="uppercase">
          MERGE!
        </Typography>
        <Typography secondary size="xs" className="py-4 leading-6">
          Merge your tokens and reach the eternal meme glory.
          <br />
          Get a WEWE premium on your dying meme and produce more $CHAOS on the
          market!!
        </Typography>
      </div>
      <div className="p-5">
        <Typography secondary size="lg" className="pb-5" fw={1000}>
          🌶️ Hot Merger 🌶️
        </Typography>
        <div className="flex xl:flex-row flex-col items-center">
          <div className="xl:w-[50%]">
            <Image
              src="/img/merge-img.svg"
              alt="MERGER"
              width={575}
              height={400}
            />
          </div>
          <div className="flex flex-col items-center gap-3 justify-center xl:w-[50%] py-10 lg:p-10">
            <Typography fw={900} size="xl" secondary>
              $BBRETT
            </Typography>
            <div className="flex justify-between w-full gap-4">
              <div className="text-center">
                <Typography size="sm">BBRETT: WEWE</Typography>
                <Typography size="sm" fw={900}>
                  1:12
                </Typography>
              </div>
              <div className="text-center">
                <Typography size="sm">Premium</Typography>
                <Typography size="sm" fw={900}>
                  16%
                </Typography>
              </div>
              <div className="text-center">
                <Typography size="sm">CHAOS Bonus</Typography>
                <Typography size="sm" fw={900}>
                  2x
                </Typography>
              </div>
            </div>
            <div className="w-full relative h-4 my-5">
              <div
                className="bg-blue-500 h-6 transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(to left,red, orange, yellow, green)",
                }}
              />
              <div
                style={{
                  width: `${100 - 78}%`,
                }}
                className="absolute top-0 right-0 h-6 bg-slate-400"
              ></div>
              <div className="absolute top-1 w-full text-center text-black">
                <Typography secondary size="xs">
                  Caps Filled: 78%
                </Typography>
              </div>
            </div>
            <div>
              <button className="bg-green-500 px-4 py-2">
                <Typography secondary>MERGE</Typography>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Card className="overflow-x-scroll">
        <OngoingMergers />
      </Card>
    </div>
  );
};

export default MergePage;
