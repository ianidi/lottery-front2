import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from "ethers"
import { useWeb3Context } from '../contexts/Web3Context';
import { LOTTERY_CONTRACT_ADDRESS, DEFAULT_TOKEN } from '../lib/constants';
import { logError } from '../lib/helpers';
import { approveToken, fetchAllowance } from '../lib/token';
import { useDispatch } from "react-redux";
import { setAllowance } from "../store/appSlice";

interface Props {
  token: typeof DEFAULT_TOKEN
  recipient: string
  amount: BigNumber
}

interface Return {
  approvalLoading: boolean
  approvalTxHash: string
  updateAllowance: () => void
  approve: () => Promise<void>
}

export const useApproval = ({ token, recipient, amount }: Props): Return => {
  const dispatch = useDispatch();

  const { account, ethersProvider, providerChainId } = useWeb3Context();
  const [trigger, shouldTrigger] = useState(false);
  const updateAllowance = () => shouldTrigger(u => !u);

  useEffect(() => {
    if (token && providerChainId === token.chainId) {
      fetchAllowance(token, account, LOTTERY_CONTRACT_ADDRESS, ethersProvider).then(allowance => dispatch(setAllowance(allowance)));
    }
  }, [ethersProvider, account, token, providerChainId, trigger, dispatch]);

  const [approvalLoading, setApprovalLoading] = useState(false);
  const [approvalTxHash, setApprovalTxHash] = useState("");

  const approve = useCallback(async () => {
    setApprovalLoading(true);
    const approvalAmount = amount;
    try {
      const tx = await approveToken(ethersProvider, token, recipient, approvalAmount);
      setApprovalTxHash(tx.hash);
      await tx.wait();
      dispatch(setAllowance(approvalAmount));
    } catch (approveError) {
      logError({
        approveError,
        token,
        approvalAmount: approvalAmount.toString(),
        account,
      });
      throw approveError;
    } finally {
      setApprovalTxHash("");
      setApprovalLoading(false);
    }
  }, [amount, token, recipient, ethersProvider, account, dispatch]);

  return { updateAllowance, approvalLoading, approvalTxHash, approve };
};
