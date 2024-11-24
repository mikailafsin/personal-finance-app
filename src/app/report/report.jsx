"use client";
import ExportPdf from "@/components/ExportPdf";
import React from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import categories from "@/constants/categories";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart,
    Line,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function Report() {
    const { transactions } = useSelector((state) => state.transactions);

    // Gideri Ayırma
    const expenses = transactions.filter((t) => t.amount < 0);

    // Harcama Kategorileri için Pasta Grafiği Verisi
    const expenseData = categories.map((category) => {
        const total = expenses
            .filter((t) => t.category === category)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        return { name: category, value: total };
    });

    // Aylık Gelir ve Gider Verisi
    const monthlyData = transactions.reduce((acc, t) => {
        const monthYear = dayjs(t.date).format("MM/YYYY");
        const existing = acc.find((item) => item.month === monthYear);

        if (existing) {
            if (t.amount > 0) existing.income += t.amount;
            else existing.expense += Math.abs(t.amount);
        } else {
            acc.push({
                month: monthYear,
                income: t.amount > 0 ? t.amount : 0,
                expense: t.amount < 0 ? Math.abs(t.amount) : 0,
            });
        }

        return acc;
    }, []);

    // Yıllık Gelir ve Gider Verisi
    const yearlyData = transactions.reduce((acc, t) => {
        const year = dayjs(t.date).format("YYYY");
        const existing = acc.find((item) => item.year === year);

        if (existing) {
            if (t.amount > 0) existing.income += t.amount;
            else existing.expense += Math.abs(t.amount);
        } else {
            acc.push({
                year,
                income: t.amount > 0 ? t.amount : 0,
                expense: t.amount < 0 ? Math.abs(t.amount) : 0,
            });
        }

        return acc;
    }, []);

    // Çizgi Grafiği Verisi (Tarih Bazlı)
    const trendData = transactions.reduce((acc, t) => {
        const date = dayjs(t.date).format("DD/MM/YYYY");
        const existing = acc.find((item) => item.date === date);

        if (existing) {
            if (t.amount > 0) existing.income += t.amount;
            else existing.expense += Math.abs(t.amount);
        } else {
            acc.push({
                date,
                income: t.amount > 0 ? t.amount : 0,
                expense: t.amount < 0 ? Math.abs(t.amount) : 0,
            });
        }

        return acc;
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-semibold mb-6">Raporlar</h2>
                <ExportPdf />
                {/* Pasta Grafiği */}
                <div className="mb-10">
                    <h3 className="text-lg font-semibold mb-4">Harcama Kategorileri</h3>
                    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 mb-6">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={expenseData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label
                                >
                                    {expenseData.map((entry, index) => (
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
                </div>

                {/* Yıllık Gelir ve Gider Grafiği */}
                <div className="mb-10">
                    <h3 className="text-lg font-semibold mb-4">Aylık Gelir ve Gider</h3>
                    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 mb-6">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="income" fill="#00C49F" name="Gelir" />
                                <Bar dataKey="expense" fill="#FF8042" name="Gider" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Yıllık Gelir ve Gider Grafiği */}
                <div className="mb-10">
                    <h3 className="text-lg font-semibold mb-4">Yıllık Gelir ve Gider</h3>
                    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 mb-6">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={yearlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="income" fill="#00C49F" name="Gelir" />
                                <Bar dataKey="expense" fill="#FF8042" name="Gider" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Çizgi Grafiği */}
                <div className="mb-10">
                    <h3 className="text-lg font-semibold mb-4">
                        Zaman Bazlı Gelir ve Gider Trendleri
                    </h3>
                    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 mb-6">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="income"
                                    stroke="#0088FE"
                                    name="Gelir"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="expense"
                                    stroke="#FF8042"
                                    name="Gider"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
