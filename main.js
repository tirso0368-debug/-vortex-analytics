// Esperamos a que el navegador esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log("Vortex Analytics: Sistema iniciado");

    const ctx = document.getElementById('analyticsChart');
    if (!ctx) {
        console.error("Error: No se encontró el lienzo de la gráfica");
        return;
    }

    let myChart;

    function calculate() {
        try {
            // Captura de datos de los recuadritos
            const initial = parseFloat(document.getElementById('initialCapital').value) || 0;
            const interest = (parseFloat(document.getElementById('interestRate').value) || 0) / 100;
            const inflation = (parseFloat(document.getElementById('inflationRate').value) || 0) / 100;
            const fee = (parseFloat(document.getElementById('feeRate').value) || 0) / 100;
            const years = parseInt(document.getElementById('timePeriod').value) || 1;

            // Actualizar el texto de los años
            document.getElementById('yearDisplay').innerText = years;

            let labels = [];
            let grossData = [];
            let realData = [];

            // Cálculo matemático
            for (let i = 0; i <= years; i++) {
                labels.push('Year ' + i);
                const gross = initial * Math.pow(1 + (interest - fee), i);
                const real = initial * Math.pow(1 + (interest - fee - inflation), i);
                grossData.push(gross.toFixed(2));
                realData.push(real.toFixed(2));
            }

            // Formateo de moneda (Estilo Profesional)
            const formatter = new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'EUR' 
            });

            document.getElementById('grossCapital').innerText = formatter.format(grossData[years]);
            document.getElementById('realPower').innerText = formatter.format(realData[years]);
            document.getElementById('lossAmount').innerText = formatter.format(grossData[years] - realData[years]);

            updateChart(labels, grossData, realData);
        } catch (error) {
            console.error("Error en el cálculo:", error);
        }
    }

    function updateChart(labels, gross, real) {
        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Gross Capital',
                        data: gross,
                        borderColor: '#007aff', // Azul Vortex
                        backgroundColor: 'rgba(0, 122, 255, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Real Power',
                        data: real,
                        borderColor: '#34c759', // Verde Real Power



