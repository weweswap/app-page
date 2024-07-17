"use client";

import { colorsTuple, createTheme, rem } from "@mantine/core";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const theme = createTheme({
  /** Put your mantine theme override here */
  ...montserrat.style,
  black: "#000000",
  white: "#FFFFFF",
  colors: {
    bgLight: colorsTuple("#171313"),
    bgLight2: colorsTuple("#262121"),
    border: colorsTuple("#443838"),
    textGray: colorsTuple("#A7A7A7"),
    textGray2: colorsTuple("#B5A3A3"),
    red: colorsTuple("#FC393A"),
    green: colorsTuple("#05E278"),
    yellow: colorsTuple("#EFAD2B"),
    cyan: colorsTuple("#23DAE5"),
  },
  primaryColor: "red",
  fontSizes: {
    sm: rem(14),
    md: rem(16),
    lg: rem(20),
  },
  lineHeights: {
    sm: "normal",
    md: "normal",
    lg: "normal",
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
  defaultGradient: {
    from: "#000000",
    to: "#EF1D1E",
    deg: 52,
  },
});
