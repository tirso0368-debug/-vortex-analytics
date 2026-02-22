
const ctx = document.getElementById('analyticsChart').getContext('2d');
let vortexChart;

function init() {
    vortexChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                { label: 'Capital Bruto (Vortex)', data: [], borderColor: '#3b82f6', tension: 0.3, pointRadius: 0, borderWidth: 3 },
                { label: 'Poder Real (Ajustado)', data: [], borderColor: '#00ff88', tension: 0.3, pointRadius: 0, borderWidth: 3 },
                { label: 'Bajo el Colchón (Pérdida)', data: [], borderColor: '#ff3b3b', borderDash: [5, 5], tension: 0, pointRadius: 0 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { labels: { color: '#888', font: { family: 'JetBrains Mono', size: 10 } } },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                y: { grid: { color: '#111' }, ticks: { color: '#444', font: { family: 'JetBrains Mono' } } },
                x: { grid: { display: false }, ticks: { color: '#444', font: { family: 'JetBrains Mono' } } }
            }
        }
    });
}

function refresh() {
    let initial = parseFloat(document.getElementById('initial-capital').value) || 0;
    let savings = parseFloat(document.getElementById('monthly-savings').value) || 0;
    let interest = (parseFloat(document.getElementById('annual-interest').value) || 0) / 100;
    let inflation = (parseFloat(document.getElementById('annual-inflation').value) || 0) / 100;
    let age = parseInt(document.getElementById('user-age').value) || 0;
    let yrs = parseInt(document.getElementById('time-range').value);
    let scenario = document.getElementById('scenario-mode').value;

    if (scenario === 'optimist') {
        inflation = 0.02; document.getElementById('annual-inflation').value = 2;
    } else if (scenario === 'panic') {
        inflation = 0.08; document.getElementById('annual-inflation').value = 8;
    }

    document.getElementById('time-display').innerText = yrs;
    document.getElementById('retirement-age').innerText = age + yrs;

    let labs = [], dBruto = [], dReal = [], dColchon = [];
    let curBruto = initial, curReal = initial, curColchon = initial;

    const mInt = interest / 12;
    const mInf = inflation / 12;

    for (let i = 0; i <= yrs; i++) {
        labs.push(`Edad ${age + i}`);
        dBruto.push(curBruto.toFixed(2));
        dReal.push(curReal.toFixed(2));
        dColchon.push(curColchon.toFixed(2));

        for (let m = 0; m < 12; m++) {
            curBruto = (curBruto + savings) * (1 + mInt);
            curReal = (curReal + savings) * (1 + (mInt - mInf));
            curColchon = (curColchon + savings) * (1 - mInf);
        }
    }

    vortexChart.data.labels = labs;
    vortexChart.data.datasets[0].data = dBruto;
    vortexChart.data.datasets[1].data = dReal;
    vortexChart.data.datasets[2].data = dColchon;
    vortexChart.update('none');

    const fBruto = dBruto[dBruto.length - 1];
    const fReal = dReal[dReal.length - 1];
    const fmt = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
    
    document.getElementById('gross-capital').innerText = fmt.format(fBruto);
    document.getElementById('real-power').innerText = fmt.format(fReal);
    document.getElementById('purchasing-loss').innerText = fmt.format(fBruto - fReal);
}

document.getElementById('download-report').addEventListener('click', () => window.print());

init();
refresh();
document.querySelectorAll('input, select').forEach(el => el.addEventListener('input', refresh));

