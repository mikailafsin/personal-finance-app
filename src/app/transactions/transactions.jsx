"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import categories from "@/constants/categories";

export default function Transactions() {
    const { transactions } = useSelector((state) => state.transactions);

    // Filtreleme ve sıralama durumları
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("latest");

    // Pagination için state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Kategorilere göre filtreleme
    const filteredTransactions = transactions.filter((transaction) => {
        const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter;

        const matchesSearchTerm = transaction.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearchTerm;
    });

    // Sıralama işlemi
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        switch (sortOption) {
            case "latest": // En Yeni (Tarihe göre azalan)
                return dayjs(b.date).valueOf() - dayjs(a.date).valueOf();
            case "oldest": // En Eski (Tarihe göre artan)
                return dayjs(a.date).valueOf() - dayjs(b.date).valueOf();
            case "aToZ": // A'dan Z'ye
                return a.description.localeCompare(b.description);
            case "zToA": // Z'den A'ya
                return b.description.localeCompare(a.description);
            case "highest": // En Yüksek Tutar
                return b.amount - a.amount;
            case "lowest": // En Düşük Tutar
                return a.amount - b.amount;
            default:
                return 0;
        }
    });

    // Pagination için işlemleri bölme
    const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
    const paginatedTransactions = sortedTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Sayfa değişim fonksiyonu
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto p-6">
                {/* Başlık ve Filtreler */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Tüm İşlemler</h3>

                    <div className="lg:flex lg:justify-between">
                        {/* Açıklama Arama */}
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Açıklama Ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        </div>

                        <div className="lg:flex lg:gap-10">
                            {/* Kategori Seçimi */}
                            <div className="mt-4">
                                <label htmlFor="category" className="mr-4">
                                    Kategori:
                                </label>
                                <select
                                    id="category"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="border p-2 rounded"
                                >
                                    <option value="all">Tümü</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sıralama Seçimi */}
                            <div className="mt-4">
                                <label htmlFor="sort" className="mr-4">
                                    Sıralama:
                                </label>
                                <select
                                    id="sort"
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className="border p-2 rounded"
                                >
                                    <option value="latest">En Yeni</option>
                                    <option value="oldest">En Eski</option>
                                    <option value="aToZ">A'dan Z'ye</option>
                                    <option value="zToA">Z'den A'ya</option>
                                    <option value="highest">En Yüksek Tutar</option>
                                    <option value="lowest">En Düşük Tutar</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* İşlem Listesi */}
                <div className="space-y-4 bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 mb-6">
                    {paginatedTransactions.length === 0 ? (
                        <p className="text-gray-500">Filtreye uyan işlem bulunmamaktadır.</p>
                    ) : (
                        paginatedTransactions.map((transaction) => (
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
                                <div
                                    className={
                                        transaction.amount > 0 ? "text-green-500" : "text-red-500"
                                    }
                                >
                                    {transaction.amount > 0
                                        ? `${transaction.amount.toFixed(2)} TL`
                                        : `-${Math.abs(transaction.amount).toFixed(2)} TL`}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Sayfa Geçişi */}
                <div className="mt-6 flex justify-center items-center space-x-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                    >
                        Önceki
                    </button>
                    <span>
                        Sayfa {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                    >
                        Sonraki
                    </button>
                </div>
            </div>
        </div>
    );
}
