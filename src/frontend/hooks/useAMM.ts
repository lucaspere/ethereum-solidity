import { useReadContract, useWriteContract } from 'wagmi';
import { AMM_ABI, AMM_CONTRACT_ADDRESS } from '../config/contracts';

export function useSwap() {
  const { writeContract, ...context } = useWriteContract();
  
  return {
    ...context,
    swap: (params: { args: unknown[] }) => {
      return writeContract({
        address: AMM_CONTRACT_ADDRESS,
        abi: AMM_ABI,
        functionName: 'swap',
        args: params.args
      });
    }
  };
}

export function useAddLiquidity() {
  const { writeContract, ...context } = useWriteContract();
  
  return {
    ...context,
    addLiquidity: (params: { args: unknown[] }) => {
      return writeContract({
        address: AMM_CONTRACT_ADDRESS,
        abi: AMM_ABI,
        functionName: 'addLiquidity',
        args: params.args
      });
    }
  };
}

export function useRemoveLiquidity() {
  const { writeContract, ...context } = useWriteContract();
  
  return {
    ...context,
    removeLiquidity: (params: { args: unknown[] }) => {
      return writeContract({
        address: AMM_CONTRACT_ADDRESS,
        abi: AMM_ABI,
        functionName: 'removeLiquidity',
        args: params.args
      });
    }
  };
}

export function useGetReserves() {
  const { data, ...context } = useReadContract({ abi: AMM_ABI, address: AMM_CONTRACT_ADDRESS, functionName: 'getReserves' });

  return {
    ...context,
    reserves: data
  };
}