import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const initialState = {
  isLoggedin: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedin = true;
    },
    logout(state) {
      state.isLoggedin = false;
    },
  },
});

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
