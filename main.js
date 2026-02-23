document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    let v_Chart;

    // --- FUNCIÓN PARA DIBUJAR LA GRÁFICA ---
    function renderChart(labels, nominalData, realData) {
        if (v_Chart) {
            v_Chart.destroy(); // Borra la anterior para no encimar
        }

        v_Chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'CAPITAL BRUTO',
                        data: nominalData,
                        backgroundColor: '#00ff88', // Verde neón
                        borderColor: '#00ff88',
                        borderWidth: 1
                    },
                    {
                        label: 'PODER REAL',
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
                        labels: { color: '#fff', font: { family: 'monospace', size: 10 } }
                    }
                }
            }
        });
    }

    // --- FUNCIÓN DE CÁLCULO ---
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
            let currentReal = currentNominal / Math.pow(1 + inflation, i);
            
            nominalData.push(currentNominal.toFixed(0));
            realData.push(currentReal.toFixed(0));

            // Fórmula Interés Compuesto: (Capital + Ahorro Anual) * Interés
            currentNominal = (currentNominal + (monthly * 12)) * (1 + rate);
        }

        // Mostrar resultados en las tarjetas superiores
        const fNominal = nominalData[years];
        const fReal = realData[years];
        const fLoss = fNominal - fReal;

        document.getElementById('gross-capital').innerText = `${Number(fNominal).toLocaleString('es-ES')}€`;
        document.getElementById('real-power').innerText = `${Number(fReal).toLocaleString('es-ES')}€`;
        document.getElementById('purchasing-loss').innerText = `${Number(fLoss).toLocaleString('es-ES')}€`;

        // Lanzar la gráfica
        renderChart(labels, nominalData, realData);
    }

    // --- ACTIVADORES (LISTENERS) ---
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', runVortex);
    });

    // Abrir modal de captura de leads
    const btnDownload = document.getElementById('download-report');
    if (btnDownload) {
        btnDownload.addEventListener('click', () => {
            document.getElementById('lead-modal').style.display = 'flex';
        });
    }

    // Cerrar modal
    const btnClose = document.getElementById('close-modal');
    if (btnClose) {
        btnClose.addEventListener('click', () => {
            document.getElementById('lead-modal').style.display = 'none';
        });
    }

    // Arrancar la primera vez
    runVortex();
});


