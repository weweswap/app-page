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
                    className="flex items-center bg_pink text-black px-4 h-10"
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
                    className="flex items-center bg_pink text-black px-4 h-10"
                  >
                    <Text size="sm" fw={700}>
                      Wrong network
                    </Text>
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-4">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex items-center text-black gap-2 bg_pink px-4 h-10"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    <Text size="sm" fw={700}>
                      {chain.name}
                    </Text>
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex items-center bg_pink text-black px-4 h-10"
                  >
                    <Text size="sm" fw={700}>
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </Text>
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
