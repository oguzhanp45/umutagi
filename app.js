const API_URL = "https://api.npoint.io/433d2b54b3c3bb324e23";
let allData = [];
let myTasks = JSON.parse(localStorage.getItem('umutAgi_tasks')) || [];

const requestsGrid = document.getElementById('requests-grid');
const myTasksGrid = document.getElementById('my-tasks-grid');
const categoryButtonsContainer = document.getElementById('category-buttons');
const themeToggleBtn = document.getElementById('theme-toggle');
const offlineBanner = document.getElementById('offline-banner');

// Modal Değişkenleri
let pendingTaskId = null;
let pendingEventTarget = null;
const taskModal = document.getElementById('task-modal');
const vNameInput = document.getElementById('volunteer-name');
const vPhoneInput = document.getElementById('volunteer-phone');

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupNetworkListeners();
    if (requestsGrid) fetchAndRenderData();
    else if (myTasksGrid) renderMyTasks();
});

// Toast Mesaj Sistemi (i18n uyumlu)
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => toast.remove());
    }, 3000);
}

// Tema Yönetimi
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButtonText(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButtonText(newTheme);
    });
}

function updateThemeButtonText(theme) {
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    themeToggleBtn.innerHTML = theme === 'light' ? moonIcon : sunIcon;
}

// Network Kontrolü
function setupNetworkListeners() {
    if (!navigator.onLine) showOfflineBanner(false);
    window.addEventListener('offline', () => showOfflineBanner(true));
    window.addEventListener('online', hideOfflineBanner);
}
function showOfflineBanner(showToastMsg = true) {
    if (offlineBanner) offlineBanner.classList.remove('hidden');
    if (showToastMsg) showToast(window.t('toast-offline'), "error");
}
function hideOfflineBanner() {
    if (offlineBanner) offlineBanner.classList.add('hidden');
    showToast(window.t('toast-online'), "success");
    if (requestsGrid) fetchAndRenderData();
}

// Veri Çekme
async function fetchAndRenderData() {
    try {
        if (!navigator.onLine) throw new Error("Çevrimdışı");
        const response = await fetch(API_URL);
        const data = await response.json();
        allData = Array.isArray(data) ? data : Object.values(data);
        localStorage.setItem('umutAgi_offlineData', JSON.stringify(allData));
    } catch (error) {
        const offlineData = localStorage.getItem('umutAgi_offlineData');
        if (offlineData) allData = JSON.parse(offlineData);
        else {
            if (requestsGrid) requestsGrid.innerHTML = `<p style="text-align:center; grid-column: 1/-1;">Bağlantı yok ve yerel yedek bulunamadı.</p>`;
            return;
        }
    }
    renderCategories();
    renderCards(allData);
}

// Filtreleme (i18n uyumlu "Tümü" kategorisi)
function renderCategories() {
    if (!categoryButtonsContainer) return;
    const catAll = window.t('cat-all');
    const categories = [catAll, ...new Set(allData.map(item => item.kategori || item.category || item.tur || item.type || item.yardim_turu || 'Genel'))];

    categoryButtonsContainer.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `btn-cat ${cat === catAll ? 'active' : ''}`;
        btn.textContent = cat;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.btn-cat').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filteredData = cat === catAll ? allData : allData.filter(item => (item.kategori || item.category || item.tur || item.type || item.yardim_turu || 'Genel') === cat);
            renderCards(filteredData);
        });
        categoryButtonsContainer.appendChild(btn);
    });
}

// Kartları Çizme
function renderCards(data) {
    if (!requestsGrid) return;
    requestsGrid.innerHTML = '';

    if (data.length === 0) {
        requestsGrid.innerHTML = `<p style="text-align:center; grid-column: 1/-1;">${window.t('no-data')}</p>`;
        return;
    }

    data.forEach((item, index) => {
        const safeId = item.id ? String(item.id) : `gorev_${index}`;
        item.id = safeId;
        const isTaken = myTasks.some(task => String(task.id) === safeId);

        const category = item.kategori || item.category || item.tur || item.type || item.yardim_turu || window.t('default-cat');
        const title = item.baslik || item.title || item.ad || item.name || item.ihtiyac || window.t('default-title');
        const desc = item.aciklama || item.Aciklama || item.description || item.detay || item.Detay || item.icerik || window.t('default-desc');
        const location = item.konum || item.location || item.adres || item.address || item.il_ilce || item.sehir || window.t('default-loc');

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div>
                <div class="card-header"><span class="badge">${category}</span></div>
                <h3 class="card-title">${title}</h3>
                <p class="card-desc">${desc}</p>
                <p class="card-location">📍 ${location}</p>
            </div>
            <button class="btn-action" onclick="takeTask(event, '${safeId}')" ${isTaken ? 'disabled' : ''}>
                ${isTaken ? window.t('btn-taken') : window.t('btn-take')}
            </button>
        `;
        requestsGrid.appendChild(card);
    });
}

// Modal İşlemleri
window.takeTask = function (event, id) {
    if (myTasks.some(t => String(t.id) === String(id))) return;
    pendingTaskId = id;
    pendingEventTarget = event.target;
    if (taskModal) {
        taskModal.classList.remove('hidden');
        vNameInput.value = ''; vPhoneInput.value = ''; vNameInput.focus();
    }
}

window.closeModal = function () {
    if (taskModal) taskModal.classList.add('hidden');
    pendingTaskId = null; pendingEventTarget = null;
}

window.confirmTask = function () {
    const name = vNameInput.value.trim();
    const phone = vPhoneInput.value.trim();

    if (!name || !phone) {
        showToast(window.t('toast-error'), "error");
        return;
    }

    const task = allData.find(item => String(item.id) === String(pendingTaskId));
    if (task && !myTasks.some(t => String(t.id) === String(pendingTaskId))) {
        const taskWithAssignee = { ...task, assigneeName: name, assigneePhone: phone };
        myTasks.push(taskWithAssignee);
        localStorage.setItem('umutAgi_tasks', JSON.stringify(myTasks));

        if (pendingEventTarget) {
            pendingEventTarget.innerText = window.t('btn-taken');
            pendingEventTarget.disabled = true;
        }
        showToast(window.t('toast-success'), "success");
    }
    closeModal();
}

// Görevlerim Sayfası
function renderMyTasks() {
    if (!myTasksGrid) return;
    myTasksGrid.innerHTML = '';

    if (myTasks.length === 0) {
        myTasksGrid.innerHTML = `<p style="text-align:center; grid-column: 1/-1;">${window.t('no-tasks')}</p>`;
        return;
    }

    myTasks.forEach(item => {
        const category = item.kategori || item.category || item.tur || item.type || item.yardim_turu || window.t('default-cat');
        const title = item.baslik || item.title || item.ad || item.name || item.ihtiyac || window.t('default-title');
        const desc = item.aciklama || item.Aciklama || item.description || item.detay || item.Detay || item.icerik || window.t('default-desc');
        const location = item.konum || item.location || item.adres || item.address || item.il_ilce || item.sehir || window.t('default-loc');

        const assigneeInfo = item.assigneeName ? `
            <div class="card-assignee">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                ${window.t('assignee-label')} ${item.assigneeName} - ${item.assigneePhone}
            </div>
        ` : '';

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div>
                <div class="card-header"><span class="badge">${category}</span></div>
                <h3 class="card-title">${title}</h3>
                <p class="card-desc">${desc}</p>
                <p class="card-location">📍 ${location}</p>
                ${assigneeInfo}
            </div>
            <button class="btn-action btn-remove" onclick="removeTask('${item.id}')">
                ${window.t('btn-cancel')}
            </button>
        `;
        myTasksGrid.appendChild(card);
    });
}

// Görevi İptal Etme
window.removeTask = function (id) {
    myTasks = myTasks.filter(task => String(task.id) !== String(id));
    localStorage.setItem('umutAgi_tasks', JSON.stringify(myTasks));
    renderMyTasks();
    showToast(window.t('toast-cancel'), "error");
}

// Dil Değişimi Dinleyicisi
window.addEventListener('languageChanged', () => {
    if (requestsGrid && allData.length > 0) {
        renderCategories();
        renderCards(allData);
    } else if (myTasksGrid) {
        renderMyTasks();
    }
});