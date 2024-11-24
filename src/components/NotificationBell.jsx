"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { selectNotificationCount } from "@/redux/slices/notificationSlice";

const NotificationBell = () => {
    const router = useRouter();
    const count = useSelector(selectNotificationCount);

    const handleClick = () => {
        router.push("/budget-alerts");
    };

    return (
        <div className="relative cursor-pointer inline-block" onClick={handleClick}>
            <svg
                className="w-8 h-8 text-gray-700 dark:text-gray-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3c0 .386-.104.745-.293 1.055L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
            </svg>
            {count > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-3.5 h-3.5 flex items-center justify-center">
                    {count}
                </span>
            )}
        </div>
    );
};

export default NotificationBell;
