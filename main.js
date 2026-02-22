const ctx = document.getElementById('analyticsChart').getContext('2d');
let vortexChart;

function init() {
    vortexChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                { label: 'Bruto', data: [], borderColor: '#3b82f6', tension: 0.3, pointRadius: 0 },
                { label: 'Real', data: [], borderColor: '#00ff88', tension: 0.3, pointRadius: 0 },
                { label: 'Colchón', data: [], borderColor: '#ff3b3b', borderDash: [5, 5], tension: 0, pointRadius: 0 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#555' } } },
            scales: {
                y: { grid: { color: '#111' }, ticks: { color: '#444' } },
                x: { grid: { display: false }, ticks: { color: '#444' } }
            }
        }
    });
}

function loadData() {
    const saved = localStorage.getItem('vortex_data');
    if (saved) {
        const d = JSON.parse(saved);
        document.getElementById('initial-capital').value = d.initial;
        document.getElementById('monthly-savings').value = d.savings;
        document.getElementById('user-age').value = d.age;
        document.getElementById('annual-interest').value = d.interest;
        document.getElementById('annual-inflation').value = d.inflation;
        document.getElementById('time-range').value = d.time;
        document.getElementById('scenario-mode').value = d.scenario;
    }
}

function refresh() {
    let initial = parseFloat(document.getElementById('initial-capital').value) || 0;
    let savings = parseFloat(document.getElementById('monthly-savings').value) || 0;
    let interest = (parseFloat(document.getElementById('annual-interest').value) || 0) / 100;
    let inflation = (parseFloat(document.getElementById('annual-inflation').value) || 0) / 100;
    let age = parseInt(document.getElementById('user-age').value) || 0;
    let yrs = parseInt(document.getElementById('time-range').value);
    let scenario = document.getElementById('scenario-mode').value;

    if (scenario === 'optimist') { inflation = 0.02; document.getElementById('annual-inflation').value = 2; }
    else if (scenario === 'panic') { inflation = 0.08; document.getElementById('annual-inflation').value = 8; }

    document.getElementById('time-display').innerText = yrs;
    document.getElementById('retirement-age').innerText = age + yrs;

    let labs = [], dBruto = [], dReal = [], dColchon = [];
    let cb = initial, cr = initial, cc = initial;
    const mi = interest / 12, mf = inflation / 12;

    for (let i = 0; i <= yrs; i++) {
        labs.push(`Edad ${age + i}`);
        dBruto.push(cb.toFixed(2)); dReal.push(cr.toFixed(2)); dColchon.push(cc.toFixed(2));
        for (let m = 0; m < 12; m++) {
            cb = (cb + savings) * (1 + mi);
            cr = (cr + savings) * (1 + (mi - mf));
            cc = (cc + savings) * (1 - mf);
        }
    }

    vortexChart.data.labels = labs;
    vortexChart.data.datasets[0].data = dBruto;
    vortexChart.data.datasets[1].data = dReal;
    vortexChart.data.datasets[2].data = dColchon;
    vortexChart.update('none');

    const fb = dBruto[dBruto.length - 1], fr = dReal[dReal.length - 1];
    const fmt = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
    
    document.getElementById('gross-capital').innerText = fmt.format(fb);
    document.getElementById('real-power').innerText = fmt.format(fr);
    document.getElementById('purchasing-loss').innerText = fmt.format(fb - fr);

    localStorage.setItem('vortex_data', JSON.stringify({
        initial, savings, age, interest: interest*100, inflation: inflation*100, time: yrs, scenario
    }));
}

document.getElementById('download-report').addEventListener('click', () => window.print());
init(); loadData(); refresh();
document.querySelectorAll('input, select').forEach(el => el.addEventListener('input', refresh));


