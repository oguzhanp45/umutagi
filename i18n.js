// Çeviri Sözlüğü
const translations = {
    tr: {
        "nav-active": "Aktif İlanlar",
        "nav-tasks": "Üstlendiğim Görevler",
        "nav-contact": "İletişim",
        "offline-msg": "Şebeke bağlantısı koptu. Çevrimdışı moddasınız. Son güncel veriler gösteriliyor.",
        "hero-title": "Kriz Anında Hızlı ve Etkili Koordinasyon",
        "hero-desc": "Doğru yardımı, doğru zamanda, doğru yere ulaştırın.",
        "info-title": "Neden Buradayız?",
        "info-desc": "Afet anlarında en büyük düşmanımız koordinasyonsuzluktur. Bu platform, yardım taleplerini tek merkezde toplayarak gönüllülerin en hızlı şekilde aksiyon almasını sağlar.",
        "cat-title": "Kategoriler",
        "loading": "Sistem verileri güncelliyor...",
        "footer-about": "Afet ve kriz anlarında sivil inisiyatifi ve gönüllüleri tek bir dijital merkezde buluşturarak, yardımların en hızlı ve doğru şekilde ulaşmasını sağlayan açık kaynaklı koordinasyon ağı.",
        "footer-quick": "Hızlı Erişim",
        "footer-contact-title": "İletişim & Önemli Numaralar",
        "footer-copy": "© 2026 UmutAğı Platformu. Tüm hakları saklıdır. Kriz anlarında kesintisiz iletişim için tasarlanmıştır.",
        "modal-title": "Görevi Üstlen",
        "modal-desc": "Sahadaki koordinasyon için lütfen iletişim bilgilerinizi giriniz.",
        "modal-name": "Adınız Soyadınız",
        "modal-phone": "Telefon Numaranız",
        "modal-cancel": "İptal",
        "modal-confirm": "Onayla ve Üstlen",
        "page-title-tasks": "Üstlendiğim Sorumluluklar",
        "page-desc-tasks": "Bu sayfadaki ilanların sorumluluğunu aldınız. Lütfen en kısa sürede aksiyon alınız.",
        "btn-take": "Ben Üstleniyorum",
        "btn-taken": "Üstlenildi",
        "btn-cancel": "Görevi İptal Et",
        "toast-success": "Görev başarıyla listene eklendi!",
        "toast-cancel": "Görev iptal edildi ve listeden çıkarıldı.",
        "toast-error": "Lütfen adınızı ve telefonunuzu giriniz.",
        "toast-offline": "Bağlantı koptu. Çevrimdışı mod.",
        "toast-online": "İnternet bağlantısı sağlandı.",
        "no-data": "Bu kategoride aktif ilan bulunmamaktadır.",
        "no-tasks": "Henüz üstlendiğiniz bir görev bulunmamaktadır.",
        "cat-all": "Tümü",
        "default-cat": "Acil",
        "default-title": "İsimsiz İlan",
        "default-desc": "Açıklama bulunmuyor.",
        "default-loc": "Konum belirtilmemiş",
        "assignee-label": "Sorumlu:"
    },
    en: {
        "nav-active": "Active Requests",
        "nav-tasks": "My Tasks",
        "nav-contact": "Contact",
        "offline-msg": "Network disconnected. Offline mode. Showing latest cached data.",
        "hero-title": "Fast and Effective Coordination in Crisis",
        "hero-desc": "Deliver the right help, at the right time, to the right place.",
        "info-title": "Why Are We Here?",
        "info-desc": "In times of disaster, our biggest enemy is lack of coordination. This platform gathers aid requests in a single center, enabling volunteers to take action quickly.",
        "cat-title": "Categories",
        "loading": "System is updating data...",
        "footer-about": "An open-source coordination network bringing civil initiatives and volunteers together in a digital hub to deliver aid accurately and quickly.",
        "footer-quick": "Quick Access",
        "footer-contact-title": "Contact & Emergency Numbers",
        "footer-copy": "© 2026 UmutAğı Platform. All rights reserved. Designed for uninterrupted communication.",
        "modal-title": "Take the Task",
        "modal-desc": "Please enter your contact information for field coordination.",
        "modal-name": "Full Name",
        "modal-phone": "Phone Number",
        "modal-cancel": "Cancel",
        "modal-confirm": "Confirm & Take Task",
        "page-title-tasks": "My Responsibilities",
        "page-desc-tasks": "You have taken responsibility for the requests on this page. Please take action as soon as possible.",
        "btn-take": "I'll Take It",
        "btn-taken": "Taken",
        "btn-cancel": "Cancel Task",
        "toast-success": "Task successfully added to your list!",
        "toast-cancel": "Task cancelled and removed from your list.",
        "toast-error": "Please enter your name and phone number.",
        "toast-offline": "Connection lost. Offline mode.",
        "toast-online": "Internet connection restored.",
        "no-data": "No active requests found in this category.",
        "no-tasks": "You haven't taken any tasks yet.",
        "cat-all": "All",
        "default-cat": "Urgent",
        "default-title": "Unnamed Request",
        "default-desc": "No description provided.",
        "default-loc": "Location not specified",
        "assignee-label": "Assignee:"
    }
};

let currentLang = localStorage.getItem('umutAgi_lang') || 'tr';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('umutAgi_lang', lang);

    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.textContent = lang === 'tr' ? 'EN' : 'TR';
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        } else if (el.placeholder && translations[lang][key + '-ph']) { // Placeholder desteği
            el.placeholder = translations[lang][key + '-ph'];
        }
    });

    window.dispatchEvent(new Event('languageChanged'));
}

document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            setLanguage(currentLang === 'tr' ? 'en' : 'tr');
        });
    }
    setLanguage(currentLang);
});

window.t = function (key) {
    return translations[currentLang][key] || key;
};