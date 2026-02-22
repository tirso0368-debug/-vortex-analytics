document.addEventListener('DOMContentLoaded', () => {
    // Referencias exactas a tus IDs originales
    const initialInput = document.getElementById('initial-capital');
    const interestInput = document.getElementById('annual-interest');
    const inflationInput = document.getElementById('annual-inflation');
    const feeInput = document.getElementById('management-fee');
    const timeRange = document.getElementById('time-range');
    const timeDisplay = document.getElementById('time-display');

    const grossText = document.getElementById('gross-capital');
    const realText = document.getElementById('real-power');
    const lossText = document.getElementById('purchasing-loss');
    const statusMsg = document.getElementById('status-message');

    const ctx = document.getElementById('analyticsChart').getContext('2d');
    let analyticsChart;

    function calculate() {
        const p = parseFloat(initialInput.value) || 0;
        const r = (parseFloat(interestInput.value) || 0) / 100;
        const i = (parseFloat(inflationInput.value) || 0) / 100;
        const f = (parseFloat(feeInput.value) || 0) / 100;
        const t = parseInt(timeRange.value);

        timeDisplay.textContent = t;

        let labels = [];
        let grossData = [];
        let realData = [];

        for (let year = 0; year <= t; year++) {
            labels.push(`Año ${year}`);
            
            // Cálculo Nominal
            const gross = p * Math.pow((1 + r), year);
            grossData.push(gross.toFixed(2));

            // Cálculo Real (Ajustado por inflación y comisiones)
            const realRate = (1 + r - f) / (1 + i) - 1;
            const real = p * Math.pow((1 + realRate), year);
            realData.push(real.toFixed(2));
        }

        const finalGross = parseFloat(grossData[t]);
        const finalReal = parseFloat(realData[t]);
        const loss = finalGross - finalReal;

        // Actualizar textos con formato moneda
        grossText.textContent = `${finalGross.toLocaleString()}€`;
        realText.textContent = `${finalReal.toLocaleString()}€`;
        lossText.textContent = `-${loss.toLocaleString()}€`;

        // Lógica de "Consultas a la gente" (Mensajes de impacto)
        const lossPercent = (loss / finalGross) * 100;
        if (lossPercent > 30) {
            statusMsg.innerHTML = "⚠️ <span style='color: #ff4444;'>ALERTA:</span> La inflación está destruyendo tu patrimonio.";
        } else {
            statusMsg.innerHTML = "✅ <span style='color: #00ff88;'>INFO:</span> Tu capital mantiene valor real.";
        }

        updateChart(labels, grossData, realData);
    }

    function updateChart(labels, gross, real) {
        if (analyticsChart) analyticsChart.destroy();
        analyticsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Capital Bruto', data: gross, borderColor: '#007aff', tension: 0.4 },
                    { label: 'Poder Real', data: real, borderColor: '#00ff88', tension: 0.4 }
                ]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                scales: { 
                    y: { grid: { color: '#1f2937' }, ticks: { color: '#94a3b8' } },
                    x: { ticks: { color: '#94a3b8' } }
                },
                plugins: { legend: { labels: { color: '#fff' } } }
            }
        });
    }

    [initialInput, interestInput, inflationInput, feeInput, timeRange].forEach(input => {
        input.addEventListener('input', calculate);
    });

    calculate();
});





