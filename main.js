document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('analyticsChart');
    if (!ctx) return;

    let vortexChart;

    // 1. INICIALIZACIÓN DEL GRÁFICO
    function initChart() {
        vortexChart = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    { label: 'Capital Bruto', data: [], borderColor: '#3b82f6', borderWidth: 2, tension: 0.3, pointRadius: 0 },
                    { label: 'Poder Real', data: [], borderColor: '#00ff88', borderWidth: 2, tension: 0.3, pointRadius: 0 },
                    { label: 'Inflación', data: [], borderColor: '#ff3b3b', borderDash: [5, 5], borderWidth: 1, tension: 0, pointRadius: 0 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#666', font: { size: 10, family: 'JetBrains Mono' } } } },
                scales: {
                    y: { grid: { color: '#111' }, ticks: { color: '#444', font: { family: 'JetBrains Mono' } } },
                    x: { grid: { display: false }, ticks: { color: '#444', font: { family: 'JetBrains Mono' } } }
                }
            }
        });
    }

    // 2. LÓGICA DE CÁLCULO
    function refresh() {
        const initial = parseFloat(document.getElementById('initial-capital').value) || 0;
        const savings = parseFloat(document.getElementById('monthly-savings').value) || 0;
        let interest = (parseFloat(document.getElementById('annual-interest').value) || 0) / 100;
        let inflation = (parseFloat(document.getElementById('annual-inflation').value) || 0) / 100;
        const age = parseInt(document.getElementById('user-age').value) || 0;
        const yrs = parseInt(document.getElementById('time-range').value) || 1;
        const scenario = document.getElementById('scenario-mode').value;

        if (scenario === 'optimist') { inflation = 0.02; document.getElementById('annual-inflation').value = 2; }
        else if (scenario === 'panic') { inflation = 0.08; document.getElementById('annual-inflation').value = 8; }

        document.getElementById('time-display').innerText = yrs;
        document.getElementById('retirement-age').innerText = age + yrs;

        let labs = [], dBruto = [], dReal = [], dColchon = [];
        let cb = initial, cr = initial, cc = initial;
        const mi = interest / 12, mf = inflation / 12;

        for (let i = 0; i <= yrs; i++) {
            labs.push(`AÑO ${i}`);
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

        const finalReal = parseFloat(dReal[dReal.length - 1]);
        const finalBruto = parseFloat(dBruto[dBruto.length - 1]);
        const fmt = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
        
        document.getElementById('gross-capital').innerText = fmt.format(finalBruto);
        document.getElementById('real-power').innerText = fmt.format(finalReal);
        document.getElementById('purchasing-loss').innerText = fmt.format(finalBruto - finalReal);

        localStorage.setItem('vortex_config', JSON.stringify({
            initial, savings, age, interest: interest*100, inflation: inflation*100, time: yrs, scenario
        }));
    }

    // 3. SISTEMA DE CAPTURA (MODAL)
    const downloadBtn = document.getElementById('download-report');
    const modal = document.getElementById('lead-modal');
    const closeModal = document.getElementById('close-modal');
    const leadForm = document.getElementById('lead-form');

    downloadBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('user-email').value;
        console.log("Lead registrado: " + email);
        localStorage.setItem('vortex_lead', email);
        modal.style.display = 'none';
        window.print();
    });

    // 4. EJECUCIÓN INICIAL
    initChart();
    
    const saved = localStorage.getItem('vortex_config');
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

    refresh();

    document.querySelectorAll('input, select').forEach(el => {
        el.addEventListener('input', refresh);
    });
});






