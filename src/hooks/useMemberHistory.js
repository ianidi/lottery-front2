import { useWeb3Context } from '../contexts/Web3Context';
import { GRAPH_ENDPOINT } from '../lib/constants';
import { getRequests } from '../lib/history';
import { useEffect, useState } from 'react';
import { defer } from 'rxjs';

export const useMemberHistory = ({ member }) => {
  const { providerChainId } = useWeb3Context();
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function update() {
      const requests = await getRequests(member, GRAPH_ENDPOINT);
      const allTransfers = requests.sort((a, b) => b.timestamp - a.timestamp);
      setTransfers(allTransfers);
      setLoading(false);
    }
    setTransfers([]);
    setLoading(true);
    const subscription = defer(() => update()).subscribe();
    return () => subscription.unsubscribe();
  }, [member, providerChainId]);

  return { transfers, loading };
};
