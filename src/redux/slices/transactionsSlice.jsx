import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions: [], // [{ id, amount, category, description, date }]
};

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            state.transactions.push(action.payload);
        },
    },
});

export const { addTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;