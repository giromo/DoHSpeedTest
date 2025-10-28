const checkButton = document.getElementById('checkButton');
const editButton = document.getElementById('editButton');
const topWebsites = [
    'google.com', 'youtube.com', 'facebook.com', 'instagram.com', 'chatgpt.com',
    'x.com', 'whatsapp.com', 'reddit.com', 'wikipedia.org', 'amazon.com',
    'tiktok.com', 'pinterest.com'
];

const dnsServers = [
    { name: "Shecan (شکن)", url: "https://free.shecan.ir/dns-query", ips: ["178.22.122.100", "185.51.200.2"] },
    { name: "Begzar (بگذر)", url: "https://dns.begzar.ir/dns-query", ips: [] },
    { name: "403.online", url: "https://dns.403.online/dns-query", ips: ["10.202.10.10", "10.202.10.11"] },
    { name: "Radar Game", url: "https://dns.radar.game/dns-query", ips: ["10.202.10.10", "10.202.10.11"] },
    { name: "Electro", url: "https://dns.electrotm.org/dns-query", ips: ["78.157.42.100", "78.157.42.101"] },
    { name: "xStack", url: "https://rustdns.devefun.org/dns-query", ips: [] },
    { name: "Cloudflare (1.1.1.1)", url: "https://cloudflare-dns.com/dns-query", type: "get", allowCors: true, ips: ["1.1.1.1", "1.0.0.1", "2606:4700:4700::1111", "2606:4700:4700::1001"] },
    { name: "Google (8.8.8.8)", url: "https://dns.google/resolve", type: "get", allowCors: true, ips: ["8.8.8.8", "8.8.4.4", "2001:4860:4860::8888", "2001:4860:4860::8844"] },
    { name: "Quad9 (Security)", url: "https://dns.quad9.net/dns-query", ips: ["9.9.9.9", "149.112.112.112", "2620:fe::fe", "2620:fe::9"] },
    { name: "AdGuard (Default)", url: "https://dns.adguard-dns.com/dns-query", ips: ["94.140.14.14", "94.140.15.15", "2a10:50c0::ad1:ff", "2a10:50c0::ad2:ff"] },
    { name: "NextDNS (Public)", url: "https://dns.nextdns.io", type: "get", ips: ["45.90.28.236", "45.90.30.236", "2a07:a8c0::", "2a07:a8c1::"] },
    { name: "AdGuard", url: "https://dns.adguard-dns.com/dns-query", ips: ["94.140.14.14", "94.140.15.15"] },
    { name: "AliDNS", url: "https://dns.alidns.com/dns-query", ips: ["223.5.5.5", "223.6.6.6"] },
    { name: "OpenDNS", url: "https://doh.opendns.com/dns-query", ips: ["208.67.222.222", "208.67.220.220"] },
    { name: "CleanBrowsing", url: "https://doh.cleanbrowsing.org/doh/family-filter/", ips: ["185.228.168.9", "185.228.169.9"] },
    { name: "Cloudflare", url: "https://cloudflare-dns.com/dns-query", type: "get", allowCors: true, ips: ["1.1.1.1", "1.0.0.1"] },
    { name: "ControlD", url: "https://freedns.controld.com/p0", ips: ["76.76.2.0", "76.223.122.150"] },
    { name: "DNS.SB", url: "https://doh.dns.sb/dns-query", type: "get", allowCors: true, ips: ["185.222.222.222", "45.11.45.11"] },
    { name: "DNSPod", url: "https://dns.pub/dns-query", type: "post", allowCors: false, ips: ["119.29.29.29", "182.254.116.116"] },
    { name: "Google", url: "https://dns.google/resolve", type: "get", allowCors: true, ips: ["8.8.8.8", "8.8.4.4"] },
    { name: "Mullvad", url: "https://dns.mullvad.net/dns-query", ips: ["194.242.2.2", "194.242.2.2"], type: "get", allowCors: false },
    { name: "Mullvad Base", url: "https://base.dns.mullvad.net/dns-query", ips: ["194.242.2.4", "194.242.2.4"], type: "get", allowCors: false },
    { name: "NextDNS", url: "https://dns.nextdns.io", type: "get", ips: ["45.90.28.0", "45.90.30.0"] },
    { name: "OpenBLD", url: "https://ada.openbld.net/dns-query", ips: ["146.112.41.2", "146.112.41.102"] },
    { name: "DNS0.EU", url: "https://zero.dns0.eu/", ips: ["193.110.81.9", "185.253.5.9"] },
    { name: "Quad9", url: "https://dns.quad9.net/dns-query", ips: ["9.9.9.9", "149.112.112.112"] },
    { name: "360", url: "https://doh.360.cn/dns-query", ips: ["101.226.4.6", "180.163.224.54"] },
    { name: "Canadian Shield", url: "https://private.canadianshield.cira.ca/dns-query", ips: ["149.112.121.10", "149.112.122.10"] },
    { name: "Digitale Gesellschaft", url: "https://dns.digitale-gesellschaft.ch/dns-query", ips: ["185.95.218.42", "185.95.218.43"] },
    { name: "DNS for Family", url: "https://dns-doh.dnsforfamily.com/dns-query", ips: ["94.130.180.225", "78.47.64.161"] },
    { name: "Restena", url: "https://dnspub.restena.lu/dns-query", ips: ["158.64.1.29"] },
    { name: "IIJ", url: "https://public.dns.iij.jp/dns-query", ips: ["203.180.164.45", "203.180.166.45"] },
    { name: "LibreDNS", url: "https://doh.libredns.gr/dns-query", ips: ["116.202.176.26", "147.135.76.183"] },
    { name: "Switch", url: "https://dns.switch.ch/dns-query", ips: ["130.59.31.248", "130.59.31.251"] },
    { name: "Foundation for Applied Privacy", url: "https://doh.applied-privacy.net/query", ips: ["146.255.56.98"] },
    { name: "UncensoredDNS", url: "https://anycast.uncensoreddns.org/dns-query", ips: ["91.239.100.100", "89.233.43.71"] },
    { name: "RethinkDNS", url: "https://sky.rethinkdns.com/dns-query", ips: ["104.21.83.62", "172.67.214.246"], allowCors: false },
    { name: "FlashStart (registration required)", url: "https://doh.flashstart.com/f17c9ee5", type: "post", allowCors: false, ips: ["185.236.104.104"] }
];

let dnsChart;
let chartData = [];

function showBestDNS() {
    const validServers = dnsServers.filter(s => s.speed && s.speed.avg !== 'Unavailable' && typeof s.speed.avg === 'number');
    if (validServers.length === 0) {
        document.getElementById('bestDNSContainer').innerHTML = `
            <div class="text-center p-6 bg-yellow-50 border border-yellow-300 rounded-lg">
                <p class="text-yellow-800">هیچ DNS فعالی پیدا نشد!</p>
            </div>`;
        return;
    }
    validServers.sort((a, b) => a.speed.avg - b.speed.avg);
    const best = validServers[0];
    const ips = best.ips && best.ips.length > 0 ? best.ips : ['آدرس IP موجود نیست'];
    document.getElementById('bestDNSContainer').innerHTML = `
        <div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300">
            <h3 class="text-2xl font-bold mb-3 flex items-center gap-2">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/><path d="M3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z"/><path d="M14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>
                بهترین DNS برای شما
            </h3>
            <div class="bg-white text-gray-800 p-4 rounded-lg mb-4 font-mono text-lg break-all">
                <div class="font-bold text-green-600 mb-2">${best.name}</div>
                <div class="flex flex-wrap gap-2">
                    ${ips.map(ip => `<span class="bg-gray-100 px-3 py-1 rounded">${ip}</span>`).join('')}
                </div>
            </div>
            <button onclick="copyBestDNS('${ips.join(', ')}')" class="w-full bg-white text-green-600 font-bold py-3 rounded-lg hover:bg-green-50 transition-all flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/><path d="M6 8a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1V9a1 1 0 00-1-1H6z"/></svg>
                کپی IPها
            </button>
            <p class="text-xs mt-3 opacity-80">فقط این IPها رو در تنظیمات شبکه/روتر/گیم خودتون وارد کنید.</p>
        </div>
    `;
    document.getElementById('bestDNSContainer').scrollIntoView({ behavior: 'smooth' });
}

function copyBestDNS(ips) {
    navigator.clipboard.writeText(ips).then(() => {
        const btn = event.target;
        const oldText = btn.innerHTML;
        btn.innerHTML = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> کپی شد!`;
        btn.classList.replace('bg-white', 'bg-green-100');
        setTimeout(() => { btn.innerHTML = oldText; btn.classList.replace('bg-green-100', 'bg-white'); }, 2000);
    });
}

async function warmUpDNSServers() {
    const warmUpPromises = dnsServers.map(server => Promise.all(topWebsites.map(website => measureDNSSpeed(server.url, website, server.type, server.allowCors))));
    await Promise.all(warmUpPromises);
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
    document.getElementById('bestDNSContainer').innerHTML = '';

    await updateLoadingMessage('در حال گرم کردن سرورها');
    await warmUpDNSServers();
    await updateLoadingMessage('در حال تحلیل DNSها');
    await performDNSTests();

    document.getElementById('loadingMessage').classList.add('hidden');
    this.disabled = false;
    editButton.disabled = false;
    document.getElementById('editDoHButton').disabled = false;
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

    showBestDNS();
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

    row.innerHTML = `
        <td class="text-right py-2 px-4 dark:text-gray-300">${server.name}
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
        <div>زمان پاسخ برای هر هاست:</div>
        <ul>
            ${server.individualResults.map(result => {
        if (typeof result.speed === 'number') {
            return `<li>${result.website}: ${result.speed.toFixed(2)} ms</li>`;
        } else {
            return `<li>${result.website}: در دسترس نیست</li>`;
        }
    }).join('')}
        </ul>
    </td>
    `;

    updateChartWithData(server);
}

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
    
    validData.sort((a, b) => a.avg - b.avg);
    
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
                label: 'میانگین زمان پاسخ (ms)',
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
                                `میانگین: ${server.avg.toFixed(2)}ms`,
                                `حداقل: ${server.min?.toFixed(2) || 'نامشخص'}ms`,
                                `حداکثر: ${server.max?.toFixed(2) || 'نامشخص'}ms`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: { min: scaleMin, title: { display: true, text: 'زمان پاسخ (ms)' }, ticks: { callback: v => v.toFixed(0) + 'ms' } },
                y: { title: { display: window.innerWidth >= 768, text: 'سرورهای DNS' }, ticks: { maxRotation: 0, font: { size: 11 } } }
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

function sortTable(columnIndex) {
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
        buttonElement.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> کپی شد!`;
        setTimeout(() => {
            buttonElement.className = "cursor-pointer ml-2 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5 select-none inline-flex";
            buttonElement.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg> Copy`;
        }, 2000);
    }).catch(() => {});
}

document.getElementById('cta').addEventListener('click', function () {
    if (navigator.share) {
        navigator.share({ title: 'سریع‌ترین DNS رو پیدا کن', text: 'با این ابزار بهترین DNS برای گیم و اینترنت رو پیدا کن!', url: window.location.href });
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
            removeBtn.textContent = 'حذف';
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
            alert("لطفاً یک URL یا هاست معتبر وارد کنید.");
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

    const dohModal = document.getElementById("dohModal");
    const dohBtn = document.getElementById("editDoHButton");
    const dohClose = dohModal.getElementsByClassName("close")[0];
    const addDoHBtn = document.getElementById("addDoHServer");
    const nameInput = document.getElementById("newDoHName");
    const urlInput = document.getElementById("newDoHUrl");
    const ipsInput = document.getElementById("newDoHIPs");

    dohBtn.onclick = () => { dohModal.style.display = "block"; };
    dohClose.onclick = () => { dohModal.style.display = "none"; };
    addDoHBtn.onclick = () => {
        const name = nameInput.value.trim();
        const url = urlInput.value.trim();
        const ips = ipsInput.value.split(',').map(ip => ip.trim()).filter(ip => ip);
        if (name && url) {
            dnsServers.push({ name, url, ips, type: 'post', allowCors: false });
            nameInput.value = urlInput.value = ipsInput.value = '';
            dohModal.style.display = "none";
            alert("سرور DNS با موفقیت اضافه شد!");
        } else {
            alert("لطفاً نام و آدرس DoH را وارد کنید.");
        }
    };

    window.onclick = function(event) {
        if (event.target == modal || event.target == dohModal) {
            modal.style.display = "none";
            dohModal.style.display = "none";
        }
    };
});
