/**
 * VORTEX ANALYTICS CORE ENGINE
 */

function calculateVortex() {
    // Parámetros de entrada
    const capitalInicial = parseFloat(document.getElementById('initial-capital').value) || 0;
    const inflationRate = (parseFloat(document.getElementById('annual-inflation').value) / 100) || 0;
    const years = parseInt(document.getElementById('investment-years').value) || 0;
    const targetAssetPrice = parseFloat(document.getElementById('goal-selector').value);

    // Salidas UI
    const statusDisplay = document.getElementById('result-status');
    const detailsDisplay = document.getElementById('result-details');

    // Cálculo del Costo Futuro Ajustado (Inflación)
    // Formula: VF = P * (1 + i)^n
    const futureAssetPrice = targetAssetPrice * Math.pow(1 + inflationRate, years);
    
    // Balance Final
    const deficit = capitalInicial - futureAssetPrice;
    const isSuccess = deficit >= 0;

    // Renderizado de Resultados
    updateTerminalUI(isSuccess, futureAssetPrice, deficit, years);
}

function updateTerminalUI(success, price, diff, t) {
    const status = document.getElementById('result-status');
    const details = document.getElementById('result-details');

    const fmtPrice = price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const fmtDiff = Math.abs(diff).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    if (success) {
        status.style.color = "#00ff88";
        status.innerText = "ESTADO: PODER ADQUISITIVO VALIDADO";
        details.innerHTML = `PROYECCIÓN T+${t}: EL CAPITAL CUBRE EL ACTIVO.<br>` +
                            `COSTO ESTIMADO DEL BIEN: ${fmtPrice}€<br>` +
                            `EXCEDENTE DISPONIBLE: ${fmtDiff}€`;
    } else {
        status.style.color = "#ff4444";
        status.innerText = "ESTADO: EROSIÓN DE CAPITAL DETECTADA";
        details.innerHTML = `PROYECCIÓN T+${t}: EL CAPITAL NO CUBRE EL ACTIVO.<br>` +
                            `COSTO ESTIMADO DEL BIEN: ${fmtPrice}€<br>` +
                            `DÉFICIT DE PODER ADQUISITIVO: -${fmtDiff}€`;
    }
}

// Listeners de actualización en tiempo real
['initial-capital', 'annual-inflation', 'investment-years', 'goal-selector'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', calculateVortex);
    el.addEventListener('change', calculateVortex);
});

// Inicialización
calculateVortex();




