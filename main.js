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
        const years
