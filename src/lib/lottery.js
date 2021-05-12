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

export const playLottery = async (
  ethersProvider,
  lotteryID,
  amount
) => {
  const abi = ['function play(uint, uint)'];
  const tokenContract = new Contract(LOTTERY_CONTRACT_ADDRESS, abi, ethersProvider.getSigner());
  return tokenContract.play(lotteryID, amount);
};

export const redeemLottery = async (
  ethersProvider,
  lotteryID
) => {
  const abi = ['function redeem(uint)'];
  const tokenContract = new Contract(LOTTERY_CONTRACT_ADDRESS, abi, ethersProvider.getSigner());
  return tokenContract.redeem(lotteryID);
};
