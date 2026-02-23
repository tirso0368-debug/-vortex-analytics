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

let chart;
let lossInterval;

function init() {
    const ctx = document.getElementById('mainChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
                label: 'Erosión de Caja Proyectada',
                data: [],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: false } }
        }
    });
    
    updateAnalysis();
    startLivePrices();
    startRealTimeLoss(); // Iniciamos el contador de pérdida real
}

function updateAnalysis() {
    const capital = parseFloat(document.getElementById('capital-input').value) || 0;
    const currency = document.getElementById('currency-select').value;
    const inflationRates = { 'EUR': 3.2, 'USD': 3.5, 'GBP': 3.8 };
    const rate = inflationRates[currency] / 100;
    
    document.getElementById('inflation-display').innerText = (rate * 100).toFixed(1) + '%';

    // Actualización de gráfico
    let projection = [];
    for (let i = 0; i < 12; i++) {
        projection.push(capital * Math.pow(1 - (rate / 12), i));
    }
    chart.data.datasets[0].data = projection;
    chart.update();
}

function startRealTimeLoss() {
    if (lossInterval) clearInterval(lossInterval);

    const display = document.getElementById('hourly-loss');
    
    lossInterval = setInterval(() => {
        const capital = parseFloat(document.getElementById('capital-input').value) || 0;
        const currency = document.getElementById('currency-select').value;
        const rate = (parseFloat(document.getElementById('inflation-display').innerText) / 100) || 0.032;

        // Pérdida por segundo: (Capital * Tasa) / Segundos en un año (31,536,000)
        const lossPerSecond = (capital * rate) / 31536000;
        
        // Simulación de pérdida en el momento actual para impacto visual
        const displayValue = (lossPerSecond * 3600).toFixed(2); // Mostramos pérdida/hora pero con refresco vivo
        
        display.innerText = `-${displayValue} ${currency}`;
        
        // Disparamos la animación de pulso
        display.classList.remove('pulse-active');
        void display.offsetWidth; // Trigger reflow
        display.classList.add('pulse-active');

    }, 1000);
}

function startLivePrices() {
    setInterval(() => {
        const btc = 65000 + (Math.random() * 200);
        const gold = 2050 + (Math.random() * 5);
        document.getElementById('btc-price').innerText = `$${btc.toLocaleString()}`;
        document.getElementById('gold-price').innerText = `$${gold.toLocaleString()}`;
    }, 3000);
}









