let chart;
let lossInterval;

function init() {
    const ctx = document.getElementById('mainChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6', 'Mes 7', 'Mes 8', 'Mes 9', 'Mes 10', 'Mes 11', 'Mes 12'],
            datasets: [{
                label: 'Pérdida de Poder Adquisitivo',
                data: [],
                borderColor: '#dc2626',
                backgroundColor: 'rgba(220, 38, 38, 0.05)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: '#f3f4f6' } }
            }
        }
    });
    
    updateAnalysis();
    startLivePrices();
    startRealTimeLoss();
}

function updateAnalysis() {
    const capital = parseFloat(document.getElementById('capital-input').value) || 0;
    const currency = document.getElementById('currency-select').value;
    
    // Tasas estimadas 2026
    const rates = { 'EUR': 3.2, 'USD': 3.5 };
    const rate = rates[currency] / 100;
    
    // Actualizar Señal VORTEX
    const signalElem = document.getElementById('vortex-signal');
    const signalBox = document.getElementById('signal-container');
    
    if (capital > 50000) {
        signalElem.innerText = "ACCIONAR DEFENSA";
        signalElem.style.color = "#dc2626";
        signalBox.style.borderLeft = "5px solid #dc2626";
    } else {
        signalElem.innerText = "RIESGO MODERADO";
        signalElem.style.color = "#f59e0b";
        signalBox.style.borderLeft = "5px solid #f59e0b";
    }

    // Gráfico de erosión
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
        const rate = (currency === 'EUR' ? 3.2 : 3.5) / 100;

        const lossPerHour = (capital * rate) / (365 * 24);
        display.innerText = `-${lossPerHour.toFixed(2)} ${currency}`;
        
        // Animación de pulso
        display.classList.remove('pulse-active');
        void display.offsetWidth; 
        display.classList.add('pulse-active');
    }, 1000);
}

function startLivePrices() {
    setInterval(() => {
        const btc = 68000 + (Math.random() * 300);
        const gold = 2150 + (Math.random() * 10);
        document.getElementById('btc-price').innerText = `$${btc.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
        document.getElementById('gold-price').innerText = `$${gold.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    }, 3000);
}

document.getElementById('capital-input').addEventListener('input', updateAnalysis);
document.getElementById('currency-select').addEventListener('change', updateAnalysis);

window.onload = init;












