import { ethers } from 'ethers';
import memoize from 'fast-memoize';
import { getRPCUrl } from 'lib/helpers';

const memoized = memoize(
  url => new ethers.providers.StaticJsonRpcProvider(url),
);

export const getEthersProvider = async chainId => {
  const rpcURL = getRPCUrl(chainId);
  const provider = memoized(rpcURL);
  return provider || null;
};