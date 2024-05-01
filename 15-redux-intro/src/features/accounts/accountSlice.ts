import { createSlice } from '@reduxjs/toolkit'

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
        convertingCurrency(state) {
            state.isLoading = true
        },
        withdraw(state, action) {
            state.balance = state.balance - action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose }
                }
            },
            reducer(state, action) {
                if(state.loan > 0) return;

                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance = state.balance + action.payload.amount;
            }
        },
        payLoan(state) {
            state.balance = state.balance - state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        }
    }
})

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount: number, currency: any) {
    if(currency === 'USD') {
        return {
            type: "account/deposit",
            payload: amount
        }
    }
    
    return async function(dispatch: any, getState: any) {
        dispatch({type: "account/convertingCurrency"})
        //API Call
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        
        const convertedAmount = data.rates.USD;

        dispatch({
            type: "account/deposit",
            payload: convertedAmount
        })
    }
}

export default accountSlice.reducer;