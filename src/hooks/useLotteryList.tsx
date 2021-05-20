import { useWeb3Context } from '../contexts/Web3Context';
import { GRAPH_ENDPOINT } from '../lib/constants';
import { getRequests, createLotteries } from '../lib/list';
import { useEffect, useState } from 'react';
import { defer } from 'rxjs';

interface Return {
  transfers: Array<createLotteries>
  loading: boolean
}

export const useLotteryList = (): Return => {
  const { providerChainId } = useWeb3Context();
  const [transfers, setTransfers] = useState<Array<createLotteries>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function update() {
      const requests = await getRequests(GRAPH_ENDPOINT);
      const allTransfers = requests.sort((a, b) => b.timestamp - a.timestamp);
      setTransfers(allTransfers);
      setLoading(false);
    }
    setTransfers([]);
    setLoading(true);
    const subscription = defer(() => update()).subscribe();
    return () => subscription.unsubscribe();
  }, [providerChainId]);

  return { transfers, loading };
};
