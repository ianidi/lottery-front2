import { useCallback, useState } from 'react';
import { useWeb3Context } from 'contexts/Web3Context';
import { logError } from 'lib/helpers';
import { playLottery } from 'lib/lottery';

export const usePlay = (lotteryID, amount) => {
  const { account, ethersProvider } = useWeb3Context();

  const [playLoading, setPlayLoading] = useState(false);
  const [playTxHash, setPlayTxHash] = useState();

  const play = useCallback(async () => {
    setPlayLoading(true);
    try {
      const tx = await playLottery(ethersProvider, lotteryID, amount);
      setPlayTxHash(tx.hash);
      await tx.wait();
    } catch (usePlayError) {
      logError({
        usePlayError,
        token,
        amount: amount.toString(),
        account,
      });
      throw usePlayError;
    } finally {
      setPlayTxHash();
      setPlayLoading(false);
    }
  }, [lotteryID, amount, ethersProvider, account]);

  return { playLoading, playTxHash, play };
};
