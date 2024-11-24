"use client";
import { useSelector } from "react-redux";
import categories from "@/constants/categories";

const BudgetAlerts = () => {
    const { transactions } = useSelector((state) => state.transactions);
    const { budgets } = useSelector((state) => state.budgets);

    const alerts = categories.map((category) => {
        // Toplam harcama
        const totalSpent = transactions
            .filter((t) => t.category === category && t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        // Limit
        const limit = budgets[category] || 0;

        // Harcama oranı
        const ratio = limit > 0 ? (totalSpent / limit) * 100 : 0;

        // Mesaj oluşturma
        let status = "Güvenli";
        if (ratio >= 100) {
            status = "Limit Aşıldı";
        } else if (ratio >= 80) {
            status = "Limit Yaklaşıyor";
        }

        return {
            category,
            totalSpent,
            limit,
            ratio,
            status,
        };
    });

    const getStatusClass = (status) => {
        const statusClasses = {
            "Limit Aşıldı": "bg-red-500 text-white",
            "Limit Yaklaşıyor": "bg-yellow-500 text-white",
            Güvenli: "bg-green-500 text-white",
        };
        return statusClasses[status];
    };

    return (
        <div className=" bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 ">
            <div className="container mx-auto p-6 flex items-center justify-center flex-col min-h-screen">
                <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 w-full max-w-md">
                    <h3 className="text-2xl font-semibold mb-6">Bütçe Uyarıları</h3>
                    <ul className="space-y-4">
                        {alerts.map((alert) => (
                            <li
                                key={alert.category}
                                className={`p-4 rounded-md ${getStatusClass(alert.status)}`}
                            >
                                <strong className="font-medium">{alert.category}:</strong>{" "}
                                {alert.status} <br />
                                Harcama: {alert.totalSpent} TL / Limit: {alert.limit} TL (%
                                {Math.round(alert.ratio)})
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BudgetAlerts;
