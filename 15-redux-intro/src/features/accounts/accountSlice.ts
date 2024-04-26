import { createSlice } from '@reduxjs/toolkit'
import { deposit, withdraw, requestLoan, payLoan } from './accountSlice-before-reduxtoolkit';

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
}

const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        deposit(state, action) {
            state.balance = state.balance + action.payload;
            state.isLoading = false
        },
        withdraw(state, action) {
            state.balance = state.balance - action.payload;
        },
        requestLoan(state, action) {
            if(state.loan > 0) return;

            state.loan = action.payload.amount;
            state.loanPurpose = action.payload.purpose;
            state.balance = state.balance + action.payload.amount;
        },
        payLoan(state) {
            state.loan = 0;
            state.loanPurpose = "";
            state.balance = state.balance - state.loan;
        }
    }
})

console.log(accountSlice);

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;