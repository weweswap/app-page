import { Swap } from "~/components/ui";
import { SwapProvider } from "~/components/ui/Swap/SwapContext";

const SwapPage = () => {
  return (
    <SwapProvider>
      <Swap />
    </SwapProvider>
  );
};

export default SwapPage;
