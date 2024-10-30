import React from "react";
import { ModalRootProps } from "@mantine/core";
import { Modal, Typography } from "~/components/common";

type SettingsModalProps = {
  onClose: () => void;
  onOpen: () => void;
} & ModalRootProps;

const SettingsModal = (props: SettingsModalProps) => {
  return (
    <Modal title="SETTINGS" onClose={props.onClose} opened={props.opened}>
      <div>
        <Typography size="xs" secondary>
          SWAP
        </Typography>

        <div className="flex items-center justify-between gap-2">
          <Typography size="sm" secondary>
            SLIPPAGE %
          </Typography>
          <div className="flex gap-2">
            <button className="turq_btn font-bold">
              <Typography fw={1000}>1%</Typography>
            </button>
            <button disabled className="turq_btn font-bold">
              <Typography fw={1000}>2%</Typography>
            </button>
            <button disabled className="turq_btn flex  items-center font-bold">
              <input className="w-20 bg-transparent outline-none" />
              <Typography fw={1000}>%</Typography>
            </button>
          </div>
        </div>
        <div className="py-2">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#33E6BF] "
          />
        </div>
      </div>

      <div>
        <Typography size="xs" secondary>
          ZAPS
        </Typography>

        <div className="flex items-center justify-between gap-2">
          <Typography size="sm" secondary>
            SLIPPAGE %
          </Typography>
          <div className="flex gap-2">
            <button disabled className="turq_btn font-bold">
              <Typography fw={1000}>1%</Typography>
            </button>
            <button className="turq_btn font-bold">
              <Typography fw={1000}>2%</Typography>
            </button>
            <button disabled className="turq_btn flex  items-center font-bold">
              <input className="w-20 bg-transparent outline-none" />
              <Typography fw={1000}>%</Typography>
            </button>
          </div>
        </div>
        <div className="py-2">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#33E6BF] "
          />
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
