import { Pool } from "~/components/ui";
import { PoolProvider } from "~/components/ui/Pool/PoolContext";

const PoolPage = () => {
  return (
    <PoolProvider>
      <Pool />
    </PoolProvider>
  );
};

export default PoolPage;
