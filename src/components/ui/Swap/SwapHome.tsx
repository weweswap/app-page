import { useEffect, useState } from "react";
import Image from "next/image";
import { NumberInput } from "@mantine/core";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useQuery } from "@tanstack/react-query";
import api from "~/api/swap";
import { Button, Card, Dropdown, Typography } from "~/components/common";
import { Chain } from "~/constants/chains";
import { TOKEN_LIST } from "~/constants/tokens";
import { dogica } from "~/fonts";
import { useDebounce } from "~/hooks/useDebounce";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { RouterMessageType, RoutingData } from "~/models";
import { formatStringUnits } from "~/utils";
import clsx from "clsx";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useBalance } from "wagmi";

import { SwapButton } from "./SwapButton";
import { useSwapContext } from "./SwapContext";

const inTokenOptions = TOKEN_LIST.map((token, index) => ({
  value: token.symbol,
  icon: token.icon,
  index: index,
}));

const outTokenOptions = TOKEN_LIST.map((token, index) => ({
  value: token.symbol,
  icon: token.icon,
  index: index,
}));

type SwapHomeProps = {
  onSetting: () => void;
};

function stringToNumberRoundDownTo8Decimals(str: string) {
  const num = parseFloat(str);
  const factor = Math.pow(10, 8);
  return Math.floor(num * factor) / factor;
}

export const SwapHome = ({ onSetting }: SwapHomeProps) => {
  const { initialSwapState, swapState, setSwapState, setRouteData, routeData } =
    useSwapContext();
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const [inputValue, setInputValue] = useState<number>(0);
  const [inputTokenIndex, setInputTokenIndex] = useState<number>(0);
  const [outputTokenIndex, setOutputTokenIndex] = useState<number>(1);
  const { data: ethBalance } = useBalance({
    address: address,
  });

  const { data: inputBalance } = useTokenBalance(
    address,
    TOKEN_LIST[inTokenOptions[inputTokenIndex].index].address
  );

  const getCurrentBalance = (): bigint => {
    if (TOKEN_LIST[inTokenOptions[inputTokenIndex].index].symbol == "ETH") {
      if (!ethBalance) return 0n;
      return ethBalance!.value;
    }
    return inputBalance;
  };

  const checkHasBalance = (): boolean => {
    return (
      parseUnits(
        String(debouncedInputValue),
        TOKEN_LIST[inTokenOptions[inputTokenIndex].index].decimals
      ) <= getCurrentBalance()
    );
  };

  const { debouncedInputValue, isInputChanging } = useDebounce(inputValue, 500);

  const { isLoading: fetchLoading } = useQuery({
    queryKey: [inputTokenIndex, outputTokenIndex, debouncedInputValue],
    refetchInterval: 10000,
    queryFn: async () => {
      if (debouncedInputValue == 0) {
        setRouteData(undefined);
        return;
      }
      setSwapState({ ...initialSwapState, loading: true });

      api.router
        .get(
          Chain.BASE,
          TOKEN_LIST[inputTokenIndex],
          debouncedInputValue,
          TOKEN_LIST[outputTokenIndex]
        )
        .then((res) => {
          setSwapState({ ...swapState, loading: false });
          if (res.data.message == RouterMessageType.Successful) {
            setRouteData({
              inputToken: TOKEN_LIST[inputTokenIndex],
              outputToken: TOKEN_LIST[outputTokenIndex],
              routeSummary: (res.data.data as RoutingData).routeSummary,
              routerAddress: (res.data.data as RoutingData).routerAddress,
            });
          } else {
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          setSwapState({ ...swapState, loading: false });
          console.error(err);
        });
    },
  });

  useEffect(() => {
    if (inputTokenIndex === outputTokenIndex) {
      const isLastToken = inputTokenIndex === TOKEN_LIST.length - 1;
      const newIndex = isLastToken ? inputTokenIndex - 1 : inputTokenIndex + 1;
      if (inputTokenIndex === newIndex) {
        setOutputTokenIndex(newIndex);
      } else {
        setInputTokenIndex(newIndex);
      }
    }
  }, [inputTokenIndex, outputTokenIndex]);

  const handleReverse = () => {
    const inToken = inputTokenIndex;
    if (routeData) {
      setInputTokenIndex(outputTokenIndex);
      setInputValue(
        Number(
          formatUnits(
            BigInt(routeData.routeSummary.amountOut),
            routeData.outputToken.decimals
          )
        )
      );
      setOutputTokenIndex(inToken);
    } else {
      const tempIndex = inputTokenIndex;
      setInputTokenIndex(outputTokenIndex);
      setOutputTokenIndex(tempIndex);
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <Typography secondary size="xl" tt="uppercase">
          Swap
        </Typography>
        <Image
          src="/img/icons/settings.svg"
          className="cursor-pointer"
          onClick={onSetting}
          width={24}
          height={24}
          alt=""
        />
      </div>

      <div className="flex w-full flex-col">
        <Card className="flex flex-col gap-4">
          <Typography secondary size="xs">
            Sell
          </Typography>

          <div className="grid grid-cols-12 items-center justify-between gap-3 md:flex-row">
            <NumberInput
              classNames={{
                root: "sm:col-span-8 col-span-12",
                input: clsx(
                  dogica.className,
                  "text-start bg-transparent text-white text-2xl h-auto border-transparent rounded-none"
                ),
              }}
              defaultValue={inputValue}
              hideControls
              value={inputValue}
              onChange={(value) => setInputValue(value as number)}
              allowNegative={false}
              trimLeadingZeroesOnBlur
              thousandSeparator
              decimalScale={6}
            />
            <Dropdown
              value={TOKEN_LIST[inputTokenIndex].symbol}
              options={inTokenOptions}
              className="order-first col-span-12 sm:order-none sm:col-span-4"
              setIndexValue={setInputTokenIndex}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <Typography size="xs">
              $
              {routeData
                ? Number(routeData.routeSummary.amountInUsd).toLocaleString(
                    "en-US"
                  )
                : "0.00"}
            </Typography>
            <div
              className="flex cursor-pointer items-center gap-1"
              onClick={() => {
                setInputValue(
                  stringToNumberRoundDownTo8Decimals(
                    formatUnits(
                      getCurrentBalance(),
                      TOKEN_LIST[inTokenOptions[inputTokenIndex].index].decimals
                    )
                  )
                );
              }}
            >
              <Image
                src="/img/icons/wallet.svg"
                width={16}
                height={16}
                alt=""
              />
              <Typography size="xs">
                {Number(
                  formatUnits(
                    getCurrentBalance(),
                    TOKEN_LIST[inTokenOptions[inputTokenIndex].index].decimals
                  )
                ).toLocaleString("en-US", { maximumSignificantDigits: 6 })}{" "}
                {inTokenOptions[inputTokenIndex].value}
              </Typography>
            </div>
          </div>
        </Card>

        <div className=" flex items-center justify-center">
          <button
            className="border_turq absolute border-[3px] bg-black p-3"
            onClick={handleReverse}
          >
            <Image
              src="/img/icons/arrow_swap1.svg"
              width={16}
              height={16}
              alt=""
            />
          </button>
        </div>

        <Card className="flex flex-col gap-4">
          <Typography secondary size="xs">
            Buy
          </Typography>

          <div className="grid grid-cols-12 items-center justify-between gap-3 md:flex-row">
            <Typography
              secondary
              className={`col-span-12 h-auto
              overflow-x-auto rounded-none border-transparent bg-transparent text-start text-2xl
              text-white sm:col-span-8`}
            >
              {isInputChanging || fetchLoading ? (
                <Typography secondary className="animate-pulse">
                  Loading...
                </Typography>
              ) : routeData ? (
                Number(
                  formatStringUnits(
                    routeData.routeSummary.amountOut,
                    TOKEN_LIST[outputTokenIndex].decimals
                  )
                ).toLocaleString("en-US")
              ) : (
                "0.0"
              )}
            </Typography>

            <Dropdown
              defaultValue={TOKEN_LIST[outputTokenIndex].symbol}
              value={TOKEN_LIST[outputTokenIndex].symbol}
              options={outTokenOptions}
              className="order-first col-span-12 sm:order-none sm:col-span-4"
              setIndexValue={setOutputTokenIndex}
            />
          </div>

          <Typography size="xs" ta="center">
            $
            {routeData
              ? Number(routeData.routeSummary.amountOutUsd).toLocaleString(
                  "en-US"
                )
              : "0.00"}{" "}
            (
            {routeData
              ? Number(routeData.routeSummary.amountInUsd) == 0
                ? "0.0"
                : (
                    (1 -
                      Number(routeData.routeSummary.amountOutUsd) /
                        Number(routeData.routeSummary.amountInUsd)) *
                    -100
                  ).toLocaleString("en-US")
              : "0.00"}
            %)
          </Typography>
        </Card>
      </div>
      {isConnected ? (
        <>
          {routeData ? (
            <div className="w-full">
              <SwapButton hasBalance={checkHasBalance()} />
            </div>
          ) : (
            <Button className="w-full" disabled>
              <Typography secondary size="sm" tt="uppercase" fw={600}>
                SWAP
              </Typography>
            </Button>
          )}
        </>
      ) : (
        <>
          <Button className="w-full" onClick={openConnectModal}>
            <Typography secondary size="sm" tt="uppercase" fw={600}>
              CONNECT WALLET
            </Typography>
          </Button>
        </>
      )}

      {inputValue != 0 && routeData && (
        <>
          <div className="flex w-full justify-between">
            <Typography size="xs">Rate</Typography>
            <Typography size="xs">
              1 {TOKEN_LIST[inputTokenIndex].symbol} ={" "}
              {(
                Number(
                  formatStringUnits(
                    routeData.routeSummary.amountOut,
                    TOKEN_LIST[outputTokenIndex].decimals
                  )
                ) /
                Number(
                  formatStringUnits(
                    routeData.routeSummary.amountIn,
                    TOKEN_LIST[inputTokenIndex].decimals
                  )
                )
              ).toLocaleString("en-US")}{" "}
              {TOKEN_LIST[outputTokenIndex].symbol} ($
              {(
                Number(routeData.routeSummary.amountInUsd) / inputValue
              ).toLocaleString("en-US", { maximumFractionDigits: 5 })}
              )
            </Typography>
          </div>
          <div className="flex w-full justify-between">
            <Typography size="xs">Route</Typography>
            <Typography size="xs">Kyber Swap Aggregator</Typography>
            <Image
              src="/img/icons/arrow_down.svg"
              width={16}
              height={16}
              alt=""
            />
          </div>
          <div className="flex w-full justify-between">
            <Typography size="xs">Total cost:</Typography>
            <div className="flex items-center gap-1">
              <Image src="/img/icons/fee.svg" width={14} height={14} alt="" />
              <Typography size="xs" fw={700}>
                ${Number(routeData.routeSummary.gasUsd).toLocaleString("en-US")}
              </Typography>
              <Image
                src="/img/icons/arrow_down.svg"
                width={16}
                height={16}
                alt=""
              />
            </div>
          </div>
          <div className="flex w-full justify-between">
            <Typography size="xs">
              Total Fee:{" "}
              {routeData.routeSummary.extraFee.chargeFeeBy == ""
                ? "0.0%"
                : `${routeData.routeSummary.extraFee.chargeFeeBy}%`}
            </Typography>
            <div className="flex items-center gap-1">
              <Typography size="xs" fw={700}>
                $
                {Number(
                  routeData.routeSummary.extraFee.feeAmount
                ).toLocaleString("en-US")}
              </Typography>
              <Image
                src="/img/icons/arrow_down.svg"
                width={16}
                height={16}
                alt=""
              />
            </div>
          </div>
        </>
      )}

      <Card>
        <Typography size="lg">
          WEWESWAP uses a highly-efficient Aggregator and Zaps.
        </Typography>
        <ul className="list-inside list-decimal pt-3 text-sm">
          <li>The best prices when you swap!</li>
          <li>Low slip and fees.</li>
        </ul>
      </Card>
    </>
  );
};
