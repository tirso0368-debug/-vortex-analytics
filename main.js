const ctx = document.getElementById('analyticsChart').getContext('2d');
let myChart;

function initChart() {
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                { label: 'Capital Bruto', data: [], borderColor: '#58a6ff', fill: false },
                { label: 'Poder Real', data: [], borderColor: '#00ff88', fill: false }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#ffffff' } } },
            scales: {
                y: { ticks: { color: '#888' }, grid: { color: '#1a1a1a' } },
                x: { ticks: { color: '#888' }, grid: { color: '#1a1a1a' } }
            }
        }
    });
}

function updateAnalytics() {
    const capital = parseFloat(document.getElementById('initial-capital').value);
    const interes = parseFloat(document.getElementById('annual-interest').value) / 100;
    const inflacion = parseFloat(document.getElementById('annual-inflation').value) / 100;
    const gestion = parseFloat(document.getElementById('management-fee').value) / 100;
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
    
    document.getElementById('gross-capital').innerText = finalBruto + '€';
    document.getElementById('real-power').innerText = finalReal + '€';
    document.getElementById('purchasing-loss').innerText = (finalBruto - finalReal).toFixed(2) + '€';
}

// Iniciar
initChart();
updateAnalytics();

// Escuchar cambios sin crear bucles
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', updateAnalytics);
});






