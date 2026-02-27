# UmutAğı - Afet Koordinasyon Platformu 🤝

Afet ve kriz anlarında sivil inisiyatifi ve gönüllüleri tek bir dijital merkezde buluşturarak, yardımların en hızlı ve doğru şekilde ulaşmasını sağlayan açık kaynaklı bir web platformudur.

Kriz anlarındaki en büyük sorunlar olan **şebeke kesintileri** ve **bilgi kirliliği** göz önüne alınarak, "Offline-First" (Çevrimdışı Öncelikli) mimariyle tasarlanmıştır.

## 🚀 Öne Çıkan Özellikler

* 📡 **Offline-First Mimarisi:** İnternet bağlantısı koptuğunda sistem çökmez; özel `Pulse` animasyonlu bir uyarı bandı çıkarak `LocalStorage` üzerindeki en son güncel ilanları ekrana basar.
* 🌍 **Çoklu Dil Desteği (i18n):** Yurt dışından gelen arama kurtarma ekiplerinin kullanımı için özel bir JavaScript motoru ile anlık Türkçe-İngilizce geçişi (Sayfa yenilenmeden).
* 💾 **Kalıcı Görev Yönetimi:** Kullanıcıların "Ben Üstleniyorum" diyerek aldıkları görevler anında taranıp, Modal form üzerinden alınan iletişim bilgileriyle birlikte tarayıcı hafızasına (`LocalStorage`) kaydedilir.
* 🌙 **Dinamik Tema (Dark/Light):** CSS Değişkenleri (Variables) ile kodlanmış, göz yormayan, profesyonel gece/gündüz modu.
* ⚡ **Dinamik API Entegrasyonu & Filtreleme:** Fetch API kullanılarak dış kaynaktan veri çekilir ve JavaScript dizi metotları (`filter`, `map`, `some`) ile anlık kategori filtrelemesi yapılır.
* 🔔 **Modern UX Geliştirmeleri:** Asenkron `Toast` bildirimleri, yumuşak kaydırma (Smooth Scroll), zıplamayan iskelet (Scrollbar Gutter) ve CSS animasyonları.

## 🛠 Kullanılan Teknolojiler

* **HTML5:** Semantik, erişilebilir (A11y) ve SEO uyumlu etiketleme.
* **CSS3:** Flexbox ve Grid sistemleri, CSS Variables, modern animasyonlar (`@keyframes`, `cubic-bezier`).
* **Vanilla JavaScript (ES6+):** Saf JS ile DOM manipülasyonu, Event Listener'lar, Asenkron işlemler (`async/await`, Fetch), JSON ayrıştırma.

## ⚙️ Kurulum ve Çalıştırma

Projede herhangi bir derleyici (Webpack, Babel vb.) veya kütüphane/framework kullanılmamıştır. Tamamen Vanilla JS ile "Clean Code" prensiplerine uygun yazılmıştır.
1.Pages link :https://oguzhanp45.github.io/umutagi/ 
-> Bu depoyu bilgisayarınıza klonlayın:
   ```bash
   git clone [https://github.com/oguzhanp45/umutagi.git](https://github.com/oguzhanp45/umutagi.git)
