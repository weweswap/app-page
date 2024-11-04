import React, { Dispatch, SetStateAction } from "react";
import { Typography } from "~/components/common";

type Action = "zap" | "deposit" | "withdraw";

type ActionNavProps = {
    selectedAction: Action;
    setSelectedAction: Dispatch<SetStateAction<Action>>;
  };

const ActionNav: React.FC<ActionNavProps> = ({
  selectedAction,
  setSelectedAction,
}) => {
    const actions: Action[] = ["zap", "deposit", "withdraw"];
    const actionLabels: Record<Action, string> = {
        zap: "ZAP-In",
        deposit: "Deposit",
        withdraw: "Withdraw",
      };

  return (
    <div className="bg_light_dark w-full flex items-center justify-between gap-3 h-[3rem]">
      {actions.map((action) => (
        <div
          key={action}
          onClick={() => setSelectedAction(action)}
          className={`${
            selectedAction === action ? "nav_selected" : ""
          } nav cursor-pointer`}
        >
          <Typography size="sm" tt="uppercase">
            {actionLabels[action]}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default ActionNav;
