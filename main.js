document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const initialInput = document.getElementById('initial-capital');
    const interestInput = document.getElementById('annual-interest');
    const inflationInput = document.getElementById('annual-inflation');
    const feeInput = document.getElementById('management-fee');
    const timeRange = document.getElementById('time-range');
    const timeDisplay = document.getElementById('time-display');

    const grossCapitalText = document.getElementById('gross-capital');
    const realPowerText = document.getElementById('real-power');
    const purchasingLossText = document.getElementById('purchasing-loss');

    const ctx = document.getElementById('analyticsChart').getContext('2d');
    let analyticsChart;

    function calculate() {
        const p = parseFloat(initialInput.value);
        const r = parseFloat(interestInput.value) / 100;
        const i = parseFloat(inflationInput.value) / 100;
        const f = parseFloat(feeInput.value) / 100;
        const t = parseInt(timeRange.value);

        timeDisplay.textContent = t;

        let labels = [];
        let grossData = [];
        let realData = [];

        for (let year = 0; year <= t; year++) {
            labels.push(`Year ${year}`);
            
            // Capital Bruto: P * (1 + r)^t
            const gross = p * Math.pow((1 + r), year);
            grossData.push(gross.toFixed(2));

            // Capital Real (ajustado por inflación y comisiones)
            // La fórmula simplificada: r_real = (1 + r - f) / (1 + i) - 1
            const realRate = (1 + r - f) / (1 + i) - 1;
            const real = p * Math.pow((1 + realRate), year);
            realData.push(real.toFixed(2));
        }

        const finalGross = grossData[t];
        const finalReal = realData[t];
        const loss = finalGross - finalReal;

        // Actualizar textos
        grossCapitalText.textContent = `€${parseFloat(finalGross).toLocaleString()}`;
        realPowerText.textContent = `€${parseFloat(finalReal).toLocaleString()}`;
        purchasingLossText.textContent = `€${parseFloat(loss).toLocaleString()}`;

        updateChart(labels, grossData, realData);
    }

    function updateChart(labels, grossData, realData) {
        if (analyticsChart) {
            analyticsChart.destroy();
        }

        analyticsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Gross Capital',
                        data: grossData,
                        borderColor: '#007aff',
                        backgroundColor: 'rgba(0, 122, 255, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Real Power',
                        data: realData,
                        borderColor: '#00ff88',
                        backgroundColor: 'rgba(0, 255, 136, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, labels: { color: '#fff' } }
                },
                scales: {
                    y: { grid: { color: '#1f2937' }, ticks: { color: '#94a3b8' } },
                    x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                }
            }
        });
    }

    // Escuchar cambios
    [initialInput, interestInput, inflationInput, feeInput, timeRange].forEach(input => {
        input.addEventListener('input', calculate);
    });

    // Cálculo inicial
    calculate();
});




