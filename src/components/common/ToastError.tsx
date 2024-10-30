import { toast } from "react-toastify";

import { Typography } from "./Typography";

export const showErrorToast = (props: string) => {
  toast(
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src="/img/Wewe_scared.png"
        alt="Error Icon"
        style={{ width: "120px", height: "60px", marginRight: "10px" }}
      />
      <Typography secondary size="xs">
        {props}
      </Typography>
    </div>,
    {
      theme: "dark",
      style: {
        backgroundColor: "#121212",
        color: "#fff",
      },
      progressStyle: {
        backgroundColor: "#fe0000",
      },
    }
  );
};
