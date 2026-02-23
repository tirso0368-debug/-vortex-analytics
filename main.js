document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    let v_Chart;

    function renderChart(labels, nominalData, realData) {
        if (v_Chart) { v_Chart.destroy(); }
        v_Chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'CAPITAL ACUMULADO (€)',
                        data: nominalData,
                        backgroundColor: '#00ff88', // Verde neón
                        borderRadius: 5,
                    },
                    {
                        label: 'VALOR REAL (AJUSTADO A INFLACIÓN) (€)',
                        data: realData,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Blanco traslúcido
                        borderRadius: 5,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { color: '#222' }, ticks: { color: '#00ff88' } },
                    x: { grid: { display: false }, ticks: { color: '#888' } }
                }
            }
        });
    }

    function updateVortex() {
        const initial = parseFloat(document.getElementById('initial-capital').value) || 0;
        const monthly = parseFloat(document.getElementById('monthly-savings').value) || 0;
        const years = parseInt(document.getElementById('time-range').value) || 1;
        const rate = (parseFloat(document.getElementById('annual-interest').value) || 0) / 100;
        const inflation = (parseFloat(document.getElementById('annual-inflation').value) || 0) / 100;

        let labels = [], nominalData = [], realData = [];
        let currentNominal = initial;

        for (let i = 0; i <= years; i++) {
            labels.push("Año " + i);
            let currentReal = currentNominal / Math.pow(1 + inflation, i);
            nominalData.push(Math.round(currentNominal));
            realData.push(Math.round(currentReal));
            currentNominal = (currentNominal + (monthly * 12)) * (1 + rate);
        }

        renderChart(labels, nominalData, realData);
    }

    document.querySelectorAll('input, select').forEach(el => el.addEventListener('input', updateVortex));
    document.getElementById('download-report').addEventListener('click', () => {
        document.getElementById('lead-modal').style.display = 'flex';
    });
    updateVortex();
});

