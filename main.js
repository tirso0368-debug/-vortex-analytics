const ctx = document.getElementById('analyticsChart').getContext('2d');
let myChart; 

function calculate() {
    const initial = parseFloat(document.getElementById('initialCapital').value) || 0;
    const interest = parseFloat(document.getElementById('interestRate').value) / 100 || 0;
    const inflation = parseFloat(document.getElementById('inflationRate').value) / 100 || 0;
    const fee = parseFloat(document.getElementById('feeRate').value) / 100 || 0;
    const years = parseInt(document.getElementById('timePeriod').value);
    
    document.getElementById('yearDisplay').innerText = years;

    let labels = [], grossData = [], realData = [];

    for (let i = 0; i <= years; i++) {
        labels.push('Year ' + i);
        const gross = initial * Math.pow(1 + (interest - fee), i);
        const real = initial * Math.pow(1 + (interest - fee - inflation), i);
        grossData.push(gross.toFixed(2));
        realData.push(real.toFixed(2));
    }

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' });
    document.getElementById('grossCapital').innerText = formatter.format(grossData[years]);
    document.getElementById('realPower').innerText = formatter.format(realData[years]);
    document.getElementById('lossAmount').innerText = formatter.format(grossData[years] - realData[years]);

    updateChart(labels, grossData, realData);
}

function updateChart(labels, gross, real) {
    if (myChart) myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                { label: 'Gross Capital', data: gross, borderColor: '#007aff', backgroundColor: 'rgba(0, 122, 255, 0.1)', fill: true, tension: 0.4 },
                { label: 'Real Power', data: real, borderColor: '#34c759', backgroundColor: 'rgba(52, 199, 89, 0.1)', fill: true, tension: 0.4 }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#fff' } } } }
    });
}

document.querySelectorAll('input, select').forEach(input => input.addEventListener('input', calculate));
calculate();





