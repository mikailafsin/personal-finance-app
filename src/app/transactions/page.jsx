import Transactions from "./transactions";

export const metadata = {
    title: "İşlemler",
    description: "Coded for 2N Tech",
    authors: [
        {
            name: "Muhammet Mikail AFŞİN",
        },
    ],
};

export default function Page() {
    return (
        <>
            <Transactions />
        </>
    );
}
