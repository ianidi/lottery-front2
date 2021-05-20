import { useWeb3Context } from '../contexts/Web3Context';
import { GRAPH_ENDPOINT } from '../lib/constants';
import { getRequests, playLotteries } from '../lib/history';
import { useEffect, useState } from 'react';
import { defer } from 'rxjs';

interface Props {
  member: string
}

interface Return {
  transfers: Array<playLotteries>
  loading: boolean
}

export const useMemberHistory = ({ member }: Props): Return => {
  const { providerChainId } = useWeb3Context();
  const [transfers, setTransfers] = useState<Array<playLotteries>>([]);
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
