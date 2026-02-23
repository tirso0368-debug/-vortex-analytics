document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    let v_Chart;

    // --- 1. MOTOR DE LA GRÁFICA ---
    function renderChart(labels, nominalData, realData) {
        if (v_Chart) {
            v_Chart.destroy(); // Evita que la gráfica parpadee o se duplique
        }

        v_Chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'CAPITAL ACUMULADO (€)',
                        data: nominalData,
                        backgroundColor: '#00ff88', // Verde Neón Vortex
                        borderRadius: 4,
                        borderWidth: 0,
                        barPercentage: 0.6
                    },
                    {
                        label: 'VALOR REAL (AJUSTADO A INFLACIÓN) (€)',
                        data: realData,
                        backgroundColor: 'rgba(255, 255, 255, 0.15)', // Blanco traslúcido para contraste
                        borderRadius: 4,
                        borderWidth: 0,
                        barPercentage: 0.6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 400 }, // Animación fluida pero rápida
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { 
                            color: '#00ff88', 
                            font: { family: 'monospace', size: 11 },
                            callback: value => value.toLocaleString() + '€'
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#888', font: { family: 'monospace', size: 10 } }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: '#fff', font: { family: 'monospace', size: 11 }, padding: 20 }
                    },
                    tooltip: {
                        backgroundColor: '#0a0a0a',
                        titleFont: { family: 'monospace' },
                        bodyFont: { family: 'monospace' },
                        borderColor: '#00ff88',
                        borderWidth: 1,
                        displayColors: false
                    }
                }
            }
        });
    }

    // --- 2. MOTOR DE CÁLCULOS ---
    function runVortex() {
        const initial = parseFloat(document.getElementById('initial-capital').value) || 0;
        const monthly = parseFloat(document.getElementById('monthly-savings').value) || 0;
        const years = parseInt(document.getElementById('time-range').value) || 1;
        const rate = (parseFloat(document.getElementById('annual-interest').value) || 0) / 100;
        const inflation = (parseFloat(document.getElementById('annual-inflation').value) || 0) / 100;
        const age = parseInt(document.getElementById('user-age').value) || 0;

        // Actualizar indicadores visuales
        document.getElementById('time-display').innerText = years;
        document.getElementById('retirement-age').innerText = age + years;

        let labels = [];
        let nominalData = [];
        let realData = [];
        let currentNominal = initial;

        for (let i = 0; i <= years; i++) {
            labels.push("Año " + i);
            
            // Fórmula: Poder de compra ajustado por inflación acumulada
            let currentReal = currentNominal / Math.pow(1 + inflation, i);
            
            nominalData.push(Math.round(currentNominal));
            realData.push(Math.round(currentReal));

            // Crecimiento anual: (Capital + Ahorro Mensual * 12) * Interés
            currentNominal = (currentNominal + (monthly * 12)) * (1 + rate);
        }

        // --- 3. ACTUALIZACIÓN DE TARJETAS (MÉTRICAS) ---
        const fNominal = nominalData[years];
        const fReal = realData[years];
        const fLoss = fNominal - fReal;

        document.getElementById('gross-capital').innerText = fNominal.toLocaleString('es-ES') + "€";
        document.getElementById('real-power').innerText = fReal.toLocaleString('es-ES') + "€";
        document.getElementById('purchasing-loss').innerText = fLoss.toLocaleString('es-ES') + "€";

        renderChart(labels, nominalData, realData);
    }

    // --- 4. CONTROLADORES DE EVENTOS ---
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', runVortex);
    });

    // Lógica del Modal (Lead Magnet)
    const btnReport = document.getElementById('download-report');
    const modal = document.getElementById('lead-modal');
    const btnClose = document.getElementById('close-modal');

    if (btnReport) {
        btnReport.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if (btnClose) {
        btnClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Arrancar sistema al cargar
    runVortex();
});



