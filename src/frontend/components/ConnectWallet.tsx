import { ChevronDown, Loader2, LogOut, Wallet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function ConnectWallet() {
  const { connect, connectors, error, isPending } = useConnect();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { address, isConnected, connector } = useAccount();
  const { disconnect, isPending: isDisconnecting } = useDisconnect();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (error) {
    toast.error(error.message);
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center gap-2">
          <Wallet className="w-4 h-4 text-green-700" />
          <span className="font-medium text-green-700">{connector?.name}</span>
          <span className="text-sm text-green-600">
            {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
          </span>
        </div>
        <button
          onClick={() => disconnect({ connector })}
          disabled={isDisconnecting}
          className="p-2 hover:bg-red-50 text-red-600 rounded-lg border border-red-200 flex items-center justify-center transition-colors"
          title="Disconnect wallet"
        >
          {isDisconnecting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <LogOut className="w-4 h-4" />
          )}
          <span className="text-sm">Disconnect</span>
        </button>
      </div>
    );
  }
  
  return (
    <div className="relative" ref={dropdownRef}>
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
    >
      <Wallet className="w-4 h-4" />
      Connect Wallet
      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>

    {isOpen && (
      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => {
              connect({ connector });
              setIsOpen(false);
            }}
            disabled={isPending}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wallet className="w-4 h-4" />
            {connector.name}
            {isPending && <Loader2 className="w-4 h-4 animate-spin ml-auto" />}
          </button>
        ))}
      </div>
    )}
  </div>
  );
}

export default ConnectWallet;
