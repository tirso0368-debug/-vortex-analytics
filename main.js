let chart;

function init() {
    const ctx = document.getElementById('mainChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
                label: 'Erosión Proyectada de Caja',
                data: [],
                borderColor: '#ef4444',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } }
        }
    });
    
    updateAnalysis();
    startLivePrices();
}

function updateAnalysis() {
    const capital = parseFloat(document.getElementById('capital-input').value) || 0;
    const currency = document.getElementById('currency-select').value;
    
    // Tasas estimadas 2026
    const inflationRates = { 'EUR': 3.2, 'USD': 3.5, 'GBP': 3.8 };
    const rate = inflationRates[currency] / 100;
    
    document.getElementById('inflation-display').innerText = (rate * 100).toFixed(1) + '%';

    // Cálculo de pérdida horaria
    const hourlyLoss = (capital * rate) / (365 * 24);
    document.getElementById('hourly-loss').innerText = `-${hourlyLoss.toFixed(2)} ${currency}`;

    // Actualización de gráfico (Erosión en 12 meses)
    let projection = [];
    for (let i = 0; i < 12; i++) {
        projection.push(capital * Math.pow(1 - (rate / 12), i));
    }
    chart.data.datasets[0].data = projection;
    chart.update();
}

function startLivePrices() {
    setInterval(() => {
        const btc = 65000 + (Math.random() * 200);
        const gold = 2050 + (Math.random() * 5);
        document.getElementById('btc-price').innerText = `$${btc.toLocaleString()}`;
        document.getElementById('gold-price').innerText = `$${gold.toLocaleString()}`;
    }, 3000);
}

document.getElementById('capital-input').addEventListener('input', updateAnalysis);
document.getElementById('currency-select').addEventListener('change', updateAnalysis);

window.onload = init;








