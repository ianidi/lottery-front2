import { ethers } from 'ethers';
import memoize from 'fast-memoize';
import { RPC_URL } from './constants';

const memoized = memoize(
  url => new ethers.providers.StaticJsonRpcProvider(url),
);

export const getEthersProvider = async () => {
  const rpcURL = RPC_URL;
  const provider = memoized(rpcURL);
  return provider || null;
};