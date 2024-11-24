import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./slices/transactionsSlice";
import budgetsReducer from "./slices/budgetsSlice";
import notificationReducer from "./slices/notificationSlice";
import themeReducer from "./slices/themeSlice";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";

// LocalStorage'dan yüklenen state
const preloadedState = loadFromLocalStorage();

// Store configuration
const store = configureStore({
    reducer: {
        transactions: transactionsReducer,
        budgets: budgetsReducer,
        notification: notificationReducer,
        theme: themeReducer,
    },
    preloadedState, // LocalStorage'dan gelen state
});

// State değiştikçe localStorage'a kaydet
store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export default store;
