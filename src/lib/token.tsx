import { BigNumber, Contract, utils } from 'ethers';
import { ADDRESS_ZERO } from './constants';
import { logError } from './helpers';
import { getEthersProvider } from './providers';

export const fetchAllowance = async (
  { address }: any,
  account: any,
  delegate: any,
  ethersProvider: any,
) => {
  if (
    !account ||
    !address ||
    address === ADDRESS_ZERO ||
    !delegate ||
    delegate === ADDRESS_ZERO ||
    !ethersProvider
  ) {
    return BigNumber.from(0);
  }

  try {
    const abi = ['function allowance(address, address) view returns (uint256)'];
    const tokenContract = new Contract(address, abi, ethersProvider);
    return tokenContract.allowance(account, delegate);
  } catch (allowanceError) {
    logError({ allowanceError });
  }
  return BigNumber.from(0);
};

export const fetchTokenName = async (token: any) => {
  const ethersProvider = await getEthersProvider();
  const abi = ['function name() view returns (string)'];
  const tokenContract = new Contract(token.address, abi, ethersProvider);
  return tokenContract.name();
};

export const fetchTokenDetailsBytes32 = async (token: any) => {
  const ethersProvider = await getEthersProvider();
  const abi = [
    'function decimals() view returns (uint8)',
    'function symbol() view returns (bytes32)',
    'function name() view returns (bytes32)',
  ];
  const tokenContract = new Contract(token.address, abi, ethersProvider);
  const [name, symbol, decimals] = await Promise.all([
    tokenContract.name(),
    tokenContract.symbol(),
    tokenContract.decimals(),
  ]);
  return {
    name: utils.parseBytes32String(name),
    symbol: utils.parseBytes32String(symbol),
    decimals,
  };
};

export const fetchTokenDetailsString = async (token: any) => {
  const ethersProvider = await getEthersProvider();
  const abi = [
    'function decimals() view returns (uint8)',
    'function symbol() view returns (string)',
    'function name() view returns (string)',
  ];
  const tokenContract = new Contract(token.address, abi, ethersProvider);

  const [name, symbol, decimals] = await Promise.all([
    tokenContract.name(),
    tokenContract.symbol(),
    tokenContract.decimals(),
  ]);

  return { name, symbol, decimals };
};

const fetchTokenDetailsFromContract = async (token: any) => {
  let details = {};
  try {
    details = await fetchTokenDetailsString(token);
  } catch {
    details = await fetchTokenDetailsBytes32(token);
  }
  return details;
};

export const fetchTokenDetails = async (token: any) => {
  const [{ name, symbol, decimals }]: any = await Promise.all([
    fetchTokenDetailsFromContract(token),
  ]);

  return {
    ...token,
    name,
    symbol,
    decimals: Number(decimals)
  };
};

export const approveToken = async (
  ethersProvider: any,
  { address }: any,
  recipient: any,
  amount: any,
) => {
  const abi = ['function approve(address, uint256)'];
  const tokenContract = new Contract(address, abi, ethersProvider.getSigner());
  return tokenContract.approve(recipient, amount);
};

export const fetchTokenBalance = async (token: any, account: any) => {
  const ethersProvider = await getEthersProvider();
  return fetchTokenBalanceWithProvider(ethersProvider, token, account);
};

export const fetchTokenBalanceWithProvider = async (
  ethersProvider: any,
  { address }: any,
  account: any,
) => {
  if (address === ADDRESS_ZERO) {
    return ethersProvider.getBalance(account);
  }
  if (!account || !address || address === ADDRESS_ZERO || !ethersProvider) {
    return BigNumber.from(0);
  }
  try {
    const abi = ['function balanceOf(address) view returns (uint256)'];
    const tokenContract = new Contract(address, abi, ethersProvider);
    const balance = await tokenContract.balanceOf(account);
    return balance;
  } catch (error) {
    logError({ balanceError: error });
  }

  return BigNumber.from(0);
};
