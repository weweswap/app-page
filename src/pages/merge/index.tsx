import { Table } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, Typography } from "~/components/common";
import { OngoingMergers } from "~/components/ui/Merge/OngoingMergers";
import { MergeConfig } from "~/constants/mergeConfigs";

interface MergeTableRowProps {
  token1: {
    name: string;
    logo: string;
  };
  token2: {
    name: string;
    logo: string;
  };
  mergeLink?: string;
}

const MergeTableRow: React.FC<MergeTableRowProps> = ({
  token1,
  token2,
  mergeLink,
}) => (
  <tr
    className="bg-[#1c1c1c] w-[full] cursor-pointer hover:bg-[#202020]"
    style={{ borderBottom: "1rem solid black" }}
  >
    <td className="p-4 font-bold min-w-[13rem]">
      <div className="flex items-center gap-5">
        <div className="flex gap-1">
          <Image
            className="lg:w-10 lg:h-10 rounded-full"
            src={token1.logo}
            width={32}
            height={32}
            alt={`${token1.name} logo`}
          />
          <Image
            className="ml-[-10px] lg:w-10 lg:h-10 rounded-full"
            src={token2.logo}
            width={32}
            height={32}
            alt={`${token2.name} logo`}
          />
        </div>
        <Typography size="xs" opacity={0.7}>
          {token1.name}/{token2.name}
        </Typography>
      </div>
    </td>
    <td className="p-4" align="right">
      {mergeLink ? (
        <Link href={mergeLink}>
          <Button
            className="w-full md:w-auto min-w-[5rem]"
            aria-label={`Merge ${token1.name} to ${token2.name}`}
          >
            <Typography secondary size="xs" fw="700" tt="uppercase">
              MERGE
            </Typography>
          </Button>
        </Link>
      ) : (
        <Button
          className="w-full md:w-auto min-w-[6rem]"
          aria-label={`Merge ${token1.name} to ${token2.name}`}
          disabled
        >
          <Typography secondary size="xs" fw="700" tt="uppercase">
            SOON
          </Typography>
        </Button>
      )}
    </td>
  </tr>
);


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
              <button className="bg-green-00 px-4 py-2">
                <Typography secondary>MERGE</Typography>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Card className="overflow-x-scroll">
        {/* <table className="w-[fit-content] min-w-[100%] table-auto text-left mt-5">
          <thead>
            <tr>
              <th className="p-4">
                <Typography size="lg" fw={1000} secondary className="leading-none">
                  All Ongoing Mergers
                </Typography>
              </th>
              <th className="bg-blue-gray-50 p-4"></th>
            </tr>
          </thead>
          <tbody>
            <MergeTableRow
              token1={MergeTokenList.wewe}
              token2={MergeTokenList.vult}
              mergeLink="/merge/vult"
            />
            <MergeTableRow
              token1={MergeTokenList.bro}
              token2={MergeTokenList.wewe}
              mergeLink="/merge/bro"
            />
            <MergeTableRow
              token1={MergeTokenList.fomo}
              token2={MergeTokenList.wewe}
              mergeLink="/merge/fomo"
            />
            <MergeTableRow
              token1={MergeTokenList.boomer}
              token2={MergeTokenList.wewe}
              mergeLink="/merge/boomer"
            />
            <MergeTableRow
              token1={MergeTokenList.duh}
              token2={MergeTokenList.wewe}
            />
            <MergeTableRow
              token1={MergeTokenList.moby}
              token2={MergeTokenList.wewe}
            />
            <MergeTableRow
              token1={MergeTokenList.cosmic}
              token2={MergeTokenList.wewe}
            />
            <MergeTableRow
              token1={MergeTokenList.fckn}
              token2={MergeTokenList.wewe}
            />
            <MergeTableRow
              token1={MergeTokenList.cds}
              token2={MergeTokenList.wewe}
            />
          </tbody>
        </table> */}
        <OngoingMergers />
      </Card>
    </div>
  );
};

export default MergePage;
