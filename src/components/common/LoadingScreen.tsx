import React from "react";

import { Typography } from "./Typography";

export const LoadingScreen = () => {
  return (
    <>
      <Typography
        secondary
        className="flex h-full items-center justify-center py-10 text-center font-bold"
        size="xl"
      >
        LOADING ...
      </Typography>
    </>
  );
};
