import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAddLiquidity, useRemoveLiquidity } from '../hooks/useAMM';

export function LiquidityInterface() {
  const [tokenA, setTokenA] = useState('');
  const [tokenB, setTokenB] = useState('');
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [liquidity, setLiquidity] = useState('');

  const { addLiquidity, error: addLiquidityError } = useAddLiquidity();
  const { removeLiquidity, error: removeLiquidityError } = useRemoveLiquidity();

  useEffect(() => {
    if (addLiquidityError) {
      toast.error(addLiquidityError.message);
    }
  }, [addLiquidityError]);

  useEffect(() => {
    if (removeLiquidityError) {
      toast.error(removeLiquidityError.message);
    }
  }, [removeLiquidityError]);

  const handleAddLiquidity = () => {
    if (!tokenA || !tokenB || !amountA || !amountB) return;

    addLiquidity({
      args: [
        tokenA,
        tokenB,
        BigInt(amountA),
        BigInt(amountB),
        BigInt(0), // minA - implement slippage protection
        BigInt(0), // minB - implement slippage protection
      ],
    });
  };

  const handleRemoveLiquidity = () => {
    if (!tokenA || !tokenB || !liquidity) return;

    removeLiquidity({
      args: [
        tokenA,
        tokenB,
        BigInt(liquidity),
        BigInt(0), // minA - implement slippage protection
        BigInt(0), // minB - implement slippage protection
      ],
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <div className="flex gap-4 mb-6">
        <button className="flex-1 py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
          <Plus className="w-5 h-5 inline-block mr-2" />
          Add
        </button>
        <button className="flex-1 py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition-colors">
          <Minus className="w-5 h-5 inline-block mr-2" />
          Remove
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Token A</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Token Address"
            value={tokenA}
            onChange={(e) => setTokenA(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Amount"
            value={amountA}
            onChange={(e) => setAmountA(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Token B</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Token Address"
            value={tokenB}
            onChange={(e) => setTokenB(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Amount"
            value={amountB}
            onChange={(e) => setAmountB(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">LP Tokens (for removal)</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Amount of LP tokens"
            value={liquidity}
            onChange={(e) => setLiquidity(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <button
            onClick={handleAddLiquidity}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            Add Liquidity
          </button>
          <button
            onClick={handleRemoveLiquidity}
            className="w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
          >
            Remove Liquidity
          </button>
        </div>
      </div>
    </div>
  );
}