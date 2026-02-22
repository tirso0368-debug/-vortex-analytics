const ctx = document.getElementById('analyticsChart').getContext('2d');
let myChart;

function initChart() {
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                { label: 'Capital Bruto', data: [], borderColor: '#3b82f6', tension: 0.3, fill: false },
                { label: 'Poder Real', data: [], borderColor: '#00ff88', tension: 0.3, fill: false }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#ffffff', font: { family: 'Inter' } } } },
            scales: {
                y: { ticks: { color: '#666' }, grid: { color: '#1a1a1a' } },
                x: { ticks: { color: '#666' }, grid: { color: '#1a1a1a' } }
            }
        }
    });
}

function updateAnalytics() {
    const capital = parseFloat(document.getElementById('initial-capital').value) || 0;
    const interes = (parseFloat(document.getElementById('annual-interest').value) || 0) / 100;
    const inflacion = (parseFloat(document.getElementById('annual-inflation').value) || 0) / 100;
    const gestion = (parseFloat(document.getElementById('management-fee').value) || 0) / 100;
    const años = parseInt(document.getElementById('time-range').value);

    document.getElementById('time-display').innerText = años;

    let labels = [];
    let dataBruto = [];
    let dataReal = [];

    for (let i = 0; i <= años; i++) {
        labels.push('Año ' + i);
        let bruto = capital * Math.pow(1 + (interes - gestion), i);
        let real = capital * Math.pow(1 + (interes - gestion - inflacion), i);
        dataBruto.push(bruto.toFixed(2));
        dataReal.push(real.toFixed(2));
    }

    myChart.data.labels = labels;
    myChart.data.datasets[0].data = dataBruto;
    myChart.data.datasets[1].data = dataReal;
    myChart.update();

    const finalBruto = dataBruto[dataBruto.length - 1];
    const finalReal = dataReal[dataReal.length - 1];
    
    document.getElementById('gross-capital').innerText = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(finalBruto);
    document.getElementById('real-power').innerText = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(finalReal);
    document.getElementById('purchasing-loss').innerText = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(finalBruto - finalReal);
}

initChart();
updateAnalytics();

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', updateAnalytics);
});







