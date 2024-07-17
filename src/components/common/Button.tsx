import React from "react";
import {
  Button as MtButton,
  ButtonProps,
  PolymorphicComponentProps,
} from "@mantine/core";

type ButtonType = PolymorphicComponentProps<"button", ButtonProps>;

export const Button = ({ className, children, ...props }: ButtonType) => {
  return (
    <MtButton
      className={`!text-black px-2 py-[6px] ${className}`}
      variant="primary"
      tt="uppercase"
      fullWidth
      fw={800}
      size="sm"
      radius={5}
      {...props}
    >
      {children}
    </MtButton>
  );
};
