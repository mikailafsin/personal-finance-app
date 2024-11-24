import { createSlice } from "@reduxjs/toolkit";
import categories from "@/constants/categories";

const initialState = {
    count: 0,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotificationCount(state, action) {
            state.count = action.payload;
        },
    },
});

export const { setNotificationCount } = notificationSlice.actions;

export const selectNotificationCount = (state) => {
    const { transactions } = state.transactions;
    const { budgets } = state.budgets;

    const alerts = categories.map((category) => {
        const totalSpent = transactions
            .filter((t) => t.category === category && t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        const limit = budgets[category] || 0;

        const ratio = limit > 0 ? (totalSpent / limit) * 100 : 0;

        let status = "Güvenli";
        if (ratio >= 100) {
            status = "Limit Aşıldı";
        } else if (ratio >= 80) {
            status = "Limit Yaklaşıyor";
        }

        return { status };
    });

    return alerts.filter(
        (alert) => alert.status === "Limit Aşıldı" || alert.status === "Limit Yaklaşıyor"
    ).length;
};

export default notificationSlice.reducer;
