const ctx = document.getElementById('analyticsChart').getContext('2d');
let myChart;

function calculate() {
    const initial = parseFloat(document.getElementById('initialCapital').value) || 0;
    const interest = parseFloat(document.getElementById('interestRate').value) / 100 || 0;
    const inflation = parseFloat(document.getElementById('inflationRate').value) / 100 || 0;
    const fee = parseFloat(document.getElementById('feeRate').value) / 100 || 0;
    const years = parseInt(document.getElementById('timePeriod').value);
    
    document.getElementById('yearDisplay').innerText = years;

    let labels = [];
    let grossData = [];
    let realData = [];

    for (let i = 0; i <= years; i++) {
        labels.push('Año ' + i);
        
        // Capital Bruto: (Interés - Comisión)
        const gross = initial * Math.pow(1 + (interest - fee), i);
        grossData.push(gross.toFixed(2));

        // Poder Real: (Interés - Comisión - Inflación)
        const real = initial * Math.pow(1 + (interest - fee - inflation), i);
        realData.push(real.toFixed(2));
    }

    const finalGross = grossData[years];
    const finalReal = realData[years];
    const loss = finalGross - finalReal;

    // Actualizar números en las tarjetas
    const formatter = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
    document.getElementById('grossCapital').innerText = formatter.format(finalGross);
    document.getElementById('realPower').innerText = formatter.format(finalReal);
    document.getElementById('lossAmount').innerText = formatter.format(loss);

    updateChart(labels, grossData, realData);
}

function updateChart(labels, gross, real) {




