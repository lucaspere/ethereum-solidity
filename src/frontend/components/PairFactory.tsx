import { Loader2, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useWaitForTransactionReceipt } from 'wagmi';
import { useAllPairsLength, useCreatePair, useGetPair } from '../hooks/usePairFactory';

function PairFactory() {
  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const { data: pairAddress, isPending: isPairLoading } = useGetPair(tokenA, tokenB);
  const { createPair, isPending: isCreating, data: hash, error } = useCreatePair();
  const { data: pairsLength } = useAllPairsLength();

  const handleCreatePair = () => {
    if (!tokenA || !tokenB) return;
    createPair({ args: [tokenA, tokenB] });
  };
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  
  useEffect(() => {
    if (hash) {
      toast.success("Pair created successfully");
    }
  }, [hash]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Pair Factory</h2>
        <div className="text-sm text-gray-500">
          Total Pairs: {pairsLength ? pairsLength.toString() : '0'}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Token A</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Token A Address"
            value={tokenA}
            onChange={(e) => setTokenA(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Token B</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Token B Address"
            value={tokenB}
            onChange={(e) => setTokenB(e.target.value)}
          />
        </div>

        {tokenA && tokenB && isPairLoading ? (
          <div className="flex items-center justify-center py-2">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          </div>
        ) : pairAddress && pairAddress !== '0x0000000000000000000000000000000000000000' ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-sm font-medium text-green-800">Existing Pair Found</div>
            <div className="text-sm text-green-600 break-all">{pairAddress}</div>
          </div>
        ) : (
          tokenA && tokenB && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-sm text-yellow-800">No pair exists for these tokens</div>
            </div>
          )
        )}

        <button
          onClick={handleCreatePair}
          disabled={!tokenA || !tokenB || isCreating || (pairAddress && pairAddress !== '0x0000000000000000000000000000000000000000')}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isCreating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating Pair...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Create Pair
            </>
          )}
        </button>
        {error && <div>Error: {error.message}</div>}
        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Confirming transaction...</div>}
        {isConfirmed && <div>Transaction confirmed</div>}
      </div>
    </div>
  );
}

export default PairFactory;