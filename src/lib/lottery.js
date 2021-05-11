import { BigNumber, Contract } from 'ethers';
import { LOTTERY_CONTRACT_ADDRESS } from './constants';

export const createLottery = async (
  ethersProvider,
  token,
  amount,
  maxBetPercent,
  duration
) => {
  const abi = ['function create(address, uint, uint, uint)'];
  const tokenContract = new Contract(LOTTERY_CONTRACT_ADDRESS, abi, ethersProvider.getSigner());
  return tokenContract.create(token.address, amount, BigNumber.from(maxBetPercent), duration);
};
