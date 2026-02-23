document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    let myChart;

    // --- CONFIGURACIÓN DE LA GRÁFICA ---
    function initChart(nominalData, realData, labels) {
        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Capital Bruto',
                        data: nominalData,
                        backgroundColor: '#00ff88',
                        borderColor: '#00ff88',
                        borderWidth: 1
                    },
                    {
                        label: 'Poder de Compra Real',
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
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#00ff88', font: { family: 'monospace' } }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#888', font: { family: 'monospace' } }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: { color: '#fff', font: { family: 'monospace' } }
                    }
                }
            }
        });
    }

    // --- CÁLCULOS MATEMÁTICOS ---
    function calculate() {
        const initial = parseFloat(document.getElementById('initial-capital').value) || 0;
        const monthly = parseFloat(document.getElementById('monthly-savings').value) || 0;
        const years = parseInt(document.getElementById('time-range').value) || 1;
        const rate = (parseFloat(document.getElementById('annual-interest').value) || 0) / 100;
        const inflation = (parseFloat(document.getElementById('annual-inflation').value) || 0) / 100;
        const age = parseInt(document.getElementById('user-age').value) || 0;

        // Actualizar etiquetas de texto
        document.getElementById('time-display').innerText = years;
        document.getElementById('retirement-age').innerText = age + years;

        let nominalData = [];
        let realData = [];
        let labels = [];

        let currentNominal = initial;

        for (let i = 0; i <= years; i++) {
            labels.push("Año " + i);
            let powerReal = currentNominal / Math.pow(1 + inflation, i);
            
            nominalData.push(currentNominal.toFixed(2));
            realData.push(powerReal.toFixed(2));

            // Cálculo para el siguiente año (interés compuesto)
            currentNominal = (currentNominal + (monthly * 12)) * (1 + rate);
        }

        // Mostrar totales en las tarjetas
        const finalNominal = nominalData[years];
        const finalReal = realData[years];

        document.getElementById('gross-capital').innerText = `${Number(finalNominal).toLocaleString('es-ES')}€`;
        document.getElementById('real-power').innerText = `${Number(finalReal).toLocaleString('es-ES')}€`;
        document.getElementById('purchasing-loss').innerText = `${(finalNominal - finalReal).toLocaleString('es-ES')}€`;

        initChart(nominalData, realData, labels);
    }

    // --- LISTENERS ---
    document.querySelectorAll('input, select').forEach(el => {
        el.addEventListener('input', calculate);
    });

    // Abrir modal
    document.getElementById('download-report').addEventListener('click', () => {
        document.getElementById('lead-modal').style.display = 'flex';
    });

    // Cerrar modal
    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('lead-modal').style.display = 'none';
    });

    // Primera ejecución
    calculate();
});


