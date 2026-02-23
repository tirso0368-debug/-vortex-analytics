document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    let v_Chart;

    // --- FUNCIÓN PARA DIBUJAR LA GRÁFICA ---
    function renderChart(labels, nominalData, realData) {
        if (v_Chart) {
            v_Chart.destroy();
        }

        v_Chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'CAPITAL BRUTO (€)',
                        data: nominalData,
                        backgroundColor: '#00ff88', // Verde neón
                        borderColor: '#00ff88',
                        borderWidth: 1,
                        borderRadius: 4
                    },
                    {
                        label: 'PODER REAL (CON INFLACIÓN) (€)',
                        data: realData,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Blanco traslúcido
                        borderColor: '#ffffff',
                        borderWidth: 1,
                        borderRadius: 4
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
                        ticks: { color: '#888', font: { family: 'monospace', size: 10 } }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: { color: '#fff', font: { family: 'monospace', size: 11 } }
                    },
                    tooltip: {
                        backgroundColor: '#111',
                        titleFont: { family: 'monospace' },
                        bodyFont: { family: 'monospace' },
                        borderColor: '#00ff88',
                        borderWidth: 1
                    }
                }
            }
        });
    }

    // --- FUNCIÓN DE CÁLCULO VORTEX ---
    function runVortex() {
        const initial = parseFloat(document.getElementById('initial-capital').value) || 0;
        const monthly = parseFloat(document.getElementById('monthly-savings').value) || 0;
        const years = parseInt(document.getElementById('time-range').value) || 1;
        const rate = (parseFloat(document.getElementById('annual-interest').value) || 0) / 100;
        const inflation = (parseFloat(document.getElementById('annual-inflation').value) || 0) / 100;
        const age = parseInt(document.getElementById('user-age').value) || 0;

        // Actualizar textos de la interfaz
        document.getElementById('time-display').innerText = years;
        document.getElementById('retirement-age').innerText = age + years;

        let labels = [];
        let nominalData = [];
        let realData = [];

        let currentNominal = initial;

        for (let i = 0; i <= years; i++) {
            labels.push("Año " + i);
            
            // Poder de compra real aplicando inflación acumulada
            let currentReal = currentNominal / Math.pow(1 + inflation, i);
            
            nominalData.push(Math.round(currentNominal));
            realData.push(Math.round(currentReal));

            // Interés compuesto anual: (Capital + Ahorro del año) * Interés
            currentNominal = (currentNominal + (monthly * 12)) * (1 + rate);
        }

        // Mostrar resultados en las tarjetas (Metrics)
        const fNominal = nominalData[years];
        const fReal = realData[years];
        const fLoss = fNominal - fReal;

        document.getElementById('gross-capital').innerText = `${fNominal.toLocaleString('es-ES')}€`;
        document.getElementById('real-power').innerText = `${fReal.toLocaleString('es-ES')}€`;
        document.getElementById('purchasing-loss').innerText = `${fLoss.toLocaleString('es-ES')}€`;

        // Dibujar/Actualizar gráfica
        renderChart(labels, nominalData, realData);
    }

    // --- LISTENERS ---
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', runVortex);
    });

    // Modal de Captura
    const btnDownload = document.getElementById('download-report');
    if (btnDownload) {
        btnDownload.addEventListener('click', () => {
            document.getElementById('lead-modal').style.display = 'flex';
        });
    }

    const btnClose = document.getElementById('close-modal');
    if (btnClose) {
        btnClose.addEventListener('click', () => {
            document.getElementById('lead-modal').style.display = 'none';
        });
    }

    // Ejecutar al cargar
    runVortex();
});



