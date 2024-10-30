import { ConnectButton as RBConnectButton } from "@rainbow-me/rainbowkit";

import { Typography } from "./Typography";

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
                    className="bg_violet flex h-10 items-center px-4 text-black"
                  >
                    <Typography secondary size="xs" fw={700}>
                      Connect
                    </Typography>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg_violet flex h-10 items-center px-4 text-black"
                  >
                    <Typography secondary size="xs" fw={700}>
                      Wrong network
                    </Typography>
                  </button>
                );
              }

              return (
                <div className="bg_violet flex h-10 items-center gap-2 px-2">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex items-center gap-2 text-black"
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
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex items-center text-black"
                  >
                    <Typography
                      secondary
                      size="xs"
                      fw={700}
                      className="truncate"
                    >
                      {account.displayName}
                    </Typography>
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
