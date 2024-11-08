import { NumberInput } from "@mantine/core";
import clsx from "clsx";
import { ethers } from "ethers";
import Image from "next/image";
import React, { useState } from "react";
import { Hex } from "viem";
import { Button, Dropdown, Typography } from "~/components/common";
import RangeSlider from "~/components/common/RangeSlider";
import { verdana } from "~/fonts";
import { formatNumber } from "~/utils";
import { usePoolContext } from "./PoolContext";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { useAccount } from "wagmi";

type ZapOutSectionProps = {
  zapAmount: string;
  setZapAmount: (value: string) => void;
  zapTokenAddress: string;
  handleZapTokenChange: (address: string) => void;
  selectedZapTokenBalance: bigint | undefined;
  poolTokens: Array<{
    address: string;
    icon: string;
    symbol: string;
    decimals: number;
  }>;
  sliderValue: number;
  setSliderValue: (value: number) => void;
  onZapOut: (tokenAmount: string, tokenAddress: Hex) => void;
  isConnected: boolean;
  openConnectModal?: () => void;
};

const ZapOutSection: React.FC<ZapOutSectionProps> = ({
  zapAmount,
  setZapAmount,
  zapTokenAddress,
  handleZapTokenChange,
  selectedZapTokenBalance,
  poolTokens,
  sliderValue,
  setSliderValue,
  onZapOut,
  isConnected,
  openConnectModal,
}) => {
  const zapTokenOptions = poolTokens.map((token) => ({
    value: token.address,
    icon: token.icon,
    text: token.symbol,
  }));
  const { address } = useAccount();

  const { selectedPool } = usePoolContext();
  const { data: balanceShares } = useTokenBalance(
    address,
    selectedPool?.address
  );

  return (
    selectedPool && (
      <>
        <div className="mt-5">
          <Typography>Zap-Out amount</Typography>
          <div className="bg_gray my-3 flex items-center gap-4">
            <Dropdown
              defaultValue={poolTokens[0]?.address || ""}
              value={selectedPool.address}
              options={[
                {
                  value: selectedPool.address,
                  icon: "/img/tokens/shares.png",
                  text: "SHARES",
                  index: 0,
                },
              ]}
              className="order-first sm:order-none sm:col-span-4 col-span-12"
              onChange={handleZapTokenChange}
              disabled={!poolTokens.length}
            />
            <NumberInput
              thousandSeparator
              classNames={{
                root: "flex-1 w-auto",
                input: clsx(
                  verdana.className,
                  "text-start bg-transparent text-white text-2xl h-auto border-transparent rounded-none"
                ),
              }}
              onChange={(value) => setZapAmount(value.toString())}
              defaultValue="0"
              value={zapAmount}
              decimalScale={8}
              hideControls
            />
          </div>
          <div className="flex items-center justify-center gap-2 py-3">
            <Image alt="" src="/img/icons/wallet.svg" width={24} height={24} />
            <Typography size="xs" className="text_light_gray">
              {parseFloat(
                Number(
                  ethers.formatUnits(balanceShares.toString(), 18)
                ).toFixed(8)
              )}{" "}
              SHARES
            </Typography>
          </div>
          <div className="py-4">
            <RangeSlider
              min={0}
              max={100}
              value={Number(sliderValue)}
              onChange={(e) => setSliderValue(Number(e.target.value))}
            />
          </div>
          <div className="flex justify-end gap-4 font-extrabold text-black text-sm">
            <Button className="bg_turq" onClick={() => setSliderValue(50)}>
              <Typography secondary size="xs" fw={700} tt="uppercase">
                50%
              </Typography>
            </Button>
            <Button className="bg_turq" onClick={() => setSliderValue(100)}>
              <Typography secondary size="xs" fw={700} tt="uppercase">
                MAX
              </Typography>
            </Button>
          </div>
          <div>
            <Typography className="mb-4">Select token you want to receive in your wallet</Typography>
            <div>
            <Dropdown
          defaultValue={poolTokens[0]?.address || ""}
          value={zapTokenAddress}
          options={zapTokenOptions}
          className="order-first sm:order-none sm:col-span-4 col-span-12 max-w-[10rem]"
          onChange={handleZapTokenChange}
          disabled={!poolTokens.length}
        />
            </div>
          </div>
          <Button
            onClick={
              isConnected
                ? () => onZapOut(zapAmount, zapTokenAddress as Hex)
                : () => openConnectModal && openConnectModal()
            }
            className="w-full mt-5 mb-2"
          >
            <Typography secondary>ZAP-OUT</Typography>
          </Button>
        </div>
      </>
    )
  );
};

export default ZapOutSection;
