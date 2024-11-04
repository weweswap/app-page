export const ZapKyberABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_aggregationRouter",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "MINIMUM_AMOUNT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "aggregationRouter",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "chaosToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "errorMessage",
        "type": "string"
      }
    ],
    "name": "propagateError",
    "outputs": [],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "vault",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "inputToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenInAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "mintAmount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "token0",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "token1",
        "type": "bytes"
      }
    ],
    "name": "zapIn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "vault",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "sharesToBurn",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "tokenToSwap",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "routeToExecute",
        "type": "bytes"
      }
    ],
    "name": "zapOut",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
  