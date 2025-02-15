import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  createConfig,
  deserialize,
  http,
  serialize,
  WagmiProvider,
} from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import ConnectWallet from "./components/ConnectWallet";
import { LiquidityInterface } from "./components/LiquidityInterface";
import PairFactory from "./components/PairFactory";
import { SwapInterface } from "./components/SwapInterface";

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(
      "https://responsive-side-panorama.ethereum-sepolia.quiknode.pro/e879fa55f9e2ecbbce9b5f8847f1dadbd6d60379"
    ),
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
  serialize,
  deserialize,
});

function App() {
  const [activeTab, setActiveTab] = useState<"swap" | "liquidity" | "factory">(
    "swap"
  );

  return (
    <WagmiProvider config={config}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900">AMM DEX</h1>
              <ConnectWallet />
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="flex">
                  <button
                    className={`px-6 py-3 text-sm font-medium rounded-tl-lg rounded-bl-lg ${
                      activeTab === "swap"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("swap")}
                  >
                    Swap
                  </button>
                  <button
                    className={`px-6 py-3 text-sm font-medium rounded-tr-lg rounded-br-lg ${
                      activeTab === "liquidity"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("liquidity")}
                  >
                    Liquidity
                  </button>
                  <button
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === "factory"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("factory")}
                  >
                    Factory
                  </button>
                </div>
              </div>

              {activeTab === "swap" && <SwapInterface />}
              {activeTab === "liquidity" && <LiquidityInterface />}
              {activeTab === "factory" && <PairFactory />}
              {/* <ReservesDisplay /> */}
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </PersistQueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
