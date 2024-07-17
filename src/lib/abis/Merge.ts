export const MergeABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_mergeAsset",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AlreadyWithdrawn",
    type: "error",
  },
  {
    inputs: [],
    name: "DepositEnded",
    type: "error",
  },
  {
    inputs: [],
    name: "DepositInProgress",
    type: "error",
  },
  {
    inputs: [],
    name: "DepositNotStarted",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "targetAsset",
        type: "address",
      },
    ],
    name: "InvalidTargetAsset",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "targetAsset",
        type: "address",
      },
    ],
    name: "MergeAlreadyConfigured",
    type: "error",
  },
  {
    inputs: [],
    name: "MergeEnded",
    type: "error",
  },
  {
    inputs: [],
    name: "MergeInProgress",
    type: "error",
  },
  {
    inputs: [],
    name: "MergeNotStarted",
    type: "error",
  },
  {
    inputs: [],
    name: "NotEnoughMergeAssetAvailable",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroCliff",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroDepositPeriod",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroMergePeriod",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroRate",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "targetAsset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "targetAmount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "targetAsset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "swapRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "depositPeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "mergeCliff",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "mergePeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTimestamp",
            type: "uint256",
          },
        ],
        internalType: "struct IMergeManager.MergeParams",
        name: "params",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "allocatedAmount",
        type: "uint256",
      },
    ],
    name: "depositMergeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mergeAsset",
    outputs: [
      {
        internalType: "contract IERC20Metadata",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "merges",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "targetAsset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "swapRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "depositPeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "mergeCliff",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "mergePeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTimestamp",
            type: "uint256",
          },
        ],
        internalType: "struct IMergeManager.MergeParams",
        name: "params",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "allocatedAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "availableAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimedAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "depositedAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "targetWithdrawn",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "withdrawnAfterDeposit",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "withdrawnAfterMerge",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "targetAsset",
        type: "address",
      },
      {
        internalType: "address",
        name: "destination",
        type: "address",
      },
    ],
    name: "postDepositClawBack",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "targetAsset",
        type: "address",
      },
      {
        internalType: "address",
        name: "destination",
        type: "address",
      },
    ],
    name: "postMergeClawback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "released",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "targetAssets",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "targetAssetsLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "vested",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "targetAsset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "mergeAmount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "targetAsset",
        type: "address",
      },
      {
        internalType: "address",
        name: "destination",
        type: "address",
      },
    ],
    name: "withdrawTargetAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
