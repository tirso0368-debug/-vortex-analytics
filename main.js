const ctx = document.getElementById('analyticsChart').getContext('2d');
let vortexChart;

function init() {
    vortexChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                { label: 'Capital Bruto', data: [], borderColor: '#3b82f6', tension: 0.3, fill: false, pointRadius: 0 },
                { label: 'Poder Real', data: [], borderColor: '#00ff88', tension: 0.3, fill: false, pointRadius: 0 }
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

function refresh() {
    const cap = parseFloat(document.getElementById('initial-capital').value) || 0;
    const ahorro = parseFloat(document.getElementById('monthly-savings').value) || 0;
    const int = (parseFloat(document.getElementById('annual-interest').value) || 0) / 100;
    const inf = (parseFloat(document.getElementById('annual-inflation').value) || 0) / 100;
    const yrs = parseInt(document.getElementById('time-range').value);

    document.getElementById('time-display').innerText = yrs;

    let labs = [], dBruto = [], dReal = [];
    let curBruto = cap, curReal = cap;

    const mInt = int / 12;
    const mInf = inf / 12;

    for (let i = 0; i <= yrs; i++) {
        labs.push('Año ' + i);
        dBruto.push(curBruto.toFixed(2));
        dReal.push(curReal.toFixed(2));

        for (let m = 0; m < 12; m++) {
            curBruto = (curBruto + ahorro) * (1 + mInt);
            curReal = (curReal + ahorro) * (1 + (mInt - mInf));
        }
    }

    vortexChart.data.labels = labs;
    vortexChart.data.datasets[0].data = dBruto;
    vortexChart.data.datasets[1].data = dReal;
    vortexChart.update('none');

    const fBruto = dBruto[dBruto.length - 1];
    const fReal = dReal[dReal.length - 1];
    const fmt = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
    
    document.getElementById('gross-capital').innerText = fmt.format(fBruto);
    document.getElementById('real-power').innerText = fmt.format(fReal);
    document.getElementById('purchasing-loss').innerText = fmt.format(fBruto - fReal);
}

init();
refresh();
document.querySelectorAll('input').forEach(el => el.addEventListener('input', refresh));

