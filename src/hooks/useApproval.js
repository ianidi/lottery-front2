import { useCallback, useEffect, useState } from 'react';
import { useWeb3Context } from 'contexts/Web3Context';
import { LARGEST_UINT256, LOCAL_STORAGE_KEYS, LOTTERY_CONTRACT_ADDRESS } from 'lib/constants';
import { logError } from 'lib/helpers';
import { approveToken, fetchAllowance } from 'lib/token';
import { useDispatch } from "react-redux";
import { setAllowance } from "store/appSlice";

const { INFINITE_UNLOCK } = LOCAL_STORAGE_KEYS;

export const useApproval = (token, recipient, amount) => {
  const dispatch = useDispatch();

  const { account, ethersProvider, providerChainId } = useWeb3Context();
  const [trigger, shouldTrigger] = useState(false);
  const updateAllowance = () => shouldTrigger(u => !u);

  useEffect(() => {
    if (token && providerChainId === token.chainId) {
      fetchAllowance(token, account, LOTTERY_CONTRACT_ADDRESS, ethersProvider).then(allowance => dispatch(setAllowance(allowance)));
    }
  }, [ethersProvider, account, token, providerChainId, trigger]);

  // useEffect(() => {
  //   setAllowed(
  //     (token && ['NATIVE', 'erc677'].includes(token.mode)) ||
  //     allowance.gte(amount),
  //   );
  // }, [amount, allowance, token]);

  const [approvalLoading, setApprovalLoading] = useState(false);
  const [approvalTxHash, setApprovalTxHash] = useState();

  const approve = useCallback(async () => {
    setApprovalLoading(true);
    // const approvalAmount =
    //   window.localStorage.getItem(INFINITE_UNLOCK) === 'true'
    //     ? LARGEST_UINT256
    //     : amount;
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
      setApprovalTxHash();
      setApprovalLoading(false);
    }
  }, [amount, token, recipient, ethersProvider, account]);

  return { updateAllowance, approvalLoading, approvalTxHash, approve };
};
