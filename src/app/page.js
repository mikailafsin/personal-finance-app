"use client";
import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";
import categories from "@/constants/categories";

export default function Overview() {
    const { transactions } = useSelector((state) => state.transactions);

    // Gelir ve giderleri 3 işlem ile sınırlanması
    const limitedIncomeTransactions = transactions.filter((t) => t.amount > 0).slice(0, 3);
    const limitedExpenseTransactions = transactions.filter((t) => t.amount < 0).slice(0, 3);

    // Toplam Gelir ve Gider
    const income = transactions.filter((t) => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
        .filter((t) => t.amount < 0)
        .reduce((acc, t) => acc + Math.abs(t.amount), 0);

    const balance = income - expenses;

    // Kategori Harcamaları
    const categoryData = categories.map((category) => {
        const totalSpent = transactions
            .filter((t) => t.category === category && t.amount < 0)
            .reduce((acc, t) => acc + Math.abs(t.amount), 0);
        return { name: category, value: totalSpent };
    });

    // Renk paleti
    const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto p-6">
                {/* Toplam Bakiye */}
                <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold">Toplam Bakiye</h2>
                    <p className="text-3xl font-bold mt-2">{balance.toFixed(2)} TL</p>
                </div>

                {/* Gelir/Gider Bilgisi */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-100 dark:bg-green-700 text-green-900 dark:text-green-100 shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-semibold">Gelir</h3>
                        <p className="text-2xl font-bold mt-2">{income.toFixed(2)} TL</p>
                    </div>
                    <div className="bg-red-100 dark:bg-red-700 text-red-900 dark:text-red-100 shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-semibold">Gider</h3>
                        <p className="text-2xl font-bold mt-2">{expenses.toFixed(2)} TL</p>
                    </div>
                </div>

                {/* Harcama Grafiği */}
                <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Kategori Harcamaları</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* İşlemler Kartı */}
                <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-10">İşlemler</h3>

                    {/* Gelir işlemlerini listele */}
                    <h4 className="font-semibold text-md mb-4 text-green-500">Gelirler</h4>
                    {limitedIncomeTransactions.length === 0 ? (
                        <p className="text-gray-500">Gelir kaydı bulunmamaktadır.</p>
                    ) : (
                        <div className="space-y-4">
                            {limitedIncomeTransactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex justify-between border-b pb-2 mb-2"
                                >
                                    <div>
                                        <p className="font-medium">{transaction.description}</p>
                                        <p className="text-sm text-gray-400">
                                            {dayjs(transaction.date).format("DD/MM/YYYY")}
                                        </p>
                                    </div>
                                    <div className="text-green-500 font-semibold">
                                        ${transaction.amount.toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Gider işlemlerini listele */}
                    <h4 className="font-semibold text-md mt-10 mb-4 text-red-500">Giderler</h4>
                    {limitedExpenseTransactions.length === 0 ? (
                        <p className="text-gray-500">Gider kaydı bulunmamaktadır.</p>
                    ) : (
                        <div className="space-y-4">
                            {limitedExpenseTransactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex justify-between border-b pb-2 mb-2"
                                >
                                    <div>
                                        <p className="font-medium">{transaction.description}</p>
                                        <p className="text-sm text-gray-400">
                                            {dayjs(transaction.date).format("DD/MM/YYYY")}
                                        </p>
                                    </div>
                                    <div className="text-red-500 font-semibold">
                                        -${Math.abs(transaction.amount).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Ayrıntıları Gör Linki */}
                    <div className="text-right mt-10">
                        <Link href="/transactions" className="dark:text-gray-50 hover:underline">
                            Ayrıntıları Gör
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
