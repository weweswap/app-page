import Image from "next/image";
import Link from "next/link";
import { Button, Card, Typography } from "~/components/common";

const MergeTokenList = {
  wewe: {
    name: "WEWE",
    logo: "/img/tokens/wewe.svg",
  },
  vult: {
    name: "VULT",
    logo: "/img/tokens/vult.svg",
  },
  bro: {
    name: "BRO",
    logo: "/img/tokens/bro.svg",
  },
  duh: {
    name: "DUH",
    logo: "/img/tokens/DUH.webp",
  },
  moby: {
    name: "MOBY",
    logo: "/img/tokens/MOBY.webp",
  },
  cosmic: {
    name: "COSMIC",
    logo: "/img/tokens/COSMIC.webp",
  },
  fckn: {
    name: "FCKN",
    logo: "/img/tokens/FCKN.webp",
  },
  cds: {
    name: "CDS",
    logo: "/img/tokens/CDS.webp",
  },
  goodle: {
    name: "GOODLE",
    logo: "/img/tokens/goodle.svg",
  },
  fomo: {
    name: "FOMO",
    logo: "/img/tokens/FOMO.webp",
  },
  boomer: {
    name: "BOOMER",
    logo: "/img/tokens/boomer.webp",
  }
}

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

const MergeTableRow: React.FC<MergeTableRowProps> = ({ token1, token2, mergeLink }) => (
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
      {
        mergeLink ? (
          <Link href={mergeLink}>
            <Button
              className="w-full md:w-auto min-w-[5rem]"
              aria-label={`Merge ${token1.name} to ${token2.name}`}
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
          </Link>) : (
          <Button
            className="w-full md:w-auto min-w-[6rem]"
            aria-label={`Merge ${token1.name} to ${token2.name}`}
            disabled
          >
            <Typography
              secondary
              size="xs"
              fw="700"
              tt="uppercase"
            >
              SOON
            </Typography>
          </Button>
        )
      }

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
            <MergeTableRow token1={MergeTokenList.wewe} token2={MergeTokenList.vult} mergeLink="/merge/vult" />
            <MergeTableRow token1={MergeTokenList.bro} token2={MergeTokenList.wewe} mergeLink="/merge/bro" />
            <MergeTableRow token1={MergeTokenList.fomo} token2={MergeTokenList.wewe} mergeLink="/merge/fomo" />
            <MergeTableRow token1={MergeTokenList.boomer} token2={MergeTokenList.wewe} mergeLink="/merge/boomer" />
            <MergeTableRow token1={MergeTokenList.duh} token2={MergeTokenList.wewe}  />
            <MergeTableRow token1={MergeTokenList.moby} token2={MergeTokenList.wewe} />
            <MergeTableRow token1={MergeTokenList.cosmic} token2={MergeTokenList.wewe}/>
            <MergeTableRow token1={MergeTokenList.fckn} token2={MergeTokenList.wewe}/>
            <MergeTableRow token1={MergeTokenList.cds} token2={MergeTokenList.wewe} />
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default MergePage;