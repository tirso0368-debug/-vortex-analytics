document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    let myChart;

    // --- FUNCIÓN PARA DIBUJAR LA GRÁFICA ---
    function updateChart(nominalData, realData, labels) {
        if (myChart) { myChart.destroy(); }
        
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Capital Bruto (€)',
                        data: nominalData,
                        backgroundColor: '#00ff88',
                        borderColor: '#00ff88',
                        borderWidth: 1
                    },
                    {
                        label: 'Poder Real (€)',
                        data: realData,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: '#ffffff',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { color: '#222' }, ticks: { color: '#00ff88' } },
                    x: { grid: { display: false }, ticks: { color: '#888' } }
                },
                plugins: {
                    legend: { labels: { color: '#fff', font: { family: 'monospace' } } }
                }
            }
        });
    }

    // --- FUNCIÓN DE CÁLCULOS ---
    function updateCalculations() {
        const initial = parseFloat(document.getElementById('initial-capital').value) || 0;
        const monthly = parseFloat(document.getElementById('monthly-savings').value) || 0;
        const years = parseInt(document.getElementById('time-range').value);
        const rate = (parseFloat(document.getElementById('annual-interest').value) || 0) / 100;
        const inflation = (parseFloat(document.getElementById('annual-inflation').value) || 0) / 100;
        const age = parseInt(document.getElementById('user-age').value) || 0;

        document.getElementById('time-display').innerText = years;
        document.getElementById('retirement-age').innerText = age + years;

        let nominalData = [];
        let realData = [];
        let labels = [];

        let currentNominal = initial;
        
        for (let y = 0; y <= years; y++) {
            labels.push(`Año ${y}`);
            const powerReal = currentNominal / Math.pow(1 + inflation, y);
            nominalData.push(currentNominal);
            realData.push(powerReal);
            
            // Incremento para el año siguiente
            currentNominal = (currentNominal + (monthly * 12)) * (1 + rate);
        }

        // Mostrar resultados finales
        const finalNominal = nominalData[years];
        const finalReal = realData[years];
        
        document.getElementById('gross-capital').innerText = `$${finalNominal.toLocaleString('es-ES', {maximumFractionDigits:0})}`;
        document.getElementById('real-power').innerText = `$${finalReal.toLocaleString('es-ES', {maximumFractionDigits:0})}`;
        document.getElementById('purchasing-loss').innerText = `$${(finalNominal - finalReal).toLocaleString('es-ES', {maximumFractionDigits:0})}`;

        updateChart(nominalData, realData, labels);
    }

    // --- EVENTOS ---
    document.querySelectorAll('input, select').forEach(el => {
        el.addEventListener('input', updateCalculations);
    });

    // Lógica del Modal
    document.getElementById('download-report').addEventListener('click', () => {
        document.getElementById('lead-modal').style.display = 'flex';
    });

    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('lead-modal').style.display = 'none';
    });

    updateCalculations();
});

