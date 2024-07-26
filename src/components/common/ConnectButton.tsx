import { Text } from "@mantine/core";
import { ConnectButton as RBConnectButton } from "@rainbow-me/rainbowkit";

export const ConnectButton = () => {
  return (
    <RBConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="flex items-center bg_violet text-black px-4 h-10"
                  >
                    <Text size="sm" fw={700}>
                      Connect
                    </Text>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex items-center bg_violet text-black px-4 h-10"
                  >
                    <Text size="sm" fw={700}>
                      Wrong network
                    </Text>
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2 bg_violet px-2 h-10">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex items-center text-black gap-2"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 24, height: 24 }}
                          />
                        )}
                      </div>
                    )}
                    {/* <Text size="sm" fw={700}>
                      {chain.name}
                    </Text> */}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex items-center text-black"
                  >
                    <Text size="sm" fw={700} className="truncate">
                      {account.displayName}
                    </Text>
                    {/* <Text size="sm" fw={700} className="hidden md:block">
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </Text> */}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RBConnectButton.Custom>
  );
};
