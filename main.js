
document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DE LA INTERFAZ ---
    const downloadBtn = document.getElementById('download-report');
    const modal = document.getElementById('lead-modal');
    const closeModal = document.getElementById('close-modal');
    const timeRange = document.getElementById('time-range');
    const timeDisplay = document.getElementById('time-display');
    const retirementAge = document.getElementById('retirement-age');

    // --- LÓGICA DEL MODAL ---
    if (downloadBtn && modal) {
        downloadBtn.addEventListener('click', () => {
            modal.style.display = 'flex'; // Muestra el modal
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // --- LÓGICA DE CÁLCULOS ---
    function updateCalculations() {
        const initial = parseFloat(document.getElementById('initial-capital').value) || 0;
        const monthly = parseFloat(document.getElementById('monthly-savings').value) || 0;
        const years = parseInt(timeRange.value);
        const rate = (parseFloat(document.getElementById('annual-interest').value) || 0) / 100;
        const inflation = (parseFloat(document.getElementById('annual-inflation').value) || 0) / 100;
        const age = parseInt(document.getElementById('user-age').value) || 0;

        // Actualizar textos
        timeDisplay.innerText = years;
        retirementAge.innerText = age + years;

        // Cálculo Interés Compuesto
        let totalNominal = initial * Math.pow(1 + rate, years);
        for (let i = 1; i <= years * 12; i++) {
            totalNominal += monthly * Math.pow(1 + rate / 12, (years * 12) - i);
        }

        // Ajuste por Inflación (Poder de compra real)
        const totalReal = totalNominal / Math.pow(1 + inflation, years);
        const loss = totalNominal - totalReal;

        // Mostrar resultados
        document.getElementById('gross-capital').innerText = `$${totalNominal.toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        document.getElementById('real-power').innerText = `$${totalReal.toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        document.getElementById('purchasing-loss').innerText = `$${loss.toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }

    // Escuchar cambios en los inputs
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', updateCalculations);
    });

    // Iniciar cálculos al cargar
    updateCalculations();
});
