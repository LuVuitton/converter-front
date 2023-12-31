import { authApiSlice } from "@/app/api/clientRequests/auth/auth.api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { userApiSlice } from "@/app/api/clientRequests/user/user.api";
import { historiesApiSlice } from "@/app/api/clientRequests/histories/histories.api";

const rootReducer = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [historiesApiSlice.reducerPath]: historiesApiSlice.reducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApiSlice.middleware,
      userApiSlice.middleware,
      historiesApiSlice.middleware,
    ]),
});
