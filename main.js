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
                        backgroundColor: '#00ff88',
                        borderRadius: 5,
                    },
                    {
                        label: 'VALOR REAL (INFLACIÓN) (€)',
                        data: realData,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
                },
                plugins: {
                    legend: { labels: { color: '#fff', font: { family: 'monospace' } } }
                }
            }
        });
    }

    function updateVortex() {
        // Aseguramos que lea bien los números aunque pongas puntos o comas
        const initial = parseFloat(document.getElementById('initial-


