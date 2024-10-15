import Image from "next/image";
import Link from "next/link";
import { Button, Card, Typography } from "~/components/common";

interface MergeTableRowProps {
  token1: string;
  token2: string;
  mergeLink: string;
}

const MergeTableRow: React.FC<MergeTableRowProps> = ({ token1, token2, mergeLink }) => (
  <tr
    className="bg-[#1c1c1c] w-[full] cursor-pointer hover:bg-[#202020]"
    style={{ borderBottom: "1rem solid black" }}
  >
    <td className="p-4 font-bold ">
      <div className="flex items-center gap-5">
        <div className="flex gap-1">
          <Image
            className="w-10 h-10"
            src={`/img/tokens/${token1.toLowerCase()}.svg`}
            width={32}
            height={32}
            alt={`${token1} logo`}
          />
          <Image
            className="ml-[-10px] w-10 h-10"
            src={`/img/tokens/${token2.toLowerCase()}.svg`}
            width={32}
            height={32}
            alt={`${token2} logo`}
          />
        </div>
        <Typography size="sm" opacity={0.7}>
          {token1}/{token2}
        </Typography>
      </div>
    </td>
    <td className="p-4" align="right">
      <Link href={mergeLink}>
        <Button
          className="w-full md:w-auto min-w-[6rem]"
          aria-label={`Merge ${token1} to ${token2}`}
        >
          <Typography
            secondary
            size="xs"
            fw="700"
            tt="uppercase"
          >
            MERGE
          </Typography>
        </Button>
      </Link>
    </td>
  </tr>
);

const MergePage = () => {
  return (
    <div className="w-full flex bg-black p-2 flex-col gap-8">
      <div className="">
        <Typography secondary size="xl" tt="uppercase">
          MERGE
        </Typography>
      </div>
      <Card className="overflow-x-scroll">
        <table className="w-[fit-content] min-w-[100%] table-auto text-left bg_dark mt-5">
          <thead>
            <tr>
              <th className="bg-blue-gray-50 p-4">
                <Typography size="sm" className="leading-none opacity-70">
                  ASSETS
                </Typography>
              </th>
              <th className="bg-blue-gray-50 p-4">
              </th>
            </tr>
          </thead>
          <tbody>
          <MergeTableRow token1="WEWE" token2="VULT" mergeLink="/merge/vult" />
          <MergeTableRow token1="BRO" token2="WEWE" mergeLink="/merge/bro" />
          <MergeTableRow token1="GOODLE" token2="WEWE" mergeLink="/merge/goodle" />
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default MergePage;