const checkButton = document.getElementById('checkButton');
const editButton = document.getElementById('editButton');
const topWebsites = ['google.com', 'youtube.com', 'facebook.com', 'instagram.com', 'chatgpt.com', 'x.com', 'whatsapp.com', 'reddit.com', 'wikipedia.org', 'amazon.com', 'tiktok.com', 'pinterest.com'];

// === DNSهای ایرانی اضافه شدند ===
const dnsServers = [
    { name: "Shecan (شکن)", url: "https://free.shecan.ir/dns-query", ips: ["178.22.122.100", "185.51.200.2"] },
    { name: "Begzar (بگذر)", url: "https://dns.begzar.ir/dns-query", ips: [] },
    { name: "403.online", url: "https://dns.403.online/dns-query", ips: ["10.202.10.10", "10.202.10.11"] },
    { name: "Radar Game", url: "https://dns.radar.game/dns-query", ips: ["10.202.10.10", "10.202.10.11"] },
    { name: "Electro", url: "https://dns.electrotm.org/dns-query", ips: ["78.157.42.100", "78.157.42.101"] },
    { name: "xStack", url: "https://rustdns.devefun.org/dns-query", ips: [] },
    // === DNSهای جهانی اصلی شما (بدون تغییر) ===
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

// === تابع جدید: نمایش بهترین DNS + کپی IPها ===
function showBestDNS() {
    const validServers = dnsServers.filter(s => s.speed && s.speed.avg !== 'Unavailable' && typeof s.speed.avg === 'number');
    if (validServers.length === 0) {
        document.getElementById('bestDNSContainer').innerHTML = '<p class="text-center text-red-600 dark:text-red-400">No active DNS found!</p>';
        return;
    }
    validServers.sort((a, b) => a.speed.avg - b.speed.avg);
    const best = validServers[0];
    const ips = best.ips && best.ips.length > 0 ? best.ips.join(', ') : 'No IP available';
    document.getElementById('bestDNSContainer').innerHTML = `
        <div class="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg">
            <h3 class="text-xl font-bold text-green-800 dark:text-green-300 mb-3">Best DNS for you:</h3>
            <p class="font-mono text-lg mb-3"><strong>${best.name}</strong></p>
            <p class="font-mono text-gray-700 dark:text-gray-300 mb-4 break-all">${ips}</p>
            <button onclick="copyBestDNS('${ips}')" class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                Copy IPs
            </button>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Use these IPs in your network, router, or game settings.</p>
        </div>
    `;
    document.getElementById('bestDNSContainer').scrollIntoView({ behavior: 'smooth' });
}

function copyBestDNS(ips) {
    navigator.clipboard.writeText(ips).then(() => {
        const btn = event.target;
        const old = btn.innerHTML;
        btn.innerHTML = 'Copied!';
        btn.classList.replace('bg-green-600', 'bg-green-800');
        setTimeout(() => {
            btn.innerHTML = old;
            btn.classList.replace('bg-green-800', 'bg-green-600');
        }, 2000);
    });
}

// === همه کد اصلی شما (بدون تغییر) ===
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
    
    const validData = chartData.filter(item => item.avg !== null).sort((a, b) => a.avg - b.avg);
    
    if (validData.length === 0) return;

    const minHeight = 300;
    const maxHeight = 800;
    const heightPerServer = 35;
    const dynamicHeight = Math.max(minHeight, Math.min(maxHeight, validData.length * heightPerServer + 100));
    
    const container = chartContainer.querySelector('.chart-container');
    container.style.height = `${dynamicHeight}px`;

    chartContainer.classList.remove('hidden');

    if (dnsChart) {
        dnsChart.destroy();
    }

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
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
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
                x: {
                    min: scaleMin,
                    title: {
                        display: true,
                        text: 'Response Time (ms)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(0) + 'ms';
                        }
                    }
                },
                y: {
                    title: {
                        display: window.innerWidth >= 768,
                        text: 'DNS Servers (Slowest to Fastest)'
                    },
                    ticks: {
                        maxRotation: 0,
                        font: {
                            size: 11
                        }
                    },
                    categoryPercentage: 0.8,
                    barPercentage: 0.6
                }
            },
            elements: {
                bar: {
                    borderWidth: 1
                }
            },
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 15,
                    bottom: 15
                }
            }
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

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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

    await updateLoadingMessage('Warming up DNS servers');
    await warmUpDNSServers();
    await updateLoadingMessage('Analyzing DNS servers');
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
            return {website, speed: speed !== null ? speed : 'Unavailable'};
        });

        const validResults = speedResults.filter(speed => speed !== null && typeof speed === 'number');
        validResults.sort((a, b) => a - b);

        if (validResults.length > 0) {
            const min = validResults[0];
            const max = validResults[validResults.length - 1];
            const median = validResults.length % 2 === 0 ? (validResults[validResults.length / 2 - 1] + validResults[validResults.length / 2]) / 2 : validResults[Math.floor(validResults.length / 2)];

            let sum = 0;
            for (let i = 0; i < validResults.length; i++) {
                sum += validResults[i];
            }

            const avg = sum / validResults.length;

            server.speed = {min, median, max, avg};
        } else {
            server.speed = {min: 'Unavailable', median: 'Unavailable', max: 'Unavailable', avg: 'Unavailable'};
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

            let fetchOptions = {
                method: 'GET', signal: controller.signal
            };

            if (allowCors) {
                fetchOptions.headers = {'Accept': 'application/dns-json'};
            } else {
                fetchOptions.mode = 'no-cors';
            }

            response = await fetch(urlWithParam, fetchOptions);
        } else {
            const dnsQuery = buildDNSQuery(hostname);
            let fetchOptions = {
                method: 'POST', body: dnsQuery, mode: allowCors ? 'cors' : 'no-cors', signal: controller.signal
            };

            if (allowCors) {
                fetchOptions.headers = {'Content-Type': 'application/dns-message'};
            }

            response = await fetch(dohUrl, fetchOptions);
        }

        clearTimeout(timeoutId);

        if (allowCors && !response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const endTime = performance.now();
        return endTime - startTime;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError' || error.message === 'NS_BINDING_ABORTED') {
            console.error('Request timed out or was aborted');
        } else {
            console.error('Error during DNS resolution:', error);
        }
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
        <td class="text-left py-2 px-4 dark:text-gray-300">${server.name} 
        <span class="copy-btn cursor-pointer ml-2 px-2 py-1 text-xs rounded flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5 select-none inline-flex" onclick="copyToClipboard('DoH Server URL: ${server.url}' + '\\n' + 'IP Addresses: ${server.ips.join(', ')}', this)" title="Copy server details">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            Copy
        </span></td>
        <td class="text-center py-2 px-4 dark:text-gray-300">${server.speed.min !== 'Unavailable' ? server.speed.min.toFixed(2) : 'Unavailable'}</td>
        <td class="text-center py-2 px-4 dark:text-gray-300">${server.speed.median !== 'Unavailable' ? server.speed.median.toFixed(2) : 'Unavailable'}</td>
        <td class="text-center py-2 px-4 dark:text-gray-300"> ${server.speed.avg !== 'Unavailable' ? server.speed.avg.toFixed(2) : 'Unavailable'}</td>
        <td class="text-center py-2 px-4 dark:text-gray-300">${server.speed.max !== 'Unavailable' ? server.speed.max.toFixed(2) : 'Unavailable'}</td>
    `;

    detailsRow.innerHTML = `
    <td colspan="4" class="py-2 px-4 dark:bg-gray-800 dark:text-gray-300">
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

        if (!cellA || !cellB) {
            console.error("Undefined cell encountered", {
                cellA, cellB, rowIndexA: a[0].rowIndex, rowIndexB: b[0].rowIndex
            });
            return 0;
        }

        let valA = cellA.textContent.trim();
        let valB = cellB.textContent.trim();

        valA = valA === 'Unavailable' ? Infinity : parseFloat(valA) || 0;
        valB = valB === 'Unavailable' ? Infinity : parseFloat(valB) || 0;

        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
    });

    for (let pair of rowPairs) {
        table.appendChild(pair[0]);
        if (pair[1]) table.appendChild(pair[1]);
    }
}

function copyToClipboard(text, buttonElement) {
    event.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
        buttonElement.className = "copy-btn cursor-pointer ml-2 px-2 py-1 text-xs rounded flex items-center gap-1 transition-all duration-200 select-none inline-flex copied";
        buttonElement.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Copied!
        `;

        setTimeout(() => {
            buttonElement.className = "copy-btn cursor-pointer ml-2 px-2 py-1 text-xs rounded flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5 select-none inline-flex";
            buttonElement.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
                Copy
            `;
        }, 2000);
    }).catch(err => {
        console.error('Error in copying text: ', err);
        buttonElement.className = "copy-btn cursor-pointer ml-2 px-2 py-1 text-xs rounded flex items-center gap-1 transition-all duration-200 select-none inline-flex";
        buttonElement.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
            Error
        `;
        setTimeout(() => {
            buttonElement.className = "copy-btn cursor-pointer ml-2 px-2 py-1 text-xs rounded flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5 select-none inline-flex";
            buttonElement.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
                Copy
            `;
        }, 2000);
    });
}

document.getElementById('cta').addEventListener('click', function () {
    if (navigator.share) {
        navigator.share({
            title: 'Find the Fastest DNS Server for You',
            text: 'Check out this tool to find the fastest DNS server for your location!',
            url: window.location.href
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch(console.error);
    }
});

window.addEventListener('resize', function () {
    updateChartVisibility();
    if (dnsChart) {
        dnsChart.resize();
    }
});

function updateChartVisibility() {
}

document.addEventListener('DOMContentLoaded', function () {
    updateChartVisibility();
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
            removeBtn.textContent = 'Delete';
            removeBtn.onclick = function () {
                topWebsites.splice(index, 1);
                renderList();
            };

            li.appendChild(removeBtn);
            list.appendChild(li);
        });
        checkButton.disabled = topWebsites.length === 0;
    }

    btn.onclick = function () {
        modal.style.display = "block";
        renderList();
    }

    function validateAndExtractHost(input) {
        try {
            const url = new URL(input);
            if (url.protocol !== "http:" && url.protocol !== "https:") {
                throw new Error("Invalid protocol");
            }
            return url.hostname;
        } catch (e) {
            const hostnameRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z]{2,})+$/;
            if (hostnameRegex.test(input)) {
                return input;
            } else {
                return null;
            }
        }
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    addBtn.onclick = function () {
        const host = validateAndExtractHost(input.value);
        if (host) {
            if (!topWebsites.includes(host)) {
                topWebsites.push(host);
                renderList();
            } else {
                alert("This website is already in the list.");
            }
        } else {
            alert("Please enter a valid URL or hostname.");
        }
        input.value = '';
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    const dohModal = document.getElementById("dohModal");
    const dohBtn = document.getElementById("editDoHButton");
    const closeDohBtn = dohModal.querySelector(".close");
    const addDoHBtn = document.getElementById("suggestDoHServer");
    const newDoHName = document.getElementById("newDoHName");
    const newDoHUrl = document.getElementById("newDoHUrl");
    const newDoHIPs = document.getElementById("newDoHIPs");

    dohBtn.onclick = function () {
        dohModal.style.display = "block";
    };

    closeDohBtn.onclick = function () {
        dohModal.style.display = "none";
    };

    addDoHBtn.onclick = function () {
        const name = newDoHName.value.trim();
        const url = newDoHUrl.value.trim();
        const ips = newDoHIPs.value.trim();

        if (!name || !url) {
            alert('Please fill in Name and URL.');
            return;
        }

        const title = encodeURIComponent(`[DNS Suggestion] Add ${name}`);
        const body = encodeURIComponent(
            `**Suggested DNS Server**\n\n` +
            `- **Name**: ${name}\n` +
            `- **DoH URL**: ${url}\n` +
            `- **IPs**: ${ips || 'Not provided'}\n\n` +
            `Submitted via DoHSpeedTest tool.`
        );

        const issuesUrl = `https://github.com/Argh94/DoHSpeedTest/issues/new?title=${title}&body=${body}`;
        window.open(issuesUrl, '_blank');
        dohModal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === dohModal) {
            dohModal.style.display = "none";
        }
    };
});
