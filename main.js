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

function renderComparativaReal() {
    const capital = parseFloat(document.getElementById('capital-slider').value);
    const inflation = parseFloat(document.getElementById('inflation-slider').value) / 100;
    
    // Simulación de rendimiento de inversión (ej. 8% anual)
    const rendimientoInv = 0.08; 
    
    const perdidaAnual = capital * inflation;
    const gananciaAnual = capital * rendimientoInv;

    const msgArea = document.getElementById('vortex-msg');
    msgArea.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div style="color: #ff4444; border-right: 1px solid #222;">
                <small>SI TE QUEDAS QUIETO:</small><br>
                <strong>-${perdidaAnual.toLocaleString()}€/año</strong>
            </div>
            <div style="color: #00ff88;">
                <small>SI TE PROTEGES:</small><br>
                <strong>+${gananciaAnual.toLocaleString()}€/año</strong>
            </div>
        </div>
        <p style="font-size: 11px; margin-top: 10px; color: #666;">DIFERENCIA TOTAL DE OPORTUNIDAD: ${(perdidaAnual + gananciaAnual).toLocaleString()}€</p>
    `;
}







