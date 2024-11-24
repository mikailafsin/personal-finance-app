import React, { useState } from "react";

const DateRangePicker = ({ onDateChange }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        onDateChange(e.target.value, endDate);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        onDateChange(startDate, e.target.value);
    };

    return (
        <div className="space-y-4 mb-4">
            <div className="flex flex-col">
                <label
                    htmlFor="start-date"
                    className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Başlangıç Tarihi:
                </label>
                <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="border p-2 rounded w-full text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="end-date"
                    className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Bitiş Tarihi:
                </label>
                <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className="border p-2 rounded w-full text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );
};

export default DateRangePicker;
