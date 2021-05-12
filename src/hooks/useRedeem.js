import { useCallback, useState } from 'react';
import { useWeb3Context } from 'contexts/Web3Context';
import { logError } from 'lib/helpers';
import { redeemLottery } from 'lib/lottery';

export const useRedeem = (lotteryID) => {
  const { account, ethersProvider } = useWeb3Context();

  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemTxHash, setRedeemTxHash] = useState();

  const redeem = useCallback(async () => {
    setRedeemLoading(true);
    try {
      const tx = await redeemLottery(ethersProvider, lotteryID);
      setRedeemTxHash(tx.hash);
      await tx.wait();
    } catch (useRedeemError) {
      logError({
        useRedeemError,
        lotteryID,
        account,
      });
      throw useRedeemError;
    } finally {
      setRedeemTxHash();
      setRedeemLoading(false);
    }
  }, [lotteryID, ethersProvider, account]);

  return { redeemLoading, redeemTxHash, redeem };
};
