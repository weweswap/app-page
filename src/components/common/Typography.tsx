import clsx from "clsx";
import { Text, TextProps } from "@mantine/core";
import { dogica, verdana } from "~/fonts";

type TypographyProps = {
  secondary?: boolean;
  children: any;
} & TextProps;

export const Typography = ({
  secondary,
  className,
  children,
  ...props
}: TypographyProps) => {
  return (
    <Text
      className={clsx(
        secondary ? dogica.className : verdana.className,
        className
      )}
      {...props}
    >
      {children}
    </Text>
  );
};
