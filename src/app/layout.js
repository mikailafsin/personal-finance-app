import { Inter } from "next/font/google";
import { Providers } from "@/redux/provider";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import ThemeWrapper from "@/components/ThemeWrapper";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Kişisel Finans Uygulaması",
    description: "Coded for 2N Tech",
    authors: [
        {
            name: "Muhammet Mikail AFŞİN",
        },
    ],
};

export default function RootLayout({ children }) {
    return (
        <html lang="tr">
            <body className={inter.className}>
                <Providers>
                    <ThemeWrapper>
                        <Navbar />
                        {children}
                        <ToastContainer />
                    </ThemeWrapper>
                </Providers>
            </body>
        </html>
    );
}
