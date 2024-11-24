import { useDispatch, useSelector } from "react-redux";
import { setBudget } from "../redux/slices/budgetsSlice";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import categories from "@/constants/categories";

const BudgetForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { budgets } = useSelector((state) => state.budgets);

    const [limits, setLimits] = useState(
        categories.reduce((acc, category) => {
            acc[category] = "";
            return acc;
        }, {})
    );

    // Mevcut bütçe limitlerini başlangıç değerleri olarak ayarlıyoruz
    useEffect(() => {
        if (budgets) {
            setLimits((prevLimits) =>
                categories.reduce((acc, category) => {
                    acc[category] = budgets[category] || "";
                    return acc;
                }, {})
            );
        }
    }, [budgets]);

    const handleChange = (category, value) => {
        setLimits((prevLimits) => ({
            ...prevLimits,
            [category]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        for (const category in limits) {
            if (limits[category]) {
                dispatch(setBudget({ category, limit: parseFloat(limits[category]) }));
            }
        }
        router.push("/");
    };

    return (
        <div className="container mx-auto p-6 min-h-screen flex items-center justify-center flex-col">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 w-full max-w-md"
            >
                <h3 className="text-2xl font-semibold  mb-4">Bütçe Limiti Belirle</h3>
                <div className="space-y-4">
                    {categories.map((category) => (
                        <div
                            key={category}
                            className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between"
                        >
                            <label className="font-medium">{category} Bütçesi:</label>
                            <input
                                type="number"
                                value={limits[category]}
                                onChange={(e) => handleChange(category, e.target.value)}
                                placeholder="Bütçe limiti girin"
                                className="px-3 py-2 border rounded-md lg:w-min focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Bütçeyi Kaydet
                </button>
            </form>
        </div>
    );
};

export default BudgetForm;
