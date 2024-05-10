import {applyMiddleware, combineReducers, createStore} from "redux";
import accountReducer from "./feature/accounts/accountSlice";
import customerReducer from "./feature/customers/customerSlice";
import {thunk} from "redux-thunk";


const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

const store = createStore(
    rootReducer, applyMiddleware(thunk));

export default store;
