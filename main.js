let chart;

function calcular() {
    const capInicial = parseFloat(document.getElementById('capitalInicial').value);
    const interes = parseFloat(document.getElementById('interesAnual').value) / 100;
    const inflacion = parseFloat(document.getElementById('inflacionAnual').value) / 100;
    const comision = parseFloat(document.getElementById('comision').value) / 100;
    const years = parseInt(document.getElementById('tiempo').value);
    
    document.getElementById('tiempoValor').innerText = years + " years";

    let labels = [];
    let dataBruto = [];
    let dataReal = [];

    for (let i = 0; i <= years; i++) {
        labels.push("Year " + i);
        let bruto = capInicial * Math.pow(1 + (interes - comision), i);
        let real = capInicial * Math.pow(1 + (interes - comision - inflacion), i);
        dataBruto.push(bruto.toFixed(2));
        dataReal.push(real.toFixed(2));
    }

    document.getElementById('capFinalBruto').innerText = new Intl.NumberFormat('de-DE').format(dataBruto[years]) + "€";
    document.getElementById('poderCompraReal').innerText = new Intl.NumberFormat('de-DE').format(dataReal[years]) + "€";
    document.getElementById('perdidaAdquisitiva').innerText = new Intl.NumberFormat('de-DE').format((dataBruto[years] - dataReal[years]).toFixed(2)) + "€";

    updateChart(labels, dataBruto, dataReal);
}

function updateChart(labels, dataBruto, dataReal) {
    const ctx = document.getElementById('graficoEvolucion').getContext('2d');
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                { label: 'Gross Capital', data: dataBruto, borderColor: '#007aff', backgroundColor: 'rgba(0, 122, 255, 0.1)', fill: true },
                { label: 'Real Power', data: dataReal, borderColor: '#00ff88', backgroundColor: 'rgba(0, 255, 136, 0.1)', fill: true }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { ticks: { color: '#94a3b8' } }, x: { ticks: { color: '#94a3b8' } } } }
    });
}

window.onload = calcular;

