import { NumberInput } from "@mantine/core";
import clsx from "clsx";
import Image from "next/image";
import { Button, Card, Typography } from "~/components/common";
import { dogica } from "~/fonts";

type PoolDetailProps = {
  onBack: () => void;
  onAdd: () => void;
};

export const PoolDetail = ({ onBack, onAdd }: PoolDetailProps) => {
  return (
    <>
      <Card>
        <button onClick={onBack}>
          <Typography secondary size="xl">
            {"<"} WEWE
          </Typography>
        </button>
      </Card>

      <Card className="flex flex-col md:flex-row items-center gap-4">
        <NumberInput
          classNames={{
            root: "flex-1 w-full md:w-auto",
            input: clsx(
              dogica.className,
              "bg-gray-900 p-4 text-white text-lg h-auto border-transparent rounded-none"
            ),
          }}
          hideControls
        />
        <div className="flex-1 w-full md:w-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image src="/img/tokens/wewe.png" width={40} height={40} alt="" />
            <Typography size="md">WEWE</Typography>
            <Image
              src="/img/icons/arrow_down.svg"
              width={16}
              height={16}
              alt=""
            />
          </div>
          <Button onClick={onAdd}>
            <Typography secondary size="sm" fw={700}>
              Add
            </Typography>
          </Button>
        </div>
      </Card>

      <Card>
        <Typography size="lg">
          When you add liquidity to an Active Pool:
        </Typography>
        <ul className="list-decimal list-inside pt-3 text-sm">
          <li>Your assets are swapped to be added correctly to the pool.</li>
          <li>
            Any assets that can’t fit in the pool are refunded back to you.
          </li>
          <li>
            You may experience a small slip when you enter a pool that is
            out-of-balance.
          </li>
        </ul>
      </Card>
    </>
  );
};
