"use client";

import { colorsTuple, createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  /** Put your mantine theme override here */
  black: "#000000",
  white: "#FFFFFF",
  fontSizes: {
    xs: rem(14),
    sm: rem(16),
    md: rem(18),
    lg: rem(20),
    xl: rem(24),
  },
  lineHeights: {
    xs: "normal",
    sm: "normal",
    md: "normal",
    lg: "normal",
    xl: "normal",
  },
  headings: {
    sizes: {
      h1: {
        fontWeight: "500",
        fontSize: rem(32),
        lineHeight: "normal",
      },
      h2: {
        fontWeight: "700",
        fontSize: rem(28),
        lineHeight: "normal",
      },
      h3: {
        fontWeight: "700",
        fontSize: rem(20),
        lineHeight: "normal",
      },
    },
  },
});
