import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    budgets: {}, // { 'Eğlence': 500, 'Faturalar': 1000 }
};

const budgetsSlice = createSlice({
    name: "budgets",
    initialState,
    reducers: {
        setBudget: (state, action) => {
            const { category, limit } = action.payload;
            state.budgets[category] = limit;
        },
    },
});

export const { setBudget } = budgetsSlice.actions;

export default budgetsSlice.reducer;
