/*
 * DoHSpeedTest - Real-time DNS over HTTPS (DoH) Speed Testing Tool
 * Copyright (C) 2023 Silviu Stroe
 *
 * This file is part of DoHSpeedTest.
 *
 * DoHSpeedTest is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DoHSpeedTest is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with DoHSpeedTest. If not, see <http://www.gnu.org/licenses/>.
 */

const checkButton = document.getElementById('checkButton');
const editButton = document.getElementById('editButton');
const topWebsites = [
    'google.com', 'youtube.com', 'facebook.com', 'instagram.com', 'chatgpt.com',
    'x.com', 'whatsapp.com', 'reddit.com', 'wikipedia.org', 'amazon.com',
    'tiktok.com', 'pinterest.com',
    // --- هاست‌های گیمینگ و ایرانی ---
    'valorant.riotgames.com', 'pubg.com', 'steamcommunity.com', 'epicgames.com',
    'battle.net', 'playstation.com', 'xbox.com', 'aparat.com', 'digikala.com'
];

// === لیست کامل سرورها با داده‌های شما ===
const serverData = {
    // --- Iranian Servers (for sanction bypassing) ---
    'Shecan (شکن)': {
      url: 'https://free.shecan.ir/dns-query',
      features: ['گذر از تحریم'],
      privacy: 'متوسط',
      group: 'ایرانی',
      ipv4: '178.22.122.100, 185.51.200.2',
      ipv6: 'N/A',
    },
    'Begzar (بگذر)': {
      url: 'https://dns.begzar.ir/dns-query',
      features: ['گذر از تحریم'],
      privacy: 'متوسط',
      group: 'ایرانی',
      ipv4: 'N/A',
      ipv6: 'N/A',
    },
    '403.online': {
      url: 'https://dns.403.online/dns-query',
      features: ['گذر از تحریم'],
      privacy: 'متوسط',
      group: 'ایرانی',
      ipv4: '10.202.10.10, 10.202.10.11',
      ipv6: 'N/A',
    },
    'Radar Game': {
      url: 'https://dns.radar.game/dns-query',
      features: ['گیمینگ', 'گذر از تحریم'],
      privacy: 'متوسط',
      group: 'ایرانی',
      ipv4: '10.202.10.10, 10.202.10.11',
      ipv6: 'N/A',
    },
    'Electro': {
      url: 'https://dns.electrotm.org/dns-query',
      features: ['گذر از تحریم'],
      privacy: 'نامشخص',
      group: 'ایرانی',
      ipv4: '78.157.42.100, 78.157.42.101',
      ipv6: 'N/A',
    },
    'xStack': {
      url: 'https://rustdns.devefun.org/dns-query',
      features: ['گذر از تحریم', 'نصب پکیج‌های لینوکس'],
      privacy: 'متوسط',
      group: 'ایرانی',
      ipv4: 'N/A',
      ipv6: 'N/A',
    },

    // --- Global Providers ---
    'Cloudflare (1.1.1.1)': {
        url: 'https://cloudflare-dns.com/dns-query',
        features: ['سرعت بالا', 'بدون فیلتر'],
        privacy: 'عالی (بدون لاگ)',
        group: 'جهانی',
        ipv4: '1.1.1.1, 1.0.0.1',
        ipv6: '2606:4700:4700::1111, 2606:4700:4700::1001',
    },
    'Google (8.8.8.8)': {
        url: 'https://dns.google/dns-query',
        features: ['سرعت بالا', 'بدون فیلتر'],
        privacy: 'استاندارد',
        group: 'جهانی',
        ipv4: '8.8.8.8, 8.8.4.4',
        ipv6: '2001:4860:4860::8888, 2001:4860:4860::8844',
    },
    'Quad9 (Security)': {
        url: 'https://dns.quad9.net/dns-query',
        features: ['امنیت بالا', 'بلاک بدافزار'],
        privacy: 'عالی (بدون لاگ)',
        group: 'جهانی',
        ipv4: '9.9.9.9, 149.112.112.112',
        ipv6: '2620:fe::fe, 2620:fe::9',
    },
    'AdGuard (Default)': {
        url: 'https://dns.adguard-dns.com/dns-query',
        features: ['حذف تبلیغات', 'امنیت'],
        privacy: 'عالی (بدون لاگ)',
        group: 'حذف تبلیغات',
        ipv4: '94.140.14.14, 94.140.15.15',
        ipv6: '2a10:50c0::ad1:ff, 2a10:50c0::ad2:ff',
    },
    'NextDNS (Public)': {
        url: 'https://dns.nextdns.io',
        features: ['حذف تبلیغات', 'قابل تنظیم'],
        privacy: 'قابل تنظیم',
        group: 'حذف تبلیغات',
        ipv4: '45.90.28.236, 45.90.30.236',
        ipv6: '2a07:a8c0::, 2a07:a8c1::',
    },
    // می‌تونی بقیه رو هم اضافه کنی
};

// === تبدیل به فرمت dnsServers ===
const dnsServers = Object.keys(serverData).map(name => {
    const d = serverData[name];
    const ips = [];
    if (d.ipv4 && d.ipv4 !== 'N/A') ips.push(...d.ipv4.split(', '));
    if (d.ipv6 && d.ipv6 !== 'N/A') ips.push(...d.ipv6.split(', '));

    return {
        name,
        url: d.url,
        ips,
        type: 'post',
        allowCors: false
    };
});

// Global variable to store chart instance
let dnsChart;
let chartData = [];

// === دکمه فیلتر DNS ایرانی ===
function createFilterButton() {
    const container = document.querySelector('#dnsResults');
    if (document.getElementById('filterIranianBtn')) return;

    const btn = document.createElement('button');
    btn.id = 'filterIranianBtn';
    btn.textContent = 'فقط DNSهای ایرانی';
    btn.className = 'mb-3 px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm';
    btn.onclick = filterIranian;
    container.insertBefore(btn, container.firstChild);
}

function filterIranian() {
    const rows = document.querySelectorAll('#resultsTable tbody tr[data-server-name]');
    const btn = document.getElementById('filterIranianBtn');
    const isActive = btn.classList.contains('bg-orange-700');

    rows.forEach(row => {
        const name = row.getAttribute('data-server-name');
        const isIranian = serverData[name]?.group === 'ایرانی';
        const details = row.nextElementSibling;
        if (isActive) {
            row.style.display = '';
            if (details && details.classList.contains('details-row')) details.style.display = '';
        } else {
            row.style.display = isIranian ? '' : 'none';
            if (details && details.classList.contains('details-row')) details.style.display = isIranian ? '' : 'none';
        }
    });

    btn.textContent = isActive ? 'فقط DNSهای ایرانی' : 'نمایش همه';
    btn.classList.toggle('bg-orange-700');
    btn.classList.toggle('bg-orange-500');
}

// === به‌روزرسانی چارت با اولویت ایرانی ===
function updateChartWithData(server) {
    const existingIndex = chartData.findIndex(item => item.name === server.name);
    const serverInfo = {
        name: server.name,
        avg: server.speed.avg !== 'Unavailable' ? server.speed.avg : null,
        min: server.speed.min !== 'Unavailable' ? server.speed.min : null,
        max: server.speed.max !== 'Unavailable' ? server.speed.max : null
    };

    if (existingIndex === -1) {
        chartData.push(serverInfo);
    } else {
        chartData[existingIndex] = serverInfo;
    }

    updateChart();
}

function updateChart() {
    const chartContainer = document.getElementById('chartContainer');
    const canvas = document.getElementById('dnsChart');
    const ctx = canvas.getContext('2d');
    
    const validData = chartData.filter(item => item.avg !== null);
    
    // اولویت: ایرانی‌ها اول، بعد بر اساس سرعت
    validData.sort((a, b) => {
        const aIran = serverData[a.name]?.group === 'ایرانی' ? -10000 : 0;
        const bIran = serverData[b.name]?.group === 'ایرانی' ? -10000 : 0;
        return (a.avg + aIran) - (b.avg + bIran);
    });
    
    if (validData.length === 0) return;

    const minHeight = 300;
    const maxHeight = 800;
    const heightPerServer = 35;
    const dynamicHeight = Math.max(minHeight, Math.min(maxHeight, validData.length * heightPerServer + 100));
    
    const container = chartContainer.querySelector('.chart-container');
    container.style.height = `${dynamicHeight}px`;
    chartContainer.classList.remove('hidden');

    if (dnsChart) dnsChart.destroy();

    const minValue = Math.min(...validData.map(item => item.avg));
    const maxValue = Math.max(...validData.map(item => item.avg));
    const scaleMin = Math.max(0, minValue * 0.7);

    dnsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: validData.map(item => item.name),
            datasets: [{
                label: 'Average Response Time (ms)',
                data: validData.map(item => item.avg),
                backgroundColor: validData.map(item => getPerformanceColor(item.avg, validData)),
                borderColor: validData.map(item => getPerformanceColor(item.avg, validData, true)),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            interaction: { intersect: false, mode: 'index' },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const server = validData[context.dataIndex];
                            return [
                                `Average: ${server.avg.toFixed(2)}ms`,
                                `Min: ${server.min?.toFixed(2) || 'N/A'}ms`,
                                `Max: ${server.max?.toFixed(2) || 'N/A'}ms`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: { min: scaleMin, title: { display: true, text: 'Response Time (ms)' }, ticks: { callback: v => v.toFixed(0) + 'ms' } },
                y: { title: { display: window.innerWidth >= 768, text: 'DNS Servers (ایرانی اول → کندتر)' }, ticks: { maxRotation: 0, font: { size: 11 } } }
            },
            layout: { padding: { left: 20, right: 20, top: 15, bottom: 15 } }
        }
    });
}

function getPerformanceColor(responseTime, allData, border = false) {
    if (!allData || allData.length === 0) return border ? '#22c55e' : '#22c55e80';
    const validTimes = allData.map(d => d.avg).filter(t => t !== null);
    const minTime = Math.min(...validTimes);
    const maxTime = Math.max(...validTimes);
    if (minTime === maxTime) return border ? '#22c55e' : '#22c55e80';
    const normalized = (responseTime - minTime) / (maxTime - minTime);
    let r, g, b;
    if (normalized <= 0.5) {
        r = Math.round(255 * (normalized * 2));
        g = 255;
        b = 0;
    } else {
        r = 255;
        g = Math.round(255 * (2 - normalized * 2));
        b = 0;
    }
    const alpha = border ? '' : '80';
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${alpha}`;
}

async function warmUpDNSServers() {
    const warmUpPromises = dnsServers.map(server => Promise.all(topWebsites.map(website => measureDNSSpeed(server.url, website, server.type, server.allowCors))));
    await Promise.all(warmUpPromises);
    console.log("Warm-up phase completed");
}

async function updateLoadingMessage(message) {
    document.getElementById('loadingMessage').innerHTML = `${message} <div class="spinner">
        <div class="dot dot-1"></div>
        <div class="dot dot-2"></div>
        <div class="dot dot-3"></div>
    </div>`;
}

checkButton.addEventListener('click', async function () {
    this.disabled = true;
    editButton.disabled = true;
    document.getElementById('editDoHButton').disabled = true;
    document.getElementById('loadingMessage').classList.remove('hidden');
    
    chartData = [];
    document.getElementById('chartContainer').classList.add('hidden');
    document.getElementById('resultsTable').getElementsByTagName('tbody')[0].innerHTML = '';

    await updateLoadingMessage('Warming up DNS servers');
    await warmUpDNSServers();
    await updateLoadingMessage('Analyzing DNS servers');
    await performDNSTests();

    document.getElementById('loadingMessage').classList.add('hidden');
    this.disabled = false;
    editButton.disabled = false;
    document.getElementById('editDoHButton').disabled = false;

    createFilterButton(); // دکمه فیلتر
});

async function performDNSTests() {
    for (const server of dnsServers) {
        const speedResults = await Promise.all(topWebsites.map(website => measureDNSSpeed(server.url, website, server.type, server.allowCors)));
        server.individualResults = topWebsites.map((website, index) => {
            const speed = speedResults[index];
            return { website, speed: speed !== null ? speed : 'Unavailable' };
        });

        const validResults = speedResults.filter(speed => speed !== null && typeof speed === 'number');
        validResults.sort((a, b) => a - b);

        if (validResults.length > 0) {
            const min = validResults[0];
            const max = validResults[validResults.length - 1];
            const median = validResults.length % 2 === 0 
                ? (validResults[validResults.length / 2 - 1] + validResults[validResults.length / 2]) / 2 
                : validResults[Math.floor(validResults.length / 2)];
            const sum = validResults.reduce((a, b) => a + b, 0);
            const avg = sum / validResults.length;
            server.speed = { min, median, max, avg };
        } else {
            server.speed = { min: 'Unavailable', median: 'Unavailable', max: 'Unavailable', avg: 'Unavailable' };
        }

        updateResult(server);
    }
}

async function measureDNSSpeed(dohUrl, hostname, serverType = 'post', allowCors = false) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const startTime = performance.now();
        let response;

        if (serverType === 'get') {
            const urlWithParam = new URL(dohUrl);
            urlWithParam.searchParams.append('name', hostname);
            urlWithParam.searchParams.append('nocache', Date.now());
            let fetchOptions = { method: 'GET', signal: controller.signal };
            if (allowCors) fetchOptions.headers = { 'Accept': 'application/dns-json' };
            else fetchOptions.mode = 'no-cors';
            response = await fetch(urlWithParam, fetchOptions);
        } else {
            const dnsQuery = buildDNSQuery(hostname);
            let fetchOptions = { method: 'POST', body: dnsQuery, mode: allowCors ? 'cors' : 'no-cors', signal: controller.signal };
            if (allowCors) fetchOptions.headers = { 'Content-Type': 'application/dns-message' };
            response = await fetch(dohUrl, fetchOptions);
        }

        clearTimeout(timeoutId);
        if (allowCors && !response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const endTime = performance.now();
        return endTime - startTime;
    } catch (error) {
        clearTimeout(timeoutId);
        return null;
    }
}

function buildDNSQuery(hostname) {
    const header = new Uint8Array([0x00, 0x00, 0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
    const labels = hostname.split('.');
    const question = labels.flatMap(label => {
        const length = label.length;
        return [length, ...Array.from(label).map(c => c.charCodeAt(0))];
    });
    const typeAndClass = new Uint8Array([0x00, 0x01, 0x00, 0x01]);
    const query = new Uint8Array(header.length + question.length + 2 + typeAndClass.length);
    query.set(header);
    query.set(question, header.length);
    query.set([0x00], header.length + question.length);
    query.set(typeAndClass, header.length + question.length + 1);
    return query;
}

function updateResult(server) {
    const table = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    let row = document.querySelector(`tr[data-server-name="${server.name}"]`);
    let detailsRow;

    if (!row) {
        row = document.createElement('tr');
        row.setAttribute('data-server-name', server.name);
        row.classList.add('border-b', 'border-gray-300', 'hover:bg-gray-200', 'dark:border-gray-600', 'dark:hover:bg-gray-700');
        table.appendChild(row);

        detailsRow = document.createElement('tr');
        detailsRow.classList.add('details-row', 'hidden', 'border-b', 'border-gray-300', 'hover:bg-gray-200', 'dark:border-gray-600', 'dark:hover:bg-gray-700');
        table.appendChild(detailsRow);
    } else {
        detailsRow = row.nextElementSibling;
    }

    const group = serverData[server.name]?.group || '';
    const groupBadge = group === 'ایرانی' ? `<span class="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded ml-2">ایرانی</span>` : '';

    row.innerHTML = `
        <td class="text-left py-2 px-4 dark:text-gray-300">${server.name} ${groupBadge}
        <span class="cursor-pointer ml-2 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5 select-none inline-flex" onclick="copyToClipboard('DoH Server URL: ${server.url}' + '\\n' + 'IP Addresses: ${server.ips.join(', ')}', this)" title="Copy server details">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            Copy
        </span></td>
        <td class="text-center py-2 px-4 dark:text-gray-300">${server.speed.min !== 'Unavailable' ? server.speed.min.toFixed(2) : 'Unavailable'}</td>
        <td class="text-center py-2 px-4 dark:text-gray-300">${server.speed.median !== 'Unavailable' ? server.speed.median.toFixed(2) : 'Unavailable'}</td>
        <td class="text-center py-2 px-4 dark:text-gray-300">${server.speed.avg !== 'Unavailable' ? server.speed.avg.toFixed(2) : 'Unavailable'}</td>
        <td class="text-center py-2 px-4 dark:text-gray-300">${server.speed.max !== 'Unavailable' ? server.speed.max.toFixed(2) : 'Unavailable'}</td>
    `;

    detailsRow.innerHTML = `
    <td colspan="5" class="py-2 px-4 dark:bg-gray-800 dark:text-gray-300">
        <div>Timings for each hostname:</div>
        <ul>
            ${server.individualResults.map(result => {
        if (typeof result.speed === 'number') {
            return `<li>${result.website}: ${result.speed.toFixed(2)} ms</li>`;
        } else {
            return `<li>${result.website}: Unavailable</li>`;
        }
    }).join('')}
        </ul>
    </td>
    `;

    updateChartWithData(server);
}

function sortTable(columnIndex) {
    // کد قبلی بدون تغییر
    let table = document.getElementById("resultsTable");
    let rows = Array.from(table.getElementsByTagName("tr"));
    let startIndex = 1;
    let rowPairs = [];
    for (let i = startIndex; i < rows.length; i++) {
        if (!rows[i].classList.contains("details-row")) {
            let detailRow = (i + 1 < rows.length && rows[i + 1].classList.contains("details-row")) ? rows[i + 1] : null;
            rowPairs.push([rows[i], detailRow]);
        }
    }

    rowPairs.sort((a, b) => {
        let cellA = a[0].getElementsByTagName("TD")[columnIndex];
        let cellB = b[0].getElementsByTagName("TD")[columnIndex];
        if (!cellA || !cellB) return 0;
        let valA = cellA.textContent.trim();
        let valB = cellB.textContent.trim();
        valA = valA === 'Unavailable' ? Infinity : parseFloat(valA) || 0;
        valB = valB === 'Unavailable' ? Infinity : parseFloat(valB) || 0;
        return valA < valB ? -1 : valA > valB ? 1 : 0;
    });

    for (let pair of rowPairs) {
        table.appendChild(pair[0]);
        if (pair[1]) table.appendChild(pair[1]);
    }
}

function copyToClipboard(text, buttonElement) {
    event.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
        buttonElement.className = "cursor-pointer ml-2 px-2 py-1 text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 border border-green-400 text-green-700 dark:text-green-300 rounded flex items-center gap-1 transition-all duration-200 select-none inline-flex";
        buttonElement.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copied!`;
        setTimeout(() => {
            buttonElement.className = "cursor-pointer ml-2 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5 select-none inline-flex";
            buttonElement.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg> Copy`;
        }, 2000);
    }).catch(() => {
        // خطا
    });
}

document.getElementById('cta').addEventListener('click', function () {
    if (navigator.share) {
        navigator.share({ title: 'Find the Fastest DNS Server for You', text: 'Check out this tool to find the fastest DNS server for your location!', url: window.location.href });
    }
});

window.addEventListener('resize', function () {
    if (dnsChart) dnsChart.resize();
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('resultsTable').addEventListener('click', function (event) {
        let row = event.target.closest('tr');
        if (row && !row.classList.contains('details-row')) {
            let detailsRow = row.nextElementSibling;
            if (detailsRow && detailsRow.classList.contains('details-row')) {
                detailsRow.classList.toggle('hidden');
            }
        }
    });

    // کدهای modal و add server بدون تغییر
    // ... (همون کدهای قبلی برای modal ها)
    // فقط بخش checkServerCapabilities رو نگه داشتم

    const modal = document.getElementById("websiteModal");
    const btn = document.getElementById("editButton");
    const span = document.getElementsByClassName("close")[0];
    const addBtn = document.getElementById("addHostname");
    const input = document.getElementById("newWebsite");
    const list = document.getElementById("websiteList");

    function renderList() {
        list.innerHTML = '';
        topWebsites.forEach((site, index) => {
            const li = document.createElement("li");
            li.className = 'px-2 py-1 mb-1 bg-gray-200 rounded flex justify-between items-center border-b border-gray-300 dark:bg-gray-700 dark:border-gray-600';
            const siteText = document.createElement("span");
            siteText.textContent = site;
            li.appendChild(siteText);
            const removeBtn = document.createElement("button");
            removeBtn.className = 'bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800';
            removeBtn.textContent = 'Delete';
            removeBtn.onclick = () => { topWebsites.splice(index, 1); renderList(); };
            li.appendChild(removeBtn);
            list.appendChild(li);
        });
        checkButton.disabled = topWebsites.length === 0;
    }

    btn.onclick = () => { modal.style.display = "block"; renderList(); };
    span.onclick = () => modal.style.display = "none";
    addBtn.onclick = () => {
        const host = validateAndExtractHost(input.value);
        if (host && !topWebsites.includes(host)) {
            topWebsites.push(host);
            renderList();
        } else if (!host) {
            alert("Please enter a valid URL or hostname.");
        }
        input.value = '';
    };

    function validateAndExtractHost(input) {
        try {
            const url = new URL(input);
            if (url.protocol !== "http:" && url.protocol !== "https:") throw 0;
            return url.hostname;
        } catch {
            const hostnameRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z]{2,})+$/;
            return hostnameRegex.test(input) ? input : null;
        }
    }

    // DoH Modal و checkServerCapabilities (بدون تغییر)
    // ... (کد قبلی رو کپی کن)
});
