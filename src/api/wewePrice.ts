import axios from "axios";

export const fetchWewePrice = async () => {
  const contract = "0x6b9bb36519538e0c073894e964e90172e1c0b41f";
  const API_URL = `https://api.coingecko.com/api/v3/simple/token_price/base?contract_addresses=${contract}&vs_currencies=usd`;
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data[contract].usd;
  } catch (error) {
    console.error("Error fetching WEWE data:", error);
    throw error;
  }
};
