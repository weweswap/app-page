export enum MergeStatus {
  Pending = "Pending",
  Deposit = "Deposit",
  Cliff = "Cliff",
  Vesting = "Vesting",
}

export type MergeParams = {
  targetAsset: `0x${string}`;
  swapRate: number;
  depositPeriod: number;
  mergeCliff: number;
  mergePeriod: number;
  startTimestamp: number;
};

export type MergeInfo = {
  params: MergeParams;
  allocatedAmount: bigint;
  availableAmount: bigint;
  claimedAmount: bigint;
  depositedAmount: bigint;
  targetWithdrawn: boolean;
  withdrawnAfterDeposit: boolean;
  withdrawnAfterMerge: boolean;
};
