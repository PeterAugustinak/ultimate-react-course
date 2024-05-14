import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
};

const accountSlice = createSlice(
    {
        name: "account",
        initialState,
        reducers: {
            deposit(state, action) {
                state.balance += action.payload;
                state.isLoading = false;
            },
            withdraw(state, action) {
                state.balance -= action.payload;
            },
            requestLoan: {
                prepare(amount, purpose) {
                    return {
                        payload: {amount, purpose},
                    };
                },

                reducer(state, action) {
                    if (state.loan > 0) return;
                    state.loan = action.payload.amount
                    state.loanPurpose = action.payload.loanPurpose
                    state.balance = state.balance + action.payload.amount
                },
            },
            payLoan(state) {
                state.balance -= state.loan;
                state.loan = 0;
                state.loan.loanPurpose = ''
            },
            convertingCurrency(state) {
                state.isLoading = true;
            }
        },
    });


export const {
    withdraw,
    requestLoan,
    payLoan
} = accountSlice.actions;

export function deposit(amount, currency) {
    if (currency === "USD") return {
        type: "account/deposit", payload: amount
    };

    return async function (dispatch, getState) {
        // loading
        dispatch({type: "account/convertingCurrency"});

        // API call
        const host = 'api.frankfurter.app';
        const res = await fetch(
            `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        const converted = data.rates.USD;

        // return action
        dispatch({type: "account/deposit", payload: converted});
    }
}

export default accountSlice.reducer;

// export default function accountReducer(state = initialState, action) {
//     switch (action.type) {
//         case "account/deposit":
//             return {...state, balance: state.balance + action.payload, isLoading: false};
//         case "account/withdraw":
//             return {...state, balance: state.balance - action.payload};
//         case "account/requestLoan":
//             if (state.loan > 0) return state;
//             return {
//                 ...state,
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.loanPurpose,
//                 balance: state.balance + action.payload.amount,
//             };
//         case "account/payLoan":
//             return {
//                 ...state,
//                 loan: 0,
//                 loanPurpose: "",
//                 balance: state.balance - state.loan
//             };
//         case "account/convertingCurrency":
//             return {
//                 ...state, isLoading: true,
//             }
//         default:
//             return state;
//
//     }
// }
//
//
// // we create "action function" for each action present in reducer
// export function deposit(amount, currency) {
//     if (currency === "USD") return {
//         type: "account/deposit", payload: amount
//     };
//
//     return async function (dispatch, getState) {
//         // loading
//         dispatch({type: "account/convertingCurrency"});
//
//         // API call
//         const host = 'api.frankfurter.app';
//         const res = await fetch(
//             `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`);
//         const data = await res.json();
//         const converted = data.rates.USD;
//
//         // return action
//         dispatch({type: "account/deposit", payload: converted});
//     }
// }
//
// export function withdraw(amount) {
//     return {type: "account/withdraw", payload: amount};
// }
//
// export function requestLoan(purpose, amount) {
//     return {
//         type: "account/requestLoan",
//         payload: {loanPurpose: purpose, amount: amount}
//     }
// }
//
// export function payLoan() {
//     return {type: "account/payLoan"};
// }
