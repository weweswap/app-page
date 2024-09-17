export const DUMMY_TABLE_HEAD = ["Pool", "TVL", "Range", "Volume", "APR", ""]

export const DUMMY_TABLE_CONTENT = [
  {
    poolType: "MEMES 1%",
    pool: "EXOTIC",
    tvl: "$10,000,000,000.00",
    volume: "$1,000,000",
    range: "0>999999+",
    apr: "110%",
    type: "WEWE/USDC",
    logo: {
      first: "/img/tokens/wewe.png",
      second: "/img/tokens/usdc.png"
    }
  },

  // {
  //     poolType: "BLUE CHIPS 0.3%",
  //     pool: "STABLES",
  //     tvl: "$10,000,000,000.00",
  //     volume: "$1,000,000",
  //     apr: "110%",
  //     type: "USDT/USDC",
  //     logo: {
  //         first: "/img/tokens/wewe.png",
  //         second: "/img/tokens/usdc.png"
  //     }
  // },

  // {
  //     poolType: "STABLES",
  //     pool: "BLUE CHIP",
  //     tvl: "$10,000,000,000.00",
  //     volume: "$1,000,000",
  //     apr: "110%",
  //     type: "ETH/USDC",
  //     logo: {
  //         first: "/img/tokens/wewe.png",
  //         second: "/img/tokens/usdc.png"
  //     }
  // },
];

export const DUMMY_POOLS = [
  {
    title: "EXOTIC 1%",
    exchangePair: "WEWE/USDC",
    state: "Active",
    range: "INFINITY",
    apr: "420%",
    shares:"0.0000023434234",
    lpValue: "34,54",
    rewards: "45,65",
    positionId: "69",
  },
  // {
  //     title: "EXOTIC 1%",
  //     exchangePair: "WEWE/USDC",
  //     state: "Inactive",
  //     range: "NARROW",
  //     lpValue: "34,56",
  //     rewards: "45,65",
  //     positionId: "69",
  // },
  // {
  //     title: "EXOTIC 1%",
  //     exchangePair: "WEWE/USDC",
  //     state: "Active",
  //     range: "MID",
  //     lpValue: "34,56",
  //     rewards: "45,65",
  //     positionId: "69",
  // },
]

export const DUMMY_POOL_TYPES = [
  {
    title: "EXOTIC",
    description: "1% Fee Tier 6,000,000,000 WEWE ($1,000,000)  $1,000,000 volume",
    icon: "/img/tokens/wewe.png"
  },
  {
    title: "STABLE",
    description: "0.05% Fee Tier 6,000,000 USDC ($1,000,000)  $1,000,000 volume",
    icon: "/img/tokens/usdc.png"
  },
  {
    title: "BLUE CHIPS",
    description: "0.3% Fee Tier 6,000 BTC ($1,000,000)  $1,000,000 volume",
    icon: "/img/tokens/eth.png"
  }
]

export const DUMMY_POOL_OPTIONS = [
  {
    symbol: "ETH",
    icon: "/img/tokens/eth.png",
  },
  {
    symbol: "USDC",
    icon: "/img/tokens/usdc.png",
  },
  {
    symbol: "USDT",
    icon: "/img/tokens/usdt.png",
  },
  {
    symbol: "WEWE",
    icon: "/img/tokens/wewe.png",
  },
]