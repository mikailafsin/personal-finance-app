"use client";
import { useSelector } from "react-redux";

export default function ThemeWrapper({ children }) {
    const { theme } = useSelector((state) => state.theme);

    return <div className={`${theme}`}>{children}</div>;
}
