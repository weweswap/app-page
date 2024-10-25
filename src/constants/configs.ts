export const RAILWAY_APP_API = "https://app-backend-production-676d.up.railway.app/api";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || RAILWAY_APP_API;
  
export const ETH_TO_USD_CONVERSION_API = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"