import { useCallback, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3Context } from '../contexts/Web3Context';
import { logError } from '../lib/helpers';
import { playLottery } from '../lib/lottery';

interface Props {
  lotteryID?: string
  amount: BigNumber
}

interface Return {
  playLoading: boolean
  playTxHash: string
  play: () => Promise<void>
}

export const usePlay = ({ lotteryID, amount }: Props): Return => {
  const { account, ethersProvider } = useWeb3Context();

  const [playLoading, setPlayLoading] = useState<boolean>(false);
  const [playTxHash, setPlayTxHash] = useState<string>("");

  const play = useCallback(async () => {
    setPlayLoading(true);
    try {
      const tx = await playLottery(ethersProvider, lotteryID, amount);
      setPlayTxHash(tx.hash);
      await tx.wait();
    } catch (usePlayError) {
      logError({
        usePlayError,
        lotteryID,
        amount: amount.toString(),
        account,
      });
      throw usePlayError;
    } finally {
      setPlayTxHash("");
      setPlayLoading(false);
    }
  }, [lotteryID, amount, ethersProvider, account]);

  return { playLoading, playTxHash, play };
};
