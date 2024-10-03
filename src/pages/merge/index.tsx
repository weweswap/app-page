import Image from "next/image";
import Link from "next/link";
import { Button, Card, Typography } from "~/components/common";
import { Merge } from "~/components/ui";

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
              <th className="bg-blue-gray-50 p-4 hidden sm:table-cell">
                <Typography size="sm" className="leading-none opacity-70">
                  LOCKED
                </Typography>
              </th>
              <th className="bg-blue-gray-50 p-4 hidden md:table-cell">
                <Typography size="sm" className="leading-none opacity-70">
                  AVAILABLE
                </Typography>
              </th>
              <th className="bg-blue-gray-50 p-4">
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              className="bg-[#1c1c1c] w-[full] cursor-pointer hover:bg-[#202020]"
              style={{ borderBottom: "1rem solid black" }}
            >
              <td className="p-4 font-bold ">
                <div className="flex items-center gap-5">
                  <div className="flex gap-1">
                    <Image
                      className="w-10 h-10"
                      src="/img/tokens/wewe.svg"
                      width={32}
                      height={32}
                      alt="WEWE logo"
                    />
                    <Image
                      className="ml-[-10px] w-10 h-10"
                      src="/img/tokens/vult-border.svg"
                      width={32}
                      height={32}
                      alt="VULT logo"
                    />
                  </div>
                  <Typography size="sm" opacity={0.7}>
                    WEWE/VULT
                  </Typography>
                </div>
              </td>
              <td className="p-4 hidden sm:table-cell">
                <Typography size="xs" opacity={0.7}>
                  -
                </Typography>
              </td>
              <td className="p-4 hidden md:table-cell">
                <Typography size="xs" opacity={0.7}>
                  -
                </Typography>
              </td>
              <td className="p-4" align="right">
                <Link href="/merge/vult">
                  <Button
                    className="w-full md:w-auto min-w-[6rem]"
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

            <tr
              className="bg-[#1c1c1c] w-[full] cursor-pointer hover:bg-[#202020]"
              style={{ borderBottom: "1rem solid black" }}
            >
              <td className="p-4 font-bold ">
                <div className="flex items-center gap-5">
                  <div className="flex gap-1">
                    <Image
                      className="w-10 h-10"
                      src="/img/tokens/bro.svg"
                      width={32}
                      height={32}
                      alt="BRO logo"
                    />
                    <Image
                      className="ml-[-10px] w-10 h-10"
                      src="/img/tokens/wewe.svg"
                      width={32}
                      height={32}
                      alt="WEWE logo"
                    />
                  </div>
                  <Typography size="sm" opacity={0.7}>
                    BRO/WEWE
                  </Typography>
                </div>
              </td>
              <td className="p-4 hidden sm:table-cell">
                <Typography size="xs" opacity={0.7}>
                  -
                </Typography>
              </td>
              <td className="p-4 hidden md:table-cell">
                <Typography size="xs" opacity={0.7}>
                  -
                </Typography>
              </td>
              <td className="p-4" align="right">
                <Link href="/merge/bro">
                  <Button
                    className="w-full md:w-auto min-w-[6rem]"
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
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default MergePage;