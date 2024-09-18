import axios from "axios";

const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_KEY) {
    return 'https://pro-api.coingecko.com/api/v3'
  }
  return 'https://api.coingecko.com/api/v3'
}

const callCoingeckoApi = (url: string) => {
  if (process.env.NEXT_PUBLIC_API_KEY) {
    console.log('Private request')
    return axios.get(url, {
      headers: {
        'x-cg-pro-api-key': process.env.NEXT_PUBLIC_API_KEY,
      },
    });
  }
  console.log('Public request')
  return axios.get(url)
}

export const fetchWewePrice = async () => {
  const contract = "0x6b9bb36519538e0c073894e964e90172e1c0b41f";
  const API_URL = `${getApiBaseUrl()}/simple/token_price/base?contract_addresses=${contract}&vs_currencies=usd`;
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data[contract].usd;
  } catch (error) {
    console.error("Error fetching WEWE data:", error);
    throw error;
  }
};

export async function fetchETHPriceInUSD() {
  const response = await fetch(
    `${getApiBaseUrl()}/simple/price?ids=ethereum&vs_currencies=usd`
  );
  const data = await response.json();
  return data.ethereum.usd;
}

export async function fetchPricePercontractAddress(address: string) {
  const API_URL = `${getApiBaseUrl()}/simple/token_price/base?contract_addresses=${address}&vs_currencies=usd`;
  try {
    const response = await callCoingeckoApi(API_URL)
    return response.data[address.toLowerCase()].usd;
  } catch (error) {
    throw error;
  }
}

// blockHash
// : 
// "0xd7248fabe74f12517a033cc77b1e6e1107774b31c46e5f5a48cd7a7573812dcc"
// blockNumber
// : 
// 19731216n
// chainId
// : 
// 8453
// contractAddress
// : 
// null
// cumulativeGasUsed
// : 
// 13169715n
// effectiveGasPrice
// : 
// 6825869n
// from
// : 
// "0x6159dfaebea7522a493ad1d402b3b5aafb8e1e37"
// gasUsed
// : 
// 881411n
// l1BaseFeeScalar
// : 
// "0x8dd"
// l1BlobBaseFee
// : 
// "0x1"
// l1BlobBaseFeeScalar
// : 
// "0x101c12"
// l1Fee
// : 
// 14780801381n
// l1FeeScalar
// : 
// null
// l1GasPrice
// : 
// 3799792101n
// l1GasUsed
// : 
// 1714n
// logs
// : 
// (37) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// logsBloom
// : 
// "0x0000000000000000000010000200000002000000000000000004000000000000000000001000000000000010000010000000000000882000060000000030020000000000000000080002000880000000000001000008001000000000000020101080001082008000000001080000080000000800010400001000801000080001000000000980000000010000000000000000a00001200000000a000000000001020000040000000000000000a00000000000a0000000000a000320040000000a00000002280400018000180000000000000000000000000000000400000820000810080004040000004800008200040000000001000000408000000000000800"
// status
// : 
// "success"
// to
// : 
// "0x03a520b32c04bf3beef7beb72e919cf822ed34f1"
// transactionHash
// : 
// "0x94682c3dfee926849d7ebf069db674e6e4f60ee4576f5557d317a7f24a48a05a"
// transactionIndex
// : 
// 85
// type
// : 
// "eip1559"

// blockHash : "0x86800950a68aed2479290634fa128dad878108332a6678073f76649d8783e99a"
// blockNumber : 19731501n
// chainId : 8453
// contractAddress : null
// cumulativeGasUsed : 12470974n
// effectiveGasPrice : 5918730n
// from : "0x6159dfaebea7522a493ad1d402b3b5aafb8e1e37"
// gasUsed : 813068n
// l1BaseFeeScalar : "0x8dd"
// l1BlobBaseFee : "0x1"
// l1BlobBaseFeeScalar : "0x101c12"
// l1Fee : 12140256071n
// l1FeeScalar : null
// l1GasPrice : 3145527797n
// l1GasUsed : 1700n
// logs : (36) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// logsBloom : "0x0000000000000000000010000200000002000000000000000004000000000000000000001000000000000010000010000000000000882000060000000030020000000000000000080202000880000000000001000008001000000000000020001080001082008000000001080000080000000800010400001000801000080001000000000980000000010001000000000000a00001200000000a000000000001020000040000000000000000a00000000000a0080000000a000320040000000200000002280400018000180000000000000000000000000000000400000820000810080000040000004800008200040000000001000000408000000000000800"
// status
// : 
// "success"
// to
// : 
// "0x03a520b32c04bf3beef7beb72e919cf822ed34f1"
// transactionHash
// : 
// "0xfd69b2df291282aaa59eb624d4250ef49e5d44616e134f20ba08ecdadf4f5213"
// transactionIndex
// : 
// 60
// type
// : 
// "eip1559"