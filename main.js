/* VORTEX ANALYTICS - CORE LOGIC V3 */
const ctx = document.getElementById('analyticsChart').getContext('2d');
let vortexChart;

// 1. Inicialización limpia de la gráfica
function init() {
    vortexChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                { 
                    label: 'Capital Bruto', 
                    data: [], 
                    borderColor: '#3b82f6', 
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    tension: 0.3, 
                    fill: true, 
                    pointRadius: 0,
                    pointHoverRadius: 5
                },
                { 
                    label: 'Poder Real', 
                    data: [], 
                    borderColor: '#00ff88', 
                    borderWidth: 3,
                    tension: 0.3, 
                    fill: false, 
                    pointRadius: 0,
                    pointHoverRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: { 
                legend: { 
                    display: true,
                    labels: { color: '#888', font: { family: 'JetBrains Mono', size: 12 } } 
                },
                tooltip: {
                    backgroundColor: '#0a0a0a',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#1a1a1a',
                    borderWidth: 1,
                    displayColors: true
                }
            },
            scales: {
                y: { 
                    beginAtZero: false,
                    grid: { color: '#111', drawBorder: false }, 
                    ticks: { color: '#444', font: { family: 'JetBrains Mono' } } 
                },
                x: { 
                    grid: { display: false }, 
                    ticks: { color: '#444', font: { family: 'JetBrains Mono' } } 
                }
            }
        }
    });
}

// 2. Función de cálculo de alto rendimiento
function refresh() {
    // Captura de datos con validación para evitar el "NaN"
    const cap = parseFloat(document.getElementById('initial-capital').value) || 0;
    const int = (parseFloat(document.getElementById('annual-interest').value) || 0) / 100;
    const inf = (parseFloat(document.getElementById('annual-inflation').value) || 0) / 100;
    const ges = (parseFloat(document.getElementById('management-fee').value) || 0) / 100;
    const yrs = parseInt(document.getElementById('time-range').value);

    // Actualizar el número de años en pantalla
    document.getElementById('time-display').innerText = yrs;

    let labs = []; 
    let dBruto = []; 
    let dReal = [];

    // El motor del Vórtex: Cálculo compuesto
    for (let i = 0; i <= yrs; i++) {
        labs.push('Año ' + i);
        // Fórmula de interés compuesto neto de comisiones
        let b = cap * Math.pow(1 + (int - ges), i);
        // Fórmula de poder adquisitivo (restando la inflación)
        let r = cap * Math.pow(1 + (int - ges - inf), i);
        
        dBruto.push(b.toFixed(2)); 
        dReal.push(r.toFixed(2));
    }

    // Actualización de datos en la gráfica
    vortexChart.data.labels = labs;
    vortexChart.data.datasets[0].data = dBruto;
    vortexChart.data.datasets[1].data = dReal;
    vortexChart.update('none'); // Update ultra-rápido

    // Formateo de moneda europea
    const fBruto = dBruto[dBruto.length - 1];
    const fReal = dReal[dReal.length - 1];
    
    const fmt = new Intl.NumberFormat('es-ES', { 
        style: 'currency', 
        currency: 'EUR',
        minimumFractionDigits: 2 
    });
    
    // Inyección de resultados en el DOM
    document.getElementById('gross-capital').innerText = fmt.format(fBruto);
    document.getElementById('real-power').innerText = fmt.format(fReal);
    document.getElementById('purchasing-loss').innerText = fmt.format(fBruto - fReal);
}

// 3. Lanzamiento
init();
refresh();

// 4. Escucha de eventos inteligente
// Aplicamos el evento a todos los inputs para que la web "viva" al cambiar valores
document.querySelectorAll('input').forEach(el => {
    el.addEventListener('input', refresh);
});
