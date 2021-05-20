import { createSlice } from "@reduxjs/toolkit";
import { BigNumber } from 'ethers';
import { DEFAULT_TOKEN } from '../lib/constants';

export const appSlice = createSlice({
  name: "app",
  initialState: {
    token: DEFAULT_TOKEN,
    amount: "0",
    balance: "0",
    allowance: "0",
    maxBetPercent: 10,
    formula: null,
    duration: "0",
    selectedLottery: false
  },
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
    },
  },
});

export const { setToken, setAmount, setBalance, setAllowance, setMaxBetPercent, setFormula, setDuration, setSelectedLottery } = appSlice.actions;

export const selectToken = (state) => state.app.token;
export const selectAmount = (state) => BigNumber.from(state.app.amount);
export const selectAmountIsZero = (state) => BigNumber.from(state.app.amount).eq(BigNumber.from(0));
export const selectBalance = (state) => BigNumber.from(state.app.balance);
export const selectBalanceIsZero = (state) => BigNumber.from(state.app.balance).eq(BigNumber.from(0));
export const selectAllowance = (state) => BigNumber.from(state.app.allowance);
export const selectTransferAllowed = (state) => BigNumber.from(state.app.balance).gt(BigNumber.from(0)) && BigNumber.from(state.app.amount).gt(BigNumber.from(0)) && (BigNumber.from(state.app.amount).lte(BigNumber.from(state.app.allowance))); // balance > 0 && amount <= allowance;
export const selectMaxBetPercent = (state) => state.app.maxBetPercent;
export const selectFormula = (state) => state.app.formula;
export const selectDuration = (state) => BigNumber.from(state.app.duration);
export const selectSelectedLottery = (state) => state.app.selectedLottery;

export default appSlice.reducer;
