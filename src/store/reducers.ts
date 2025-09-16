import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"

const rootReducer = combineReducers({
     user: authReducer,
})

export default rootReducer;  