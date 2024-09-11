import { ethers, formatUnits } from "ethers";
import { CONTRACT_ADDRESSES } from "~/constants";
import { Position } from "~/models";

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

function getAmountsForLiquidity(
  liquidity: bigint,
  sqrtPriceX96: bigint,
  sqrtPriceLowerX96: bigint,
  sqrtPriceUpperX96: bigint
) {
  let amount0, amount1;
  console.log({
    sqrtPriceX96,
    sqrtPriceLowerX96,
    sqrtPriceUpperX96,
  });

  if (sqrtPriceX96 <= sqrtPriceLowerX96) {
    // current price is below the range, so all liquidity is in token0
    amount0 =
      (liquidity * (sqrtPriceUpperX96 - sqrtPriceLowerX96)) /
      (sqrtPriceUpperX96 * sqrtPriceLowerX96);
    amount1 = 0;
  } else if (sqrtPriceX96 < sqrtPriceUpperX96) {
    // current price is within the range
    console.log({
      liquidity,
      sqrtPriceUpperX96,
      sqrtPriceLowerX96,
    });
    amount0 =
      (liquidity * (sqrtPriceUpperX96 - sqrtPriceX96)) /
      (sqrtPriceUpperX96 * sqrtPriceX96);
    console.log((liquidity * (sqrtPriceUpperX96 - sqrtPriceX96)));
    console.log(  (sqrtPriceUpperX96 * sqrtPriceX96));
    
    console.log("amount0:",amount0);
    
    amount1 = liquidity * (sqrtPriceX96 - sqrtPriceLowerX96);
  } else {
    // current price is above the range, so all liquidity is in token1
    amount0 = 0;
    amount1 = liquidity * (sqrtPriceUpperX96 - sqrtPriceLowerX96);
  }
  return { amount0, amount1 };
}

export async function calculateAmounts(position: Position) {
  const provider = new ethers.JsonRpcProvider(
    `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_APIKEY}`
  );

  const liquidity = position.liquidity;
  const tickLower = position.tickLower;
  const tickUpper = position.tickUpper;
  console.log({
    liquidity,
    tickLower,
    tickUpper,
  });

  // Fetch current price from the pool contract
  const contract = new ethers.Contract(
    CONTRACT_ADDRESSES.wethWeweContract,
    WETH_WEWE_CONTRACT_ABI,
    provider
  );
  const slot0 = await contract.slot0();
  const currentTick = slot0.tick;
  // Convert ticks to prices (square root format)
  const sqrtPriceLowerX96 = BigInt(
    Math.floor(Math.sqrt(tickToPrice(tickLower)) * Math.pow(2, 96))
  );
  const sqrtPriceUpperX96 = BigInt(
    Math.floor(Math.sqrt(tickToPrice(tickUpper)) * Math.pow(2, 96))
  );
  console.log("sqrtPriceUpperX96:", sqrtPriceUpperX96);

  const sqrtPriceX96 = BigInt(
    Math.floor(Math.sqrt(tickToPrice(Number(currentTick))) * Math.pow(2, 96))
  );
  const { amount0, amount1 } = getAmountsForLiquidity(
    BigInt(liquidity),
    sqrtPriceX96,
    sqrtPriceLowerX96,
    sqrtPriceUpperX96
  );
  console.log("amount0:", formatTokenAmount(amount0));
  console.log("amount1:", formatUnits(amount1, 18));
  return { amount0, amount1 };
}

function formatTokenAmount(
  amount: string | number | bigint,
  decimals: number = 18,
  precision: number = 4
): string {
  try {
    // Convert to a number if the amount is in scientific notation
    const numAmount =
      typeof amount === "string" && amount.includes("e")
        ? parseFloat(amount)
        : amount;

    // If the amount is less than 1e-18 (or smallest unit), format it directly to avoid underflow
    if (typeof numAmount === "number" && numAmount < Math.pow(10, -decimals)) {
      return numAmount.toFixed(precision); // Represent very small numbers using toFixed
    }
    const bigNumberAmount = BigInt(amount);

    // Convert BigNumber to a formatted string using ethers.js utility
    const formattedAmount = formatUnits(bigNumberAmount, decimals);

    // Convert to a floating-point number and format it to the desired precision
    return parseFloat(formattedAmount).toFixed(precision);
  } catch (error: any) {
    // Handle underflow and other unexpected errors
    if (error.code === "INVALID_ARGUMENT") {
      // If underflow or too small value
      return "0.0"; // Represent it as zero if it's too small to show meaningfully
    } else {
      throw error; // Rethrow if it's not an underflow issue
    }
  }
}

const WETH_WEWE_CONTRACT_ABI = [
  {
    inputs: [],
    name: "slot0",
    outputs: [
      { internalType: "uint160", name: "sqrtPriceX96", type: "uint160" },
      { internalType: "int24", name: "tick", type: "int24" },
      { internalType: "uint16", name: "observationIndex", type: "uint16" },
      {
        internalType: "uint16",
        name: "observationCardinality",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "observationCardinalityNext",
        type: "uint16",
      },
      { internalType: "uint8", name: "feeProtocol", type: "uint8" },
      { internalType: "bool", name: "unlocked", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
];
