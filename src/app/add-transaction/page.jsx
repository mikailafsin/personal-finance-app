import AddTransaction from "./add-transaction";

export const metadata = {
    title: "Gelir/Gider Ekleme",
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
            <AddTransaction />
        </>
    );
}
