import { NumberInput } from "@mantine/core";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Card, Dropdown, Typography } from "~/components/common";
import { TOKEN_LIST } from "~/constants/tokens";
import { dogica } from "~/fonts";
import api from "~/api/swap";
import { Chain } from "~/constants/chains";
import { RouteData, RouterMessageType, RouteSummary } from "~/models";
import { formatUnits } from "viem";
import { formatStringUnits } from "~/utils";
import { useAccount } from "wagmi";
import { useTokenBalance } from "~/hooks";

let inTokenOptions = TOKEN_LIST.map((token, index) => ({
  value: token.symbol,
  icon: token.icon,
  index: index,
}));

let outTokenOptions = TOKEN_LIST.map((token, index) => ({
  value: token.symbol,
  icon: token.icon,
  index: index,
}));

type SwapHomeProps = {
  onSwap: (routeData: RouteData) => void;
  onSetting: () => void;
};

export const SwapHome = ({ onSwap, onSetting }: SwapHomeProps) => {
  const { address } = useAccount();

  const [state, setState] = useState({
    loading: false,
  });
  const [inputValue, setInputValue] = useState<number>(0);
  const [routeInfo, setRouteInfo] = useState<RouteSummary>();
  const [inputTokenIndex, setInputTokenIndex] = useState<number>(0);
  const [outputTokenIndex, setOutputTokenIndex] = useState<number>(0);
  let { data: inputBalance } = useTokenBalance(
    address,
    TOKEN_LIST[inTokenOptions[inputTokenIndex].index].address
  );
  const useDebounce = (value: number, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    return debouncedValue;
  };

  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedInputValue == 0) return;
    setState({ ...state, loading: true });
    api.router
      .get(
        Chain.BASE,
        TOKEN_LIST[inputTokenIndex],
        debouncedInputValue,
        TOKEN_LIST[outputTokenIndex]
      )
      .then((res) => {
        setState({ ...state, loading: false });
        res.data.message == RouterMessageType.Succussful
          ? setRouteInfo(res.data.data.routeSummary)
          : console.log(res.data.message);
      })
      .catch((err) => {
        setState({ ...state, loading: false });
        console.error(err);
      });
  }, [inputTokenIndex, outputTokenIndex, debouncedInputValue]);

  useEffect(() => {
    outTokenOptions = TOKEN_LIST.map((token, index) => ({
      value: token.symbol,
      icon: token.icon,
      index: index,
    }));
    outTokenOptions.splice(inTokenOptions[inputTokenIndex].index, 1);
    setOutputTokenIndex(outTokenOptions[0].index);
  }, [inputTokenIndex]);
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
                root: "md:col-span-9 col-span-6",
                input: clsx(
                  dogica.className,
                  "text-start bg-transparent text-white text-2xl h-auto border-transparent rounded-none"
                ),
              }}
              defaultValue={inputValue}
              hideControls
              value={inputValue}
              onChange={(value) => setInputValue(value as number)}
            />
            <Dropdown
              defaultValue={TOKEN_LIST[inputTokenIndex].symbol}
              options={inTokenOptions}
              className="md:col-span-3 col-span-6"
              setIndexValue={setInputTokenIndex}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <Typography size="xs">
              $
              {routeInfo
                ? Number(routeInfo.amountInUsd).toLocaleString()
                : "0.00"}
            </Typography>
            <div className="flex items-center gap-1">
              <Image
                src="/img/icons/wallet.svg"
                width={16}
                height={16}
                alt=""
              />
              <Typography size="xs">
                {inputBalance.toLocaleString()}{" "}
                {inTokenOptions[inputTokenIndex].value}
              </Typography>
            </div>
          </div>
        </Card>

        <div className=" flex items-center justify-center">
          <button className="absolute bg-black border border-[3px] border_turq p-3">
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
              className={` md:col-span-9 col-span-6 ${dogica.className}
              text-start bg-transparent text-white text-2xl h-auto
              border-transparent rounded-none`}
            >
              {routeInfo
                ? formatStringUnits(
                    routeInfo.amountOut,
                    TOKEN_LIST[outputTokenIndex].decimals
                  )
                : "0.0"}
            </Typography>

            <Dropdown
              defaultValue={TOKEN_LIST[outputTokenIndex].symbol}
              value={TOKEN_LIST[outputTokenIndex].symbol}
              options={outTokenOptions}
              className="md:col-span-3 col-span-6"
              setIndexValue={setOutputTokenIndex}
            />
          </div>

          <Typography size="xs" ta="center">
          $
              {routeInfo
                ? Number(routeInfo.amountOutUsd).toLocaleString()
                : "0.00"}{" "}
                (-{routeInfo
                  ? (((1-(Number(routeInfo.amountOutUsd)/Number(routeInfo.amountInUsd)))*100)).toLocaleString()
                  : "0.00"}%)
          </Typography>
        </Card>
      </div>

      <Button
        className="w-full"
        disabled={state.loading || !routeInfo}
        onClick={() =>
          onSwap({
            routeSummary: routeInfo!,
            inputToken: TOKEN_LIST[inputTokenIndex],
            outputToken: TOKEN_LIST[outputTokenIndex],
          })
        }
      >
        <Typography secondary size="sm" tt="uppercase" fw={600}>
          SWAP
        </Typography>
      </Button>
      {inputValue != 0 && !state.loading && routeInfo && (
        <>
          <div className="flex justify-between w-full">
            <Typography size="xs">Rate</Typography>
            <Typography size="xs">
              1 {TOKEN_LIST[inputTokenIndex].symbol} ={" "}
              {(
                Number(
                  formatStringUnits(
                    routeInfo.amountOut,
                    TOKEN_LIST[outputTokenIndex].decimals
                  )
                ) /
                Number(
                  formatStringUnits(
                    routeInfo.amountIn,
                    TOKEN_LIST[inputTokenIndex].decimals
                  )
                )
              ).toLocaleString()}{" "}
              {TOKEN_LIST[outputTokenIndex].symbol} ($
              {(Number(routeInfo.amountInUsd) / inputValue)
                .toFixed(5)
                .toLocaleString()}
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
                ${Number(routeInfo.gasUsd).toLocaleString()}
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
              {routeInfo.extraFee.chargeFeeBy == ""
                ? "0.0%"
                : `${routeInfo.extraFee.chargeFeeBy}%`}
            </Typography>
            <div className="flex items-center gap-1">
              <Typography size="xs" fw={700}>
                ${Number(routeInfo.extraFee.feeAmount).toLocaleString()}
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
