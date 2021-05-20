import { useCallback, useState } from 'react';
import { BigNumber } from "ethers"
import { useWeb3Context } from '../contexts/Web3Context';
import { logError } from '../lib/helpers';
import { createLottery } from '../lib/lottery';
import { DEFAULT_TOKEN } from "../lib/constants";

interface Props {
  token: typeof DEFAULT_TOKEN
  amount: BigNumber
  maxBetPercent: number
  duration: BigNumber
}

interface Return {
  createLoading: boolean
  createTxHash: string
  create: () => Promise<void>
}

export const useCreate = ({ token, amount, maxBetPercent, duration }: Props): Return => {
  const { account, ethersProvider } = useWeb3Context();

  const [createLoading, setCreateLoading] = useState(false);
  const [createTxHash, setCreateTxHash] = useState("");

  const create = useCallback(async () => {
    setCreateLoading(true);
    try {
      const tx = await createLottery(ethersProvider, token, amount, maxBetPercent, duration);
      setCreateTxHash(tx.hash);
      await tx.wait();
    } catch (useCreateError) {
      logError({
        useCreateError,
        token,
        amount: amount.toString(),
        account,
      });
      throw useCreateError;
    } finally {
      setCreateTxHash("");
      setCreateLoading(false);
    }
  }, [amount, token, maxBetPercent, duration, ethersProvider, account]);

  return { createLoading, createTxHash, create };
};
