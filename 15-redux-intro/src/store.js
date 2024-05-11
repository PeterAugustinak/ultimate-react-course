import accountReducer from "./feature/accounts/accountSlice";
import customerReducer from "./feature/customers/customerSlice";

import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer,
    }
})

export default store;
