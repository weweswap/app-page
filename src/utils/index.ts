import * as dn from "dnum";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatStringUnits(display: string, decimals: number) {
  const negative = display.startsWith("-");
  if (negative) display = display.slice(1);

  display = display.padStart(decimals, "0");

  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals),
  ];
  fraction = fraction.replace(/(0+)$/, "");
  return `${negative ? "-" : ""}${integer || "0"}${
    fraction ? `.${fraction}` : ""
  }`;
}

export function tickToPrice(tick: number) {
  return Math.pow(1.0001, tick);
}

export function formatPrice(price: number) {
  const lowerThreshold = 1e-9; // Close enough to zero
  const upperThreshold = 1e9; // Close enough to infinity

  if (price < lowerThreshold) {
    return "0";
  } else if (price > upperThreshold) {
    return "∞";
  } else {
    return price.toFixed(2);
  }
}

export function formatDollarValueNumber(
  value: string | number | dn.Dnum,
  decimalDigits = 2,
) {
  const dnValue = dn.isDnum(value) ? value : dn.from(value);
  return `$${dn.format(dnValue, { digits: decimalDigits, compact: true, locale: "en" })}`;
}

