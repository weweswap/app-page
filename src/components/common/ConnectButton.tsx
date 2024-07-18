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
                    className="bg-white px-8 py-2"
                  >
                    <Text size="sm">Connect</Text>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-white px-8 py-2"
                  >
                    <Text size="sm">Wrong network</Text>
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-4">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex items-center gap-2 bg-white p-2"
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
                    <Text size="sm">{chain.name}</Text>
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="bg-white p-2"
                  >
                    <Text size="sm">
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
