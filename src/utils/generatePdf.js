import jsPDF from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";
import { Roboto } from "./fonts";

export const generatePdf = ({ transactions, startDate, endDate }) => {
    const doc = new jsPDF();

    doc.addFileToVFS("Roboto.ttf", Roboto);
    doc.addFont("Roboto.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    const filteredTransactions = transactions.filter((t) => {
        const transactionDate = dayjs(t.date).valueOf();
        return (
            (!startDate || transactionDate >= dayjs(startDate).valueOf()) &&
            (!endDate || transactionDate <= dayjs(endDate).valueOf())
        );
    });

    // Gelirleri ve giderleri ayrı hesaplama
    const income = filteredTransactions.filter((t) => t.amount > 0);
    const expenses = filteredTransactions.filter((t) => t.amount < 0);

    const totalIncome = income.reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = expenses.reduce((acc, t) => acc + t.amount, 0);

    // Meta Bilgiler
    const currentDate = dayjs().format("DD/MM/YYYY");
    doc.setFontSize(16);
    doc.text("Finansal Rapor", 14, 20);
    doc.setFontSize(10);
    doc.text(`Tarih: ${currentDate}`, 14, 30);
    doc.text(
        `Seçilen Tarih Aralığı: ${
            startDate ? dayjs(startDate).format("DD/MM/YYYY") : "Başlangıç yok"
        } - ${endDate ? dayjs(endDate).format("DD/MM/YYYY") : "Bitiş yok"}`,
        14,
        35
    );

    // Gelirler Tablosu
    doc.text("Gelirler:", 14, 45);
    if (income.length > 0) {
        doc.autoTable({
            startY: 50,
            head: [["Açıklama", "Tutar", "Kategori", "Tarih"]],
            body: income.map((t) => [
                t.description,
                t.amount.toFixed(2),
                t.category,
                dayjs(t.date).format("DD/MM/YYYY"),
            ]),
            styles: { font: "Roboto" },
        });
    } else {
        doc.text("Gelir bulunamadı.", 14, 50);
    }

    // Giderler Tablosu
    const expensesStartY = doc.previousAutoTable.finalY + 10 || 60;
    doc.text("Giderler:", 14, expensesStartY);
    if (expenses.length > 0) {
        doc.autoTable({
            startY: expensesStartY + 5,
            head: [["Açıklama", "Tutar", "Kategori", "Tarih"]],
            body: expenses.map((t) => [
                t.description,
                t.amount.toFixed(2),
                t.category,
                dayjs(t.date).format("DD/MM/YYYY"),
            ]),
            styles: { font: "Roboto" },
        });
    } else {
        doc.text("Gider bulunamadı.", 14, expensesStartY + 5);
    }

    // Özet Bilgiler
    const summaryStartY = doc.previousAutoTable.finalY + 10 || 80;
    doc.text(`Toplam Gelir: ${totalIncome.toFixed(2)} TL`, 14, summaryStartY);
    doc.text(`Toplam Gider: ${totalExpenses.toFixed(2)} TL`, 14, summaryStartY + 5);
    doc.text(`Net Durum: ${(totalIncome + totalExpenses).toFixed(2)} TL`, 14, summaryStartY + 10);

    // Sayfa numarası
    const pageCount = doc.internal.getNumberOfPages();
    doc.text(
        `Sayfa ${pageCount}`,
        doc.internal.pageSize.width - 30,
        doc.internal.pageSize.height - 10
    );

    // PDF'i Kaydetme
    doc.save(`Finansal_Rapor_${currentDate}.pdf`);
};
