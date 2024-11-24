# Kişisel Finans Uygulaması

**Kişisel Finans Uygulaması**, kullanıcıların harcamalarını takip etmesine, bütçelerini yönetmesine, bütçelerini grafiklerle analiz etmesine ve finansal raporlar oluşturmasına yardımcı olmak için tasarlanmış modern bir finans yönetim uygulamasıdır. **Next.js**, **Tailwind CSS** ve **Redux** kullanılarak geliştirilmiş olup kullanıcı dostu bir arayüz sunar.

---

## 🚀 Özellikler

-   **Gelir ve Gider Takibi**: İşlemleri kolayca kaydedin ve kategorilere ayırın.
-   **Bütçe Yönetimi**: Farklı kategoriler için bütçeler belirleyin ve takip edin.
-   **Grafiklerle Bütçe Takibi**: Harcamalarınızı ve bütçelerinizi görsel grafiklerle kolayca analiz edin.
-   **PDF Rapor Oluşturma**: Finansal özetleri ve işlem detaylarını PDF olarak dışa aktarın.
-   **Karanlık Mod Desteği**: Aydınlık ve karanlık temalar arasında kolayca geçiş yapın.
-   **Kalıcı Veri Saklama**: Veriler `localStorage` ile yerel olarak saklanır.
-   **Bildirimler**: Kullanıcıyı işlemler ve güncellemeler hakkında bilgilendiren temiz bir bildirim sistemi.

---

## 🛠️ Kullanılan Teknolojiler

-   **Frontend**: [Next.js 13](https://nextjs.org/), [React 18](https://reactjs.org/)
-   **Stil**: [Tailwind CSS](https://tailwindcss.com/)
-   **Durum Yönetimi**: [Redux Toolkit](https://redux-toolkit.js.org/)
-   **Yardımcı Araçlar**:
    -   [Day.js](https://day.js.org/) (tarih işlemleri için)
    -   [jsPDF](https://github.com/parallax/jsPDF) & [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) (PDF oluşturma için)
    -   [React Toastify](https://fkhadra.github.io/react-toastify/) (bildirimler için)
    -   [Recharts](https://recharts.org/) (veri görselleştirme için)

---

## 📂 Proje Yapısı

```
src/
├── app/             # Next.js uygulama dizini
├── components/      # Yeniden kullanılabilir React bileşenleri
├── constants/       # Statik sabitler (ör. kategori listesi)
├── redux/           # Redux dilimleri ve store kurulumu
│   ├── slices/      # Redux dilim mantığı
│   ├── store.jsx    # Store yapılandırması
│   ├── provider.jsx # Redux Provider sarmalayıcısı
└── utils/           # Yardımcı fonksiyonlar (ör. LocalStorage ve PDF oluşturma)
```

---

## 🖥️ Kurulum ve Çalıştırma

### Gereksinimler

-   Node.js 18+
-   npm veya yarn paket yöneticisi

### Adımlar

1. **Proje Deposu Klonlayın**:

    ```bash
    git clone https://github.com/mikailafsin/personal-finance-app.git
    cd personal-finance-app
    ```

2. **Bağımlılıkları Yükleyin**:

    ```bash
    npm install
    ```

3. **Uygulamayı Başlatın**:

    ```bash
    npm run dev
    ```

    Uygulamaya `http://localhost:3000` adresinden ulaşabilirsiniz.

4. **Üretim için Derleme**:

    ```bash
    npm run build
    ```

5. **Üretim Sunucusunu Başlatma**:
    ```bash
    npm start
    ```

---

## 🔑 Önemli Dosyalar ve Özellikler

### 1. **Durum Yönetimi (Redux)**

-   Merkezi store yapılandırması `src/redux/store.jsx` içinde.
-   İşlemler, bütçeler, tema ve bildirimler için modüler dilimler:
    -   `transactionsSlice`: İşlem verilerini yönetir.
    -   `budgetsSlice`: Kategori bazında bütçe limitlerini yönetir.
    -   `themeSlice`: Aydınlık/karanlık tema geçişini destekler.
    -   `notificationSlice`: Bildirim sayısını yönetir.

### 2. **PDF Oluşturma**

-   `src/utils/generatePdf.js`:
    -   `jsPDF` ve `jsPDF-AutoTable` kullanılarak finansal özetler ve detaylar oluşturulur.
    -   Tarihe göre işlemleri filtreler, gelir ve giderleri ayırır.

### 3. **LocalStorage Entegrasyonu**

-   `src/utils/localStorage.jsx` dosyasındaki fonksiyonlar:
    -   `loadFromLocalStorage`: Redux için önceden yüklenmiş durumu alır.
    -   `saveToLocalStorage`: Güncellenen durumu otomatik olarak kaydeder.

### 4. **Dinamik Stil**

-   **Tailwind CSS** kullanılarak yapılandırılmıştır:
    -   Karanlık mod, `darkMode: "class"` ayarı ile etkinleştirilmiştir.

---

## 📖 Kullanım Rehberi

1. **İşlem Ekleme**:

    - Günlük gelir ve giderlerinizi "Eğlence", "Faturalar", "Yemek" gibi kategorilerle kaydedin.

2. **Bütçe Belirleme**:

    - Bütçe ayarlarında kategori başına harcama limitleri tanımlayın.

3. **Tema Değiştirme**:

    - Tema geçişi yaparak aydınlık ve karanlık mod arasında geçiş yapın.

4. **Rapor Oluşturma**:
    - Belirli bir tarih aralığı için "Rapor Oluştur" butonuyla PDF raporu dışa aktarın.

---

## 📧 İletişim

Sorularınız veya katkılarınız için **[mikailwnchstr@gmail.com](mailto:mikailwnchstr@gmail.com)** adresine ulaşabilirsiniz.

```

```
