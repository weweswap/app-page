import { Divider, NumberInput } from "@mantine/core";
import clsx from "clsx";
import Image from "next/image";
import { Button, Card, Dropdown, Typography } from "~/components/common";
import { CHAIN_LIST } from "~/constants/chains";
import { TOKEN_LIST } from "~/constants/tokens";
import { dogica, verdana } from "~/fonts";

const tokenOptions = TOKEN_LIST.map((token) => ({
  value: token.symbol,
  icon: token.icon,
}));

const chainOptions = CHAIN_LIST.map((chain) => ({
  value: chain.symbol,
  icon: chain.icon,
}));

type TransferHomeProps = {
  onTransfer: () => void;
};

export const TransferHome = ({ onTransfer }: TransferHomeProps) => {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <Typography secondary size="xl" tt="uppercase">
          Bridge
        </Typography>
        <Image src="/img/icons/settings.svg" width={24} height={24} alt="" />
      </div>

      <Card className="w-full flex flex-col">
        <div className="flex md:flex-row flex-col gap-4 justify-between ">
          <div className="flex flex-col md:w-1/2 w-full gap-5">
            <Typography secondary size="sm" className="text-start">
              Token
            </Typography>
            <Dropdown
              defaultValue="ETH"
              options={tokenOptions}
              className="w-full "
            />
          </div>
          <div className="flex flex-col md:w-1/2 w-full  gap-5">
            <Typography secondary size="sm" className="">
              From
            </Typography>
            <Dropdown
              defaultValue="BASE"
              options={chainOptions}
              className="w-full "
            />
          </div>
        </div>

        <div className="h-1 flex items-center justify-center mt-10 ">
          <button className="absolute bg-black  p-3">
            <Image src="/img/icons/refresh.svg" width={24} height={24} alt="" />
          </button>
        </div>

        <div className="flex flex-col gap-4 mt-10">
          <div className="flex md:flex-row flex-col gap-4 justify-between ">
            <div className="flex flex-col md:w-1/2 w-full gap-5">
              <Typography secondary size="sm" className="text-start">
                Token
              </Typography>
              <Dropdown
                defaultValue="ETH"
                options={tokenOptions}
                className="w-full "
              />
            </div>
            <div className="flex flex-col md:w-1/2 w-full  gap-5">
              <Typography secondary size="sm" className="">
                From
              </Typography>
              <Dropdown
                defaultValue="BASE"
                options={chainOptions}
                className="w-full "
              />
            </div>
          </div>

          <div className="flex bg_rich_dark flex-row items-center bg justify-between px-2">
            <NumberInput
              classNames={{
                root: "flex-1  my-5 w-auto",
                input: clsx(
                  verdana.className,
                  "text-start bg-transparent text-white text-2xl h-auto border-transparent rounded-none"
                ),
              }}
              defaultValue="0"
              hideControls
            />
            <div className="flex gap-5 items-center">
              <div className="flex flex-col ">
                <Typography size="sm">Balance</Typography>
                <Typography size="sm" className="text-end">
                  -
                </Typography>
              </div>
              <Divider orientation="vertical" className="border_stroke" />
              <div>
                <Typography
                  size="md"
                  className="text_turq underline cursor-pointer"
                >
                  MAX
                </Typography>
              </div>
            </div>
          </div>
          <div>
            <Typography size="xs">Est. Value:- </Typography>

            <div className="flex md:flex-row flex-col gap-10">
              <div className="w-full flex flex-col gap-5 md:w-1/2 p-2 bg_rich_dark">
                <div className="flex flex-row justify-between gap-3">
                  <Typography size="xs">Gas Cost: </Typography>
                  <Typography size="xs" className="text_turq">
                    Fast
                  </Typography>
                </div>
                <Typography size="md">-</Typography>
                <Typography size="xs">Est. Time:-</Typography>
              </div>

              <div className="w-full flex flex-col gap-5 md:w-1/2 p-2 bg_rich_dark">
                <div className="flex flex-row justify-between gap-3">
                  <Typography size="xs">Gas Cost: </Typography>
                  <Typography size="xs" className="text_yellow">
                    Economy
                  </Typography>
                </div>
                <Typography size="md">-</Typography>
                <Typography size="xs">Max. Time:-</Typography>
              </div>
            </div>

            <Divider className="border_stroke my-5" />

            <div className="flex items-center justify-between gap-3 my-2">
              <Typography size="xs">You will receive</Typography>
              <Typography size="xs">-</Typography>
            </div>
            <div className="flex items-center justify-between gap-3 ">
              <Typography size="xs">Gas on destination</Typography>
              <Typography size="xs">-</Typography>
            </div>
          </div>
        </div>
        <Button className="w-full my-2" onClick={onTransfer}>
          <Typography secondary size="sm" tt="uppercase" fw="bold">
            Transfer
          </Typography>
        </Button>
      </Card>
    </>
  );
};
