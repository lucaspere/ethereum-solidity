import { ArrowDownUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSwap } from '../hooks/useAMM';

export function SwapInterface() {
  const [tokenIn, setTokenIn] = useState('');
  const [tokenOut, setTokenOut] = useState('');
  const [amountIn, setAmountIn] = useState('');
  const { swap, isPending, error } = useSwap();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const handleSwap = () => {
    if (!tokenIn || !tokenOut || !amountIn) return;
    
    swap({
      args: [
        tokenIn,
        tokenOut,
        BigInt(amountIn),
        BigInt(0) // minAmountOut - implement slippage protection
      ],
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6">Swap Tokens</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Token In</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Token Address"
            value={tokenIn}
            onChange={(e) => setTokenIn(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Amount"
            value={amountIn}
            onChange={(e) => setAmountIn(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <ArrowDownUp className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Token Out</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Token Address"
            value={tokenOut}
            onChange={(e) => setTokenOut(e.target.value)}
          />
        </div>

        {isPending && <div>Swapping...</div>}
        {error && <div>Error: {error.message}</div>}

        <button
          onClick={handleSwap}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          Swap
        </button>
      </div>
    </div>
  );
}