let vortexChart;

function initChart() {
    const ctx = document.getElementById('vortexChart').getContext('2d');
    vortexChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'VALOR REAL DE TU DINERO',
                borderColor: '#00ff88',
                data: [],
                fill: true,
                backgroundColor: 'rgba(0, 255, 136, 0.1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { grid: { color: '#111' } },
                x: { grid: { color: '#111' } }
            }
        }
    });
}

function updateVortex() {
    const capital = parseFloat(document.getElementById('capital-slider').value);
    const inflation = parseFloat(document.getElementById('inflation-slider').value) / 100;
    const years = parseInt(document.getElementById('years-slider').value);
    const assetPrice = parseFloat(document.getElementById('asset-selector').value);

    document.getElementById('capital-val').innerText = capital.toLocaleString() + "€";
    document.getElementById('inflation-val').innerText = (inflation * 100).toFixed(1) + "%";
    document.getElementById('years-val').innerText = years + " Años";

    let labels = [];
    let data = [];
    let currentRealValue = capital;

    for (let i = 0; i <= years; i++) {
        labels.push("Año " + i);
        currentRealValue = capital / Math.pow(1 + inflation, i);
        data.push(currentRealValue);
    }

    vortexChart.data.labels = labels;
    vortexChart.data.datasets[0].data = data;
    vortexChart.update();

    const futureAssetPrice = assetPrice * Math.pow(1 + inflation, years);
    const msg = document.getElementById('vortex-msg');
    
    if (capital >= futureAssetPrice) {
        msg.style.borderColor = "#00ff88";
        msg.innerText = `SISTEMA: PODER ADQUISITIVO MANTENIDO. PODRÁS COMPRAR EL ACTIVO (COSTE PROYECTADO: ${Math.round(futureAssetPrice).toLocaleString()}€)`;
    } else {
        msg.style.borderColor = "#ff4444";
        msg.innerText = `ALERTA: EROSIÓN CRÍTICA. EL ACTIVO COSTARÁ ${Math.round(futureAssetPrice).toLocaleString()}€ Y TU DINERO VALDRÁ ${Math.round(currentRealValue).toLocaleString()}€ REALES.`;
    }
}

document.querySelectorAll('input, select').forEach(el => el.addEventListener('input', updateVortex));
initChart();
updateVortex();
let capitalActual = 10000; // Capital que el usuario ingresa
let tasaInflacionAnual = 3.5; // % de inflación

function iniciarRelojDePerdida() {
    const displayReloj = document.getElementById('reloj-perdida');
    
    // Calculamos la pérdida por segundo: (Capital * Inflación) / Segundos en un año
    const perdidaPorSegundo = (capitalActual * (tasaInflacionAnual / 100)) / 31536000;
    let perdidaAcumulada = 0;

    setInterval(() => {
        perdidaAcumulada += perdidaPorSegundo;
        displayReloj.innerHTML = `
            <div style="color: #ff4444; font-size: 0.8rem;">SISTEMA DETECTA FUGA DE CAPITAL:</div>
            <div style="color: #ff4444; font-size: 1.5rem; font-weight: bold;">
                -${perdidaAcumulada.toFixed(6)}€
            </div>
        `;
    }, 1000);
}






