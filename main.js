/**
 * VORTEX CORE ENGINE v2.0
 * Analytical Terminal for Asset Protection and Real-Time Investment Monitoring.
 */

const VORTEX_CONFIG = {
    inflationRates: { 'EUR': 3.2, 'USD': 3.5, 'GBP': 3.8 },
    updateInterval: 2500, // ms
    assetGrowthBase: 0.075 // 7.5% market baseline
};

let vortexChart;

function initVortexSaaS() {
    const ctx = document.getElementById('vortexMainChart').getContext('2d');
    vortexChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 12}, (_, i) => `Mes ${i+1}`),
            datasets: [
                {
                    label: 'CAPITAL_PROTEGIDO (VORTEX_STRATEGY)',
                    borderColor: '#00ff88',
                    data: [],
                    borderWidth: 2,
                    tension: 0.3
                },
                {
                    label: 'VALOR_EFECTIVO (CASH_EROSION)',
                    borderColor: '#ff4444',
                    data: [],
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { grid: { color: '#111' }, ticks: { color: '#666' } },
                x: { grid: { color: '#111' }, ticks: { color: '#666' } }
            },
            plugins: { legend: { labels: { color: '#00ff88', font: { family: 'monospace' } } } }
        }
    });
    
    // Ejecutar procesos en tiempo real
    updateLivePrices();
    refreshAnalysis();
}

function updateLivePrices() {
    setInterval(() => {
        const btc = 62000 + (Math.random() * 800);
        const gold = 2100 + (Math.random() * 15);
        document.getElementById('btc-live').innerText = `BTC/USD: $${btc.toLocaleString()}`;
        document.getElementById('gold-live').innerText = `XAU/USD: $${gold.toLocaleString()}`;
    }, VORTEX_CONFIG.updateInterval);
}

function refreshAnalysis() {
    const aum = parseFloat(document.getElementById('aum-input').value);
    const currency = document.getElementById('currency-select').value;
    const inflation = VORTEX_CONFIG.inflationRates[currency] / 100;
    
    let erosionData = [];
    let protectionData = [];
    
    for (let i = 0; i < 12; i++) {
        erosionData.push(aum * Math.pow(1 - (inflation / 12), i));
        protectionData.push(aum * Math.pow(1 + (VORTEX_CONFIG.assetGrowthBase / 12), i));
    }

    vortexChart.data.datasets[0].data = protectionData;
    vortexChart.data.datasets[1].data = erosionData;
    vortexChart.update();

    const annualLoss = aum * inflation;
    document.getElementById('critical-alerts').innerHTML = `
        <div style="border-left: 3px solid #ff4444; padding: 10px; background: rgba(255,68,68,0.05);">
            <div style="font-weight: bold; color: #ff4444;">ALERTA DE TESORERÍA: EROSIÓN DETECTADA</div>
            <div style="font-size: 12px; color: #888;">Pérdida de poder adquisitivo anual proyectada: -${annualLoss.toLocaleString()} ${currency}</div>
            <div style="font-size: 11px; margin-top: 5px; color: #00ff88;">[SUGERENCIA]: Diversificar hacia activos de baja correlación inflacionaria.</div>
        </div>
    `;
}

// Listeners profesionales
document.getElementById('currency-select').addEventListener('change', refreshAnalysis);
document.getElementById('aum-input').addEventListener('input', refreshAnalysis);

window.onload = initVortexSaaS;








