import { useGetReserves } from '../hooks/useAMM';

export function ReservesDisplay() {
  const { reserves, isLoading, error } = useGetReserves();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="text-red-600">
          Error loading reserves: {error.message}
        </div>
      </div>
    );
  }

  if (!reserves) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="text-gray-500">No reserve data available</div>
      </div>
    );
  }

  const [reserveA, reserveB, lastUpdateTime] = reserves as [bigint, bigint, bigint];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6">Liquidity Pool Reserves</h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Token A Reserve</div>
          <div className="text-xl font-semibold">{reserveA.toString()}</div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Token B Reserve</div>
          <div className="text-xl font-semibold">{reserveB.toString()}</div>
        </div>

        <div className="text-sm text-gray-500 mt-4">
          Last Updated: {new Date(Number(lastUpdateTime) * 1000).toLocaleString()}
        </div>
      </div>
    </div>
  );
} 