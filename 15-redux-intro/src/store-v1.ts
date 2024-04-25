import { combineReducers, createStore } from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
}

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    cratedAt: ""
}

function accountReducer(state: any = initialStateAccount , action: any) {
    switch (action.type) {
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload,
            }
        case "account/withdraw":
            return {
                ...state,
                balance: state.balance - action.payload
            }
        case "account/requestLoan":
            if(state.loan > 0) return state;
            //LATER
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }
        case "account/payLoan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan
            }
        default:
            return state;
    }
}

function customerReducer(state=initialStateCustomer, action: any) {
    switch(action.type) {
        case 'customer/createCustomer':
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            }
        case 'customer/updateName':
            return {
                ...state,
                fullName: action.payload
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})
const store = createStore(rootReducer);

// store.dispatch({type: "account/deposit", payload: 500});
// store.dispatch({type: "account/withdraw", payload: 200});
// console.log(store.getState());
// store.dispatch({
//     type: "account/requestLoan", 
//     payload: {amount: 1000, purpose: "Buy a car"} 
// });
// console.log(store.getState());
// store.dispatch({type: "account/payLoan"});
// console.log(store.getState());

function deposit(amount: number) {
    return {
        type: "account/deposit",
        payload: amount
    }
}

function withdraw(amount: number) {
    return {
        type: "account/withdraw",
        payload: amount
    }
}

function requestLoan(amount: number, purpose: string) {
    return {
        type: "account/requestLoan",
        payload: {
            amount,
            purpose
        }
    }
}

function payLoan() {
    return {
        type: "account/payLoan",
    }
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a cheap car"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullname, nationalID) {
    return {
        type: "customer/createCustomer",
        payload: {
            fullname,
            nationalID,
            createdAt: new Date().toISOString()
        }
    }
}

function updateName(fullname: string) {
    return {
        type: "customer/updateName",
        payload: fullname
    }
}