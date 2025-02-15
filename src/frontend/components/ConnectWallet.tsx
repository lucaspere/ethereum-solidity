import { Loader2, Wallet } from "lucide-react";
import { useAccount, useConnect } from "wagmi";

function ConnectWallet() {
  const { connect, connectors, error, isPending } = useConnect();
  const { address, isConnected, connector } = useAccount();

  if (isConnected) {
    return (
      <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center gap-2">
        <Wallet className="w-4 h-4" />
        <span className="font-medium">{connector?.name}</span>
        <span className="text-sm text-green-600">
          {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect({ connector })}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wallet className="w-4 h-4" />
            {connector.name}
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          </button>
        ))}
      </div>
      {error && (
        <div className="px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">
          {error.message}
        </div>
      )}
    </div>
  );
}

export default ConnectWallet;