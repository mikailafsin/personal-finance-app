import BudgetAlerts from "@/components/BudgetAlerts";

export const metadata = {
    title: "Bütçe Uyarıları",
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
            <BudgetAlerts />
        </>
    );
}
