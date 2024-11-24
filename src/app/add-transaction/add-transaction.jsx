"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../redux/slices/transactionsSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import categories from "@/constants/categories";
import dayjs from "dayjs";

export default function AddTransaction() {
    const dispatch = useDispatch();
    const router = useRouter();

    // Form state
    const [form, setForm] = useState({
        description: "",
        category: categories[0] || "",
        amount: "",
        date: dayjs().format("YYYY-MM-DD"),
    });

    // Form inputları güncelleme
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Form gönderimi
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.description || !form.amount || !form.category || !form.date) {
            toast.error("Lütfen tüm alanları doldurun!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return;
        }

        const transaction = {
            id: dayjs().valueOf(),
            description: form.description,
            category: form.category,
            amount: parseFloat(form.amount),
            date: form.date,
        };

        dispatch(addTransaction(transaction));
        router.push("/");
    };

    return (
        <div className=" bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 ">
            <div className="container mx-auto p-6 min-h-screen flex items-center justify-center">
                <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">Gelir/Gider Ekle</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium mb-1">
                                Açıklama
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="Harcama veya Gelir Açıklaması"
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium mb-1">
                                Kategori
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium mb-1">
                                Tutar
                            </label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={form.amount}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="Örn: 100 veya -50"
                            />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium mb-1">
                                Tarih
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                        >
                            Kaydet
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
