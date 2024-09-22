"use client";

import Image from "next/image";
import { useState } from "react";
import { Button, Card, Typography } from "~/components/common";
import { Pool, Position, FeeAmount } from "@uniswap/v3-sdk";
import { useEffect } from "react";
import { Token, BigintIsh } from "@uniswap/sdk-core";
import { CONTRACT_ADDRESSES } from "~/constants";
import { ethers, formatEther, formatUnits } from "ethers";
import { formatPrice, tickToPrice } from "~/utils";
import { MigrateCompleteModal } from "./MigrateCompleteModal";
import { useDisclosure } from "@mantine/hooks";
import { useSafeTransfer } from "~/hooks/useMigrate";
import { useAccount, useWatchContractEvent } from "wagmi";
import { Loader } from "@mantine/core";
import { FailTXModal } from "~/components/common/FailTXModal";
import { COMMON_POOL_CONTRACT_ABI } from "~/lib/abis/CommonPool";
import { fetchETHPrice, fetchWEWEPrice } from "~/services";
import { ArrakisVaultABI } from "~/lib/abis/ArrakisVault";
import { provider } from "~/hooks/provider";

type MigrateDetailProps = {
  onBack: () => void;
  position: any;
};

export const MigrateDetail = ({
  onBack,
  position: currentPosition,
}: MigrateDetailProps) => {
  const { address } = useAccount();
  const [
    openedMigrateCompleteModal,
    { open: openMigrateCompleteModal, close: closeMigrateCompleteModal },
  ] = useDisclosure(false);
  const [
    openedMigrateFailModal,
    { open: openMigrateFailModal, close: closeMigrateFailModal },
  ] = useDisclosure(false);

  const handleMigrate = () => {
    safeTransferFrom(address!, currentPosition.tokenId);
  };

  const {
    hash,
    isPending,
    isError,
    isTxConfirming,
    isConfirmed,
    receipt,
    safeTransferFrom,
  } = useSafeTransfer()

  const [currentTick, setCurrentTick] = useState<number>(0);
  const [sqrtPriceX96, setSqrtPriceX96] = useState<BigintIsh>(0);
  const [poolLiquidity, setPoolLiquidity] = useState<BigintIsh>(0);
  const [amountWETH, setAmountWETH] = useState<number>(0);
  const [amountWEWE, setAmountWEWE] = useState<number>(0);
  const [totalLP, setTotalLP] = useState<number>(0);
  const [totalLPUSD, setTotalLPUSD] = useState<number>(0);
  const [wewePrice, setWewePrice] = useState<number>(0);
  const [wethPrice, setWethPrice] = useState<number>(0);
  const [mintAmount, setMintAmount] = useState<{
    amount0: bigint;
    amount1: bigint;
    mintAmount: bigint;
  }>();

  const handleCloseCompleteModal = () => {
    closeMigrateCompleteModal();
    onBack();
  };
  useEffect(() => {
    const fetchTicks = async () => {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.wethWeweContract,
        COMMON_POOL_CONTRACT_ABI,
        provider
      );
      setPoolLiquidity(String(await contract.liquidity()));
      const slot0 = await contract.slot0();
      setCurrentTick(slot0.tick);
      setSqrtPriceX96(String(slot0.sqrtPriceX96));
    };
    fetchTicks();
  }, []);

  useEffect(() => {
    fetchWEWEPrice().then((price) => {
      setWewePrice(price);
    });
  }, []);

  useEffect(() => {
    fetchETHPrice().then((price) => {
      setWethPrice(price);
    });
  }, []);

  useEffect(() => {
    if (!currentTick || !sqrtPriceX96 || !currentPosition || !wewePrice) return;

    const WETH_TOKEN = new Token(
      8453,
      CONTRACT_ADDRESSES.wethAddress,
      18,
      "WETH",
      "Wrapped Ether"
    );
    const WEWE_TOKEN = new Token(
      8453,
      CONTRACT_ADDRESSES.wewe,
      18,
      "WEWE",
      "WEWE Token"
    );

    const pool = new Pool(
      WETH_TOKEN,
      WEWE_TOKEN,
      FeeAmount.HIGH,
      sqrtPriceX96,
      poolLiquidity,
      Number(currentTick)
    );
    const position = new Position({
      pool,
      liquidity: currentPosition.liquidity,
      tickLower: currentPosition.tickLower,
      tickUpper: currentPosition.tickUpper,
    });
    setAmountWEWE(parseFloat(position.amount1.toFixed(18)));
    setAmountWETH(parseFloat(position.amount0.toFixed(18)));

    const priceWEWEinWETH = pool.token1Price.toSignificant(18);
    const valueInWETH =
      parseFloat(position.amount1.toFixed(18)) * parseFloat(priceWEWEinWETH);
    setTotalLP(parseFloat(position.amount0.toFixed(18)) + valueInWETH);

    const priceWETHinUSD = wewePrice / Number(priceWEWEinWETH);
    setTotalLPUSD(
      (parseFloat(position.amount0.toFixed(18)) + valueInWETH) * priceWETHinUSD
    );
  }, [currentTick, sqrtPriceX96]);

  useWatchContractEvent({
    address: CONTRACT_ADDRESSES.weweVault,
    abi: ArrakisVaultABI,
    eventName: 'LogMint',
    poll: false,
    onLogs(logs: any[]) {
      const mintEvent = logs.find(log => log['args'].receiver.toLowerCase() === address?.toLowerCase())
      if (mintEvent) {
        setMintAmount({
          amount0: mintEvent.args.amount0In,
          amount1: mintEvent.args.amount1In,
          mintAmount: mintEvent.args.mintAmount
        })
      }
    },
  });

  // get mint amounts
  useEffect(() => {
    if (!amountWETH || !amountWEWE) return;
    const fetchMintAmounts = async () => {
      const RESOLVER_ABI = [
        "function getMintAmounts(address vaultV2_, uint256 amount0Max_, uint256 amount1Max_) external view returns (uint256 amount0, uint256 amount1, uint256 mintAmount)",
      ];
      const resolver = new ethers.Contract(
        CONTRACT_ADDRESSES.resolver,
        RESOLVER_ABI,
        provider
      );
      const amountToDeposit0 = ethers.parseEther(amountWEWE.toString());
      const amountToDeposit1 = ethers.parseUnits((amountWETH * wethPrice).toFixed(6), 6);
      const result = await resolver.getMintAmounts(
        CONTRACT_ADDRESSES.weweVault,
        amountToDeposit0,
        amountToDeposit1
      );
      setMintAmount(result);
    };
    fetchMintAmounts();
  }, [amountWETH, amountWEWE, wewePrice]);

  // tx status
  useEffect(() => {
    if (isConfirmed) {
      openMigrateCompleteModal();
    }
    if (isError) {
      openMigrateFailModal();
    }
  }, [isConfirmed, receipt, isError, isPending, isTxConfirming]);
  return (
    <>
      <div className="w-full">
        <button onClick={onBack} className="w-full text-start">
          <div className="flex items-center justify-between gap-3 lg:flex-nowrap flex-wrap">
            <Typography secondary size="md" tt="uppercase">
              MIGRATE UNISWAP LIQUIDITY
            </Typography>
          </div>
        </button>
        <Typography size="xs" className="mt-3">
          All WEWESWAP pools are paired in USDC - this means easy to collect{" "}
          <br />
          and earn fees. This migration will move your liquidity over.
        </Typography>
      </div>
      <div className="py-2 w-full">UNISWAP MIGRATION STATUS</div>
      <Card>
        <div className="flex items-center justify-between">
          <Typography size="lg">VALUE</Typography>
          <div className="flex items-center gap-2">
            <Image
              src="/img/icons/settings.svg"
              width={24}
              height={24}
              alt="Migrate Settings"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg_light_dark flex items-center justify-between gap-3 p-4">
            <div className="flex-1 flex items-center">
              <div className="flex items-center">
                <Image
                  src="/img/tokens/wewe.png"
                  width={32}
                  height={32}
                  alt=""
                />
                <Image
                  src="/img/tokens/eth.png"
                  className="translate-x-[-12px]"
                  width={32}
                  height={32}
                  alt=""
                />
              </div>
              <Typography size="sm">WEWE/WETH</Typography>
            </div>
            <Image
              src="/img/icons/arrow_right.svg"
              width={16}
              height={16}
              alt=""
            />
            <div className="flex-1 flex items-center justify-end gap-3">
              <div className="flex items-center">
                <Image
                  src="/img/tokens/wewe.png"
                  className="translate-x-[12px]"
                  width={32}
                  height={32}
                  alt=""
                />
                <Image
                  src="/img/tokens/usdc.png"
                  width={32}
                  height={32}
                  alt=""
                />
              </div>
              <Typography size="sm">WEWE/USDC</Typography>
            </div>
          </div>
        </div>
        <Button
          disabled={isPending || isTxConfirming}
          className="px-10 my-5 w-full flex items-center justify-center gap-2"
          onClick={handleMigrate}
        >
          <Typography secondary size="xs" fw={700}>
            MIGRATE
          </Typography>
          {isPending || (isTxConfirming && <Loader color="white" size="sm" />)}
        </Button>
      </Card>

      <div className="w-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Typography size="xs">
              ID: {Number(currentPosition.tokenId)}{" "}
            </Typography>
            <Typography size="xs">
              Min: {formatPrice(tickToPrice(currentPosition.tickLower))} WETH
              per WEWE
            </Typography>
            <Image
              width={20}
              height={20}
              alt="arrow"
              src="/img/icons/arrow.svg"
            />
            <Typography size="xs">
              Max: {formatPrice(tickToPrice(currentPosition.tickUpper))} WETH
              per WEWE
            </Typography>
          </div>
          <div className="flex items-center justify-between">
            <Typography size="xs">TOTAL LP</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                {totalLP.toFixed(9)}
              </Typography>
              <div className="flex items-center gap-2">
                <Image
                  src="/img/tokens/eth.png"
                  width={24}
                  height={24}
                  alt=""
                />
                <Image
                  src="/img/tokens/wewe.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">INITIAL WETH</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                {amountWETH.toFixed(9)}
              </Typography>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">INITIAL WEWE</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                {amountWEWE.toFixed(9)}
              </Typography>
            </div>
          </div>

          <div className="flex items-center justify-between py-4">
            <Typography size="xs">POOL TYPE</Typography>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Image
                    src="/img/icons/rocket.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <Typography size="xs" fw={700}>
                    MEMES 1%
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/img/icons/Infinity.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <Typography size="xs" fw={700}>
                    INFINITY
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">RATE</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                1 USDC = {(1 / wewePrice).toFixed(2)} WEWE ($1.00)
              </Typography>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Typography size="xs">RANGE</Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs" fw={700}>
                Min. 0 - Max. 999999+
              </Typography>
            </div>
          </div>
          {mintAmount && (
            <>
              <div className="flex items-center justify-between">
                <Typography size="xs">END USDC</Typography>
                <div className="flex items-center gap-2">
                  <Typography size="xs" fw={700}>
                    {Number(formatUnits(mintAmount.amount1, 6)).toFixed(2)}
                  </Typography>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Typography size="xs">END WEWE</Typography>
                <div className="flex items-center gap-2">
                  <Typography size="xs" fw={700}>
                    {Number(formatEther(mintAmount.amount0)).toFixed(2)}
                  </Typography>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Typography className="font-bold" size="xs">
                  WEWE SHARES
                </Typography>
                <div className="flex items-center gap-2">
                  <Typography size="xs" fw={700}>
                    {Number(formatEther(mintAmount.mintAmount)).toFixed(9)}
                  </Typography>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/img/tokens/usdc.png"
                      width={24}
                      height={24}
                      alt=""
                    />
                    <Image
                      src="/img/tokens/wewe.svg"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Card>
        <Typography size="lg">By pairing with USDC, WEWESWAP:</Typography>
        <ul className="list-decimal list-inside pt-3 text-sm">
          <li>Allows you to earn a stream of stable yield (nice!)</li>
          <li>
            Is a more stable “working asset”, which means less volatility in
            total (cool!)
          </li>
          <li>
            Is paired with a volatile asset, so potentially more volume and fees
            (yay!)
          </li>
        </ul>
      </Card>
      {isConfirmed && receipt && hash && (
        <MigrateCompleteModal
          opened={openedMigrateCompleteModal}
          onClose={handleCloseCompleteModal}
          hash={hash!}
          data={{
            shares: mintAmount?.mintAmount,
            amountUsd: totalLPUSD,
            receipt: receipt,
          }}
        />
      )}
      {isError && (
        <FailTXModal
          hash={hash!}
          opened={openedMigrateFailModal}
          onClose={closeMigrateFailModal}
        />
      )}
    </>
  );
};
