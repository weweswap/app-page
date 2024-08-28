import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

export const Button = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      className={clsx("bg_blue px-4 py-3 font-bold", className)}
      {...props}
    >
      {children}
    </button>
  );
};
