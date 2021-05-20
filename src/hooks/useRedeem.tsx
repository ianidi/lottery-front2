import { useCallback, useState } from 'react';
import { useWeb3Context } from '../contexts/Web3Context';
import { logError } from '../lib/helpers';
import { redeemLottery } from '../lib/lottery';

interface Props {
  lotteryID: string
}

interface Return {
  redeemLoading: boolean
  redeemTxHash: string
  redeem: () => Promise<void>
}

export const useRedeem = ({ lotteryID }: Props): Return => {
  const { account, ethersProvider } = useWeb3Context();

  const [redeemLoading, setRedeemLoading] = useState<boolean>(false);
  const [redeemTxHash, setRedeemTxHash] = useState<string>("");

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
      setRedeemTxHash("");
      setRedeemLoading(false);
    }
  }, [lotteryID, ethersProvider, account]);

  return { redeemLoading, redeemTxHash, redeem };
};
