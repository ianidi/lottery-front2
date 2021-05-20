import { createSlice } from "@reduxjs/toolkit";
import { BigNumber } from "ethers";
import { RootState } from "./";
import { DEFAULT_TOKEN } from "../lib/constants";

interface initialState {
  token: typeof DEFAULT_TOKEN
  amount: string
  balance: string
  allowance: string
  maxBetPercent: number
  formula: number
  duration: string
  selectedLottery: Lottery
}

export interface Lottery {
  tokenSymbol: string
  tokenName: string
  tokenDecimals: number
  formula: number
  liquidity: string
  collateral: string
  lotteryID: string
  maxBetPercent: number
}

const initialState: initialState = {
  token: DEFAULT_TOKEN,
  amount: "0",
  balance: "0",
  allowance: "0",
  maxBetPercent: 10,
  formula: 1,
  duration: "0",
  selectedLottery: {
    tokenSymbol: "",
    tokenName: "",
    tokenDecimals: 0,
    formula: 1,
    liquidity: "",
    collateral: "",
    lotteryID: "",
    maxBetPercent: 1
  }
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload.toString();
    },
    setBalance: (state, action) => {
      state.balance = action.payload.toString();
    },
    setAllowance: (state, action) => {
      state.allowance = BigNumber.from(action.payload).toString();
    },
    setMaxBetPercent: (state, action) => {
      state.maxBetPercent = action.payload;
    },
    setFormula: (state, action) => {
      state.formula = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setSelectedLottery: (state, action) => {
      state.selectedLottery = action.payload;
    }
  }
});

export const {
  setToken,
  setAmount,
  setBalance,
  setAllowance,
  setMaxBetPercent,
  setFormula,
  setDuration,
  setSelectedLottery
} = appSlice.actions;

export const selectToken = (state: RootState) => state.app.token;
export const selectAmount = (state: RootState): BigNumber => BigNumber.from(state.app.amount);
export const selectAmountIsZero = (state: RootState): boolean =>
  BigNumber.from(state.app.amount).eq(BigNumber.from(0));
export const selectBalance = (state: RootState): BigNumber => BigNumber.from(state.app.balance);
export const selectBalanceIsZero = (state: RootState): boolean =>
  BigNumber.from(state.app.balance).eq(BigNumber.from(0));
export const selectAllowance = (state: RootState): BigNumber =>
  BigNumber.from(state.app.allowance);
export const selectTransferAllowed = (state: RootState): boolean =>
  BigNumber.from(state.app.balance).gt(BigNumber.from(0)) &&
  BigNumber.from(state.app.amount).gt(BigNumber.from(0)) &&
  BigNumber.from(state.app.amount).lte(BigNumber.from(state.app.allowance)); // balance > 0 && amount <= allowance;
export const selectMaxBetPercent = (state: RootState): number => state.app.maxBetPercent;
export const selectFormula = (state: RootState): number => state.app.formula;
export const selectDuration = (state: RootState) => BigNumber.from(state.app.duration);
export const selectSelectedLottery = (state: RootState): Lottery => state.app.selectedLottery;

export default appSlice.reducer;
