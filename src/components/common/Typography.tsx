import { Text, TextProps } from "@mantine/core";
import { dogica, verdana } from "~/fonts";
import clsx from "clsx";

type TypographyProps = {
  secondary?: boolean;
  children: React.ReactNode;
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
