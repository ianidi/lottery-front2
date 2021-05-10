import { createSlice } from "@reduxjs/toolkit";
import { BigNumber } from 'ethers';
import { DEFAULT_TOKEN } from 'lib/constants';

export const appSlice = createSlice({
  name: "app",
  initialState: {
    token: DEFAULT_TOKEN,
    amount: "0",
    balance: "0",
    allowance: "0",
    maxBetPercent: 10,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = BigNumber.from(action.payload).toString();
    },
    setBalance: (state, action) => {
      state.balance = BigNumber.from(action.payload).toString();
    },
    setAllowance: (state, action) => {
      state.allowance = BigNumber.from(action.payload).toString();
    },
  },
});

export const { setToken, setAmount, setBalance, setAllowance } = appSlice.actions;

export const selectToken = (state) => state.app.token;
export const selectAmount = (state) => BigNumber.from(state.app.amount);
export const selectBalance = (state) => BigNumber.from(state.app.balance);
export const selectBalanceIsZero = (state) => BigNumber.from(state.app.balance).eq(BigNumber.from(0));
export const selectAllowance = (state) => BigNumber.from(state.app.allowance);
export const selectTransferAllowed = (state) => BigNumber.from(state.app.balance).gt(BigNumber.from(0)) && (BigNumber.from(state.app.amount).eq(BigNumber.from(state.app.allowance))); // balance > 0 && amount == allowance;
export const selectMaxBetPercent = (state) => state.app.maxBetPercent;

export default appSlice.reducer;
