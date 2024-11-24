import React, { useState } from "react";
import { useSelector } from "react-redux";
import DateRangePicker from "./DateRangePicker";
import { generatePdf } from "../utils/generatePdf";

const ExportPdf = () => {
    const { transactions } = useSelector((state) => state.transactions);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleDateChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    };

    const handleExport = () => {
        generatePdf({ transactions, startDate, endDate });
    };

    return (
        <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 mb-6">
            <DateRangePicker onDateChange={handleDateChange} />
            <button
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
            >
                PDF İndir
            </button>
        </div>
    );
};

export default ExportPdf;
