const ctx = document.getElementById('analyticsChart').getContext('2d');
let myChart;

function calculate() {
    const initial = parseFloat(document.getElementById('initialCapital').value);
    const interest = parseFloat(document.getElementById('interestRate').value) / 100;
    const inflation = parseFloat(document.getElementById('inflationRate').value) / 100;
    const fee = parseFloat(document.getElementById('feeRate').value) / 100;
    const years = parseInt(document.getElementById('timePeriod').value);
    
    document.getElementById('yearDisplay').innerText = years;

    let labels = [];
    let grossData = [];
    let realData = [];

    for (let i = 0; i <= years; i++) {
        labels.push('Year ' + i);
        
        // Cálculo Capital Bruto
        const gross = initial * Math.pow(1 + (interest - fee), i);
        grossData.push(gross.toFixed(2));

        // Cálculo Poder Real (descontando inflación)
        const real = initial * Math.pow(1 + (interest - fee - inflation), i);
        realData.push(real.toFixed(2));
    }

    const finalGross = grossData[years];
    const finalReal = realData[years];
    const loss = finalGross - finalReal;

    // Actualizar tarjetas de métricas
    document.getElementById('grossCapital').innerText = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(finalGross);
    document.getElementById('realPower').innerText = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(finalReal);
    document.getElementById('lossAmount').innerText = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(loss);

    updateChart(labels, grossData, realData);
}

function updateChart(labels, gross, real) {
    if (myChart) { myChart.destroy(); }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gross Capital',
                data: gross,
                borderColor: '#007aff',
                backgroundColor: 'rgba(0, 122, 255, 0.1)',
                fill: true,
                tension: 0.4
            }, {
                label: 'Real Power',
                data: real,
                borderColor: '#34c759',
                backgroundColor: 'rgba(52, 199, 89, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { grid: { color: '#222' }, ticks: { color: '#888' } },
                x: { grid: { display: false }, ticks: { color: '#888' } }
            },
            plugins: {
                legend: { labels: { color: '#fff' } }
            }
        }
    });
}

// Escuchar cambios en los inputs
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', calculate);
});

// Ejecutar al cargar
calculate();



