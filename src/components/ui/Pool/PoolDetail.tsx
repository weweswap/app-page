import { NumberInput } from "@mantine/core";
import clsx from "clsx";
import Image from "next/image";
import { Button, Card, Typography } from "~/components/common";
import { dogica } from "~/fonts";
import { DUMMY_POOL_TYPES } from "./dummy";

type PoolDetailProps = {
  onBack: () => void;
  onAdd: () => void;
};

export const PoolDetail = ({ onBack, onAdd }: PoolDetailProps) => {
  return (
    <>
      <div className="flex items-center justify-between gap-4 w-full p-6 bg_rich_dark">
        <button onClick={onBack}>
          <Typography secondary size="xl">
            {"<"} POOL TYPES
          </Typography>
        </button>
        <div className="flex gap-4">
        <Button disabled onClick={onAdd}>
            <Typography secondary size="xs" fw={700}>
              MIGRATE
            </Typography>
          </Button>
          <Button onClick={onAdd}>
            <Typography secondary size="xs" fw={700}>
              NEW POOL
            </Typography>
          </Button>
        </div>
      </div>

      <Card className="flex flex-col gap-4">
        {DUMMY_POOL_TYPES.map(({icon, title, description}) => {
          return   <div key={description} className="flex items-center justify-between gap-3 w-full">
          <div>
            <div className="flex gap-2">
              <Image src={icon} alt="" height={24} width={24} />
              <Typography size="sm">
                {title}
              </Typography>
            </div>
            <div className="py-2">
              <Typography size="xs">
              {description}
              </Typography>
            </div>
          </div>
          <Button onClick={onAdd} className="sm:px-12">
          <Typography secondary size="sm">
            ADD
          </Typography>
        </Button>
        </div>
        })}
      
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
