import { useWeb3Context } from 'contexts/Web3Context';
import { GRAPH_ENDPOINT } from 'lib/constants';
import {
  combineRequestsWithExecutions,
  getRequests,
} from 'lib/history';
import { useEffect, useState } from 'react';
import { defer } from 'rxjs';

export const useUserHistory = () => {
  const { account, providerChainId } = useWeb3Context();
  const [transfers, setTransfers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!account) return () => undefined;
    async function update() {
      const [
        { requests: homeRequests },
      ] = await Promise.all([
        getRequests(account, GRAPH_ENDPOINT),
      ]);
      const homeTransfers = combineRequestsWithExecutions(
        homeRequests,
        providerChainId,
      );
      const allTransfers = [...homeTransfers].sort(
        (a, b) => b.timestamp - a.timestamp,
      );
      setTransfers(allTransfers);
      setLoading(false);
    }
    setTransfers();
    setLoading(true);
    const subscription = defer(() => update()).subscribe();
    return () => subscription.unsubscribe();
  }, [providerChainId, account, GRAPH_ENDPOINT]);

  return { transfers, loading };
};
