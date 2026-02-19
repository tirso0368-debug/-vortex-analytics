let chart;
function calcular() {
    const tipo = document.getElementById('tipoActivo').value;
    const cap = parseFloat(document.getElementById('capital').value) || 0;
    const inf = parseFloat(document.getElementById('inflacion').value) / 100;
    const anios = parseInt(document.getElementById('anios').value);
    const euriborActual = 0.035; 
    let intFinal = 0; let com = 0;
    document.getElementById('comisionGroup').style.display = (tipo === 'fondo') ? 'block' : 'none';
    document.getElementById('interesGroup').style.display = (tipo === 'deposito_variable') ? 'none' : 'block';
    document.getElementById('diferencialGroup').style.display = (tipo === 'deposito_variable') ? 'block' : 'none';
    if (tipo === 'fondo') {
        intFinal = parseFloat(document.getElementById('interes').value) / 100;
        com = parseFloat(document.getElementById('comision').value) / 100;
    } else if (tipo === 'deposito_fijo') {
        intFinal = parseFloat(document.getElementById('interes').value) / 100;
        com = 0;
    } else if (tipo === 'deposito_variable') {
        intFinal = euriborActual + (parseFloat(document.getElementById('diferencial').value) / 100);
        com = 0;
    }
    document.getElementById('aniosValue').innerText = anios + " años";
    let labels = []; let dNom = []; let dReal = [];
    let sNom = cap; let sReal = cap;
    for (let i = 0; i <= anios; i++) {
        labels.push("Año " + i); dNom.push(sNom.toFixed(0)); dReal.push(sReal.toFixed(0));
        sNom *= (1 + intFinal); sReal *= (1 + intFinal - com) / (1 + inf);
    }
    document.getElementById('m-bruto').innerText = Math.round(dNom[anios]).toLocaleString() + "€";
    document.getElementById('m-real').innerText = Math.round(dReal[anios]).toLocaleString() + "€";
    document.getElementById('m-perdida').innerText = Math.round(dNom[anios] - dReal[anios]).toLocaleString() + "€";
    renderChart(labels, dNom, dReal);
}
function renderChart(l, dn, dr) {
    const ctx = document.getElementById('graficoResultados').getContext('2d');
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: l,
            datasets: [
                { label: 'Bruto', data: dn, borderColor: '#3b82f6', borderWidth: 3, pointRadius: 0, tension: 0.3 },
                { label: 'Real', data: dr, borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', fill: true, borderWidth: 3, pointRadius: 0, tension: 0.3 }
            ]
        },
        options: { maintainAspectRatio: false, plugins: { legend: { display: false } },
            scales: { y: { grid: { color: '#1f2937' }, ticks: { color: '#64748b' } }, x: { grid: { display: false }, ticks: { color: '#64748b' } } }
        }
    });
}
window.onload = calcular;
