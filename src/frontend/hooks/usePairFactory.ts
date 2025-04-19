 
import { useReadContract, useWriteContract } from "wagmi";
import { PAIR_FACTORY_ABI, PAIR_FACTORY_ADDRESS } from "../config/pairFactory";

export function useCreatePair() {
  const { writeContract, ...context } = useWriteContract();
  return {
    ...context,
    createPair: (params: { args: unknown[] }) => {
      return writeContract({
        address: PAIR_FACTORY_ADDRESS,
        abi: PAIR_FACTORY_ABI,
        functionName: "createPair",
        args: params.args,
      });
    },
  };
}

export function useGetPair(tokenA?: string, tokenB?: string) {
  const { data, ...context } = useReadContract({
    address: PAIR_FACTORY_ADDRESS,
    abi: PAIR_FACTORY_ABI,
    functionName: "getPair",
    args: [tokenA!, tokenB!],
    query: {
      enabled: !!tokenA && !!tokenB,
    },
  });

  return {
    data: data as `0x${string}`,
    ...context,
  };
}

export function useAllPairsLength() {
  const { data, ...context } = useReadContract({
    address: PAIR_FACTORY_ADDRESS,
    abi: PAIR_FACTORY_ABI,
    functionName: "allPairsLength",
  });

  return {
    data,
    ...context,
  };
}

export function useAllPairs(index: number) {
  const { data, ...context } = useReadContract({
    address: PAIR_FACTORY_ADDRESS,
    abi: PAIR_FACTORY_ABI,
    functionName: "allPairs",
    args: [BigInt(index)],
    query: {
      enabled: !!index,
    },
  });

  return {
    data,
    ...context,
  };
}
