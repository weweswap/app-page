import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TokenItem } from "~/models";
import { fetchPricePerAddressInUsdc } from "~/services/price";
import { provider } from "./provider";
import { ArrakisVaultABI } from "~/lib/abis/ArrakisVault";
import { ethers } from "ethers";
import { Hex } from "viem";

export function useGetBurnEvents(wewePoolAddress?: Hex, hash?: Hex): UseQueryResult<any | null, Error | null> {
    return useQuery({
      queryKey: ["burn-events-tokens", wewePoolAddress, hash],
      queryFn: async (): Promise<any | null> => {

        if (!wewePoolAddress || !hash) {
            return null
        }
        // Replace with your contract address and the ABI
        const contract = new ethers.Contract(wewePoolAddress, ArrakisVaultABI, provider);
      
        // Define the event you want to listen to (replace with your event name)
        const eventName = "LogBurn";

        const blockNumber = await provider.getBlockNumber();
      
        const fromBlock = blockNumber - 100;
        const toBlock = blockNumber;
      
        // Query for past events
        const events = await contract.queryFilter(
          contract.filters[eventName](),
          fromBlock,
          toBlock
        );

        const filteredEvent = events.find(event => event.transactionHash === hash)

        return filteredEvent || null
      },
      refetchInterval: 5000
    }, );
}