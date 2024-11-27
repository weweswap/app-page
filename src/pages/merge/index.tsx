import { Table } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { formatEther, parseEther } from "viem";
import { Card, Typography } from "~/components/common";
import { OngoingMergers } from "~/components/ui/Merge/OngoingMergers";
import { useQuoteVult } from "~/hooks";



const MergePage = () => {

  const { data: vultRatio, isFetching: isRatioFetching } = useQuoteVult(
    parseEther(String("1000"))
  );

  return (
    <div className="w-full flex bg-black p-2 flex-col gap-8">
      <div className="text-center">
        <Typography secondary size="xxl" tt="uppercase">
          MERGE!
        </Typography>
        <Typography secondary size="xs" className="py-4 leading-6">
          Merge your tokens and reach the eternal meme glory.
          <br />
          Get a WEWE premium on your memecoin and produce more $CHAOS in the market!
        </Typography>
      </div>
      <div className="p-5">
        <Typography secondary size="xl" className="pb-5 text-center" fw={1000}>
          Vultisig
        </Typography>
        <div className="flex xl:flex-row flex-col items-center">
          <div className="xl:w-[50%]">
            <Image
              src="/img/vultimg.webp"
              alt="MERGER"
              width={575}
              height={400}
            />
          </div>
          <div className="flex flex-col items-center gap-3 justify-center xl:w-[50%] py-10 lg:p-10">
            <Typography fw={900} size="xl" secondary>
            WEWE {'>'} VULT
            </Typography>
            <div className="flex justify-center w-full gap-4">
            <div className="flex justify-center gap-2 md:my-5 my-2 md:mb-5 mb-10">
                <Typography size="md" fw={600}>
                  Ratio: 1000
                </Typography>
                <Image
                  src="/img/tokens/wewe.svg"
                  width={17}
                  height={17}
                  alt="Vult"
                />

                <Typography size="md" fw={600}>
                  ≈ {Number(formatEther(vultRatio)).toLocaleString("en-US")}
                </Typography>

                <Image
                  src="/img/tokens/vult-border.svg"
                  width={17}
                  height={17}
                  alt="Vult"
                />
              </div>
            </div>
            <div>
              <Link href={"/merge/vult"} >
              <button className="bg-green-500 px-4 py-2">
                <Typography secondary>MERGE</Typography>
                </button>
              </Link>
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
