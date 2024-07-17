"use client";

import React from "react";
import Image from "next/image";
import SwapIcon from "@/assets/img/swap.svg";
import PerlIcon from "@/assets/img/tokens/perl.png";
import BloodIcon from "@/assets/img/tokens/blood.png";
import InfoIcon from "@/assets/img/info.svg";
import { Button, DepositModal, WithdrawModal } from "@/components";
import { MergeStatus } from "@/types";
import { Popover, Text, Title, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type MergeCardProps = {
  targetAsset: `0x${string}`;
};

export const MergeCard = ({ targetAsset }: MergeCardProps) => {
  const theme = useMantineTheme();
  const [infoShowing, { close: closeInfo, open: openInfo }] =
    useDisclosure(false);
  const [
    depositModalShowing,
    { close: closeDepositModal, open: openDepositModal },
  ] = useDisclosure(false);
  const [
    withdrawModalShowing,
    { close: closeWithdrawModal, open: openWithdrawModal },
  ] = useDisclosure(false);

  const status = MergeStatus.Pending;

  const STATUS_INFO = {
    [MergeStatus.Pending]: {
      color: theme.colors.textGray2[0],
      isWithdraw: false,
    },
    [MergeStatus.Deposit]: {
      color: theme.colors.green[0],
      isWithdraw: false,
    },
    [MergeStatus.Cliff]: {
      color: theme.colors.yellow[0],
      isWithdraw: true,
    },
    [MergeStatus.Vesting]: {
      color: theme.colors.cyan[0],
      isWithdraw: true,
    },
  };

  return (
    <>
      <div className="card bg-card p-5 w-full md:w-[486px] flex flex-col items-center gap-5">
        <div className="flex items-center justify-between w-full">
          <div className="card flex items-center px-4 py-3 w-40 bg-vampire-light2 gap-3">
            <Image
              src={PerlIcon}
              alt="token1"
              className="rounded w-6 md:w-[38px]"
            />
            <Text size="md" className="flex-1" fw={600} ta="center">
              1 PERL
            </Text>
          </div>
          <Image src={SwapIcon} alt="swap" className="cursor-pointer" />
          <div className="card flex items-center px-4 py-3 w-40 bg-vampire-light2 gap-3">
            <Image
              src={BloodIcon}
              alt="token1"
              className="rounded w-6 md:w-[38px]"
            />
            <Text size="md" className="flex-1" fw={600} ta="center">
              1 BLOOD
            </Text>
          </div>
        </div>

        <div className="flex justify-between w-full">
          <div>
            <Text size="sm" fw={500}>
              Wallet Balance
            </Text>
            <div className="pt-1 flex items-end">
              <Text size="lg" fw={700}>
                2,382.09
              </Text>
              &nbsp;
              <Text size="md" fw={700}>
                PERL
              </Text>
            </div>
          </div>
          <div>
            <Text size="sm" fw={500}>
              Conversion rate
            </Text>
            <Text size="lg" fw={700} className="!mt-1">
              1 PERL = 1 BLOOD
            </Text>
          </div>
        </div>

        <hr
          className="w-full"
          style={{ borderColor: theme.colors.border[0] }}
        />

        <div className="flex justify-between w-full">
          <div>
            <Text size="md" fw={500}>
              Status
            </Text>
            <Title
              order={3}
              className="!pt-1"
              style={{ color: STATUS_INFO[status].color }}
            >
              {status.toString()}
            </Title>
          </div>
          <div>
            <Text size="md" fw={500}>
              Deposited
            </Text>
            <Title order={3} className="!pt-1">
              -
            </Title>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <Text size="md" fw={500}>
                Countdown
              </Text>
              <Popover
                width={228}
                position="bottom"
                withArrow
                opened={infoShowing}
              >
                <Popover.Target>
                  <Image
                    src={InfoIcon}
                    alt="info"
                    onMouseEnter={openInfo}
                    onMouseLeave={closeInfo}
                  />
                </Popover.Target>
                <Popover.Dropdown className="bg-vampire-light2 !rounded-xl pointer-events-none p-4 flex flex-col items-center gap-3  text-white text-sm font-medium">
                  <div className="w-full flex items-center justify-between">
                    <Text size="sm" fw={500}>
                      Deposit Period:
                    </Text>
                    <Text size="sm" fw={500}>
                      60 days
                    </Text>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <Text size="sm" fw={500}>
                      Cliff Period:
                    </Text>
                    <Text size="sm" fw={500}>
                      3 months
                    </Text>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <Text size="sm" fw={500}>
                      Vesting Period:
                    </Text>
                    <Text size="sm" fw={500}>
                      6 months
                    </Text>
                  </div>
                </Popover.Dropdown>
              </Popover>
            </div>
            <Title order={3} className="!pt-1">
              -
            </Title>
          </div>
        </div>

        {STATUS_INFO[status].isWithdraw ? (
          <Button onClick={openWithdrawModal}>Withdraw</Button>
        ) : (
          <Button onClick={openDepositModal}>Deposit</Button>
        )}
      </div>

      <DepositModal opened={depositModalShowing} onClose={closeDepositModal} />
      <WithdrawModal
        opened={withdrawModalShowing}
        onClose={closeWithdrawModal}
      />
    </>
  );
};
