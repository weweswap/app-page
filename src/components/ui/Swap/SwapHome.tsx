import { NumberInput } from "@mantine/core";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Card, Dropdown, Typography } from "~/components/common";
import { TOKEN_LIST } from "~/constants/tokens";
import { dogica } from "~/fonts";
import api from "~/api/swap";
import { Chain } from "~/constants/chains";
import { RouterMessageType, RoutingData } from "~/models";
import { formatUnits, parseEther, parseUnits } from "viem";
import { formatBigIntegers, formatStringUnits } from "~/utils";
import { useAccount, useBalance } from "wagmi";
import { SwapButton } from "./SwapButton";
import { useSwapContext } from "./SwapContext";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { useDebounce } from "~/hooks/useDebounce";



let inTokenOptions = TOKEN_LIST.map((token, index) => ({
  value: token.symbol,
  icon: token.icon,
  index: index
}));
// interval ref
let intervalId: any = null;

let outTokenOptions = TOKEN_LIST.map((token, index) => ({
  value: token.symbol,
  icon: token.icon,
  index: index
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

  let {
    data: inputBalance,
    refetch: refetchBalance,
  } = useTokenBalance(
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

  const debouncedInputValue = useDebounce(inputValue, 500);

  const clearRouteChecking = () => {
    if (intervalId) clearInterval(intervalId);
  };

  useEffect(() => {
    const intervalId = setInterval(() => refetchBalance(), 5000);
    return () => {
      clearRouteChecking();
      clearInterval(intervalId)
    };
  }, []);

  useEffect(() => {
    if (debouncedInputValue == 0) {
      setRouteData(undefined);
      clearRouteChecking();
      return;
    }
    clearRouteChecking();
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
        res.data.message == RouterMessageType.Successful
          ? setRouteData({
            inputToken: TOKEN_LIST[inputTokenIndex],
            outputToken: TOKEN_LIST[outputTokenIndex],
            routeSummary: (res.data.data as RoutingData).routeSummary,
            routerAddress: (res.data.data as RoutingData).routerAddress,
          })
          : //  setrouteData(res.data.data as RoutingData)
          console.log(res.data.message);
      })
      .catch((err) => {
        setSwapState({ ...swapState, loading: false });
        console.error(err);
      });
    intervalId = setInterval(() => {
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
          res.data.message == RouterMessageType.Successful
            ? setRouteData({
              inputToken: TOKEN_LIST[inputTokenIndex],
              outputToken: TOKEN_LIST[outputTokenIndex],
              routeSummary: (res.data.data as RoutingData).routeSummary,
              routerAddress: (res.data.data as RoutingData).routerAddress,
            })
            : //  setrouteData(res.data.data as RoutingData)
            console.log(res.data.message);
        })
        .catch((err) => {
          setSwapState({ ...swapState, loading: false });
          console.error(err);
        });
    }, 5000);

    return () => {
      clearInterval(intervalId)
    }
  }, [inputTokenIndex, outputTokenIndex, debouncedInputValue]);


  useEffect(() => {
    if(inputTokenIndex == outputTokenIndex && outputTokenIndex == TOKEN_LIST.length - 1) {
      setOutputTokenIndex(outputTokenIndex-1)
    }
    else if(inputTokenIndex == outputTokenIndex) {
      setOutputTokenIndex(outputTokenIndex+1)
    }
  }, [inputTokenIndex])

  useEffect(() => {
    if(inputTokenIndex == outputTokenIndex && inputTokenIndex == TOKEN_LIST.length - 1) {
      setInputTokenIndex(inputTokenIndex-1)
    }
    else if(inputTokenIndex == outputTokenIndex) {
      setInputTokenIndex(inputTokenIndex+1)
    }
  }, [outputTokenIndex])


  const handleReverse = () => {
    let inToken = inputTokenIndex;
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
    } 
    else {
      setOutputTokenIndex(inputTokenIndex);
      setInputTokenIndex(outputTokenIndex);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-between">
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

      <div className="w-full flex flex-col">
        <Card className="flex flex-col gap-4">
          <Typography secondary size="xs">
            Sell
          </Typography>

          <div className="grid grid-cols-12 md:flex-row items-center justify-between gap-3">
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
              className="order-first sm:order-none sm:col-span-4 col-span-12"
              setIndexValue={setInputTokenIndex}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <Typography size="xs">
              $
              {routeData
                ? Number(routeData.routeSummary.amountInUsd).toLocaleString("en-US")
                : "0.00"}
            </Typography>
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => {
              setInputValue(stringToNumberRoundDownTo8Decimals(formatUnits(
                getCurrentBalance(),
                TOKEN_LIST[inTokenOptions[inputTokenIndex].index].decimals
              )))
            }}>
              <Image
                src="/img/icons/wallet.svg"
                width={16}
                height={16}
                alt=""
              />
              <Typography size="xs">
                {Number(formatUnits(
                  getCurrentBalance(),
                  TOKEN_LIST[inTokenOptions[inputTokenIndex].index].decimals
                )).toLocaleString("en-US", { maximumSignificantDigits: 6 })}{" "}
                {inTokenOptions[inputTokenIndex].value}
              </Typography>
            </div>
          </div>
        </Card>

        <div className=" flex items-center justify-center">
          <button
            className="absolute bg-black border border-[3px] border_turq p-3"
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

          <div className="grid grid-cols-12 md:flex-row items-center justify-between gap-3">
            <Typography
              secondary
              className={`sm:col-span-8 col-span-12
              text-start bg-transparent text-white text-2xl h-auto overflow-x-auto
              border-transparent rounded-none`}
            >
              {routeData
                ? Number(
                  formatStringUnits(
                    routeData.routeSummary.amountOut,
                    TOKEN_LIST[outputTokenIndex].decimals
                  )
                ).toLocaleString("en-US")
                : "0.0"}
            </Typography>

            <Dropdown
              defaultValue={TOKEN_LIST[outputTokenIndex].symbol}
              value={TOKEN_LIST[outputTokenIndex].symbol}
              options={outTokenOptions}
              className="order-first sm:order-none sm:col-span-4 col-span-12"
              setIndexValue={setOutputTokenIndex}
            />
          </div>

          <Typography size="xs" ta="center">
            $
            {routeData
              ? Number(routeData.routeSummary.amountOutUsd).toLocaleString("en-US")
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
            <div className="w-full" onClick={() => clearRouteChecking()}>
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
          <div className="flex justify-between w-full">
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
              {(Number(routeData.routeSummary.amountInUsd) / inputValue)
                .toLocaleString("en-US", { maximumFractionDigits: 5 })}
              )
            </Typography>
          </div>
          <div className="flex justify-between w-full">
            <Typography size="xs">Route</Typography>
            <Typography size="xs">Kyber Swap Aggregator</Typography>
            <Image
              src="/img/icons/arrow_down.svg"
              width={16}
              height={16}
              alt=""
            />
          </div>
          <div className="flex justify-between w-full">
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
          <div className="flex justify-between w-full">
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
        <ul className="list-decimal list-inside pt-3 text-sm">
          <li>The best prices when you swap!</li>
          <li>Low slip and fees.</li>
        </ul>
      </Card>
    </>
  );
};
