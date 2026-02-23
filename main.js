
/* ===============================
   VORTEX TECHNOLOGIES CORE ENGINE
   =============================== */

console.log("🚀 VORTEX Core Loaded");


/* ===============================
   GLOBAL STATE
   =============================== */

const VORTEX = {

    user: {
        name: "Usuario",
        balance: 12450,
        monthlyIncome: 1800,
        monthlySavings: 320,
        growthRate: 0.06
    },

    system: {
        version: "1.0",
        initialized: false
    }

};

window.VORTEX = VORTEX;


/* ===============================
   UTILS
   =============================== */

const Utils = {

    formatMoney(amount) {
        return amount.toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR"
        });
    },

    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

};


/* ===============================
   SMOOTH SCROLL
   =============================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


/* ===============================
   NAVBAR EFFECT
   =============================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 40) {

        header.style.background = "rgba(10,15,30,0.85)";
        header.style.backdropFilter = "blur(10px)";
        header.style.borderBottom = "1px solid rgba(255,255,255,0.08)";

    } else {

        header.style.background = "transparent";
        header.style.backdropFilter = "none";
        header.style.borderBottom = "none";

    }

});


/* ===============================
   PAGE FADE
   =============================== */

window.addEventListener("load", () => {

    document.body.style.opacity = 0;

    setTimeout(() => {
        document.body.style.transition = "opacity 1s ease";
        document.body.style.opacity = 1;
    }, 100);

});


/* ===============================
   INTERSECTION ANIMATIONS
   =============================== */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";

        }

    });

}, { threshold: 0.1 });


document.querySelectorAll(".feature, .card, section").forEach(el => {

    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.8s ease";

    observer.observe(el);

});


/* ===============================
   FINANCIAL ENGINE
   =============================== */

const FinancialEngine = {

    simulateSavings(monthlyAmount, years) {

        const months = years * 12;
        const rate = VORTEX.user.growthRate / 12;

        let total = 0;

        for (let i = 0; i < months; i++) {
            total = (total + monthlyAmount) * (1 + rate);
        }

        return total;
    },

    predictNetWorth(years) {

        const monthly = VORTEX.user.monthlySavings;
        return this.simulateSavings(monthly, years);

    }

};

VORTEX.financial = FinancialEngine;


/* ===============================
   AI MESSAGE ENGINE
   =============================== */

const AIEngine = {

    messages: [
        "Tu optimización financiera está por encima del 78% de usuarios.",
        "Nueva oportunidad detectada: puedes ahorrar 120€ adicionales.",
        "Predicción positiva para los próximos 90 días.",
        "Tu estabilidad económica ha mejorado.",
        "Nivel financiero actualizado correctamente.",
        "Buen progreso hacia libertad financiera."
    ],

    getMessage() {
        return this.messages[
            Math.floor(Math.random() * this.messages.length)
        ];
    }

};

VORTEX.ai = AIEngine;


/* ===============================
   LIVE ACTIVITY SYSTEM
   =============================== */

function createLiveNotification(text) {

    const notif = document.createElement("div");
    notif.className = "vortex-notification";
    notif.innerText = text;

    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.opacity = "1";
        notif.style.transform = "translateY(0)";
    }, 50);

    setTimeout(() => {
        notif.style.opacity = "0";
        notif.remove();
    }, 4000);

}


const activities = [
    "Nuevo usuario registrado",
    "Predicción financiera generada",
    "Sistema optimizado",
    "Meta financiera creada",
    "Análisis completado"
];

setInterval(() => {

    const randomActivity =
        activities[Math.floor(Math.random() * activities.length)];

    createLiveNotification(randomActivity);

}, 9000);


/* ===============================
   FORM SYSTEM
   =============================== */

const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", () => {

        const button = form.querySelector("button");

        if (button) {

            button.textContent = "Procesando...";
            button.disabled = true;

            setTimeout(() => {
                button.textContent = "Acceso solicitado ✓";
            }, 1500);

        }

    });

}


/* ===============================
   COUNTER ANIMATION
   =============================== */

function animateCounter(element, endValue, duration = 1500) {

    let start = 0;
    const increment = endValue / (duration / 16);

    function update() {

        start += increment;

        if (start >= endValue) {
            element.innerText = Utils.formatMoney(endValue);
            return;
        }

        element.innerText = Utils.formatMoney(start);
        requestAnimationFrame(update);

    }

    update();

}


/* ===============================
   SIMULATOR SYSTEM
   =============================== */

function runSimulation() {

    const result = FinancialEngine.predictNetWorth(5);

    console.log("Simulación 5 años:", Utils.formatMoney(result));

}

runSimulation();


/* ===============================
   BOOT SEQUENCE
   =============================== */

function bootSystem() {

    console.log("Inicializando módulos financieros...");
    console.log("Cargando inteligencia...");
    console.log("Conectando núcleo...");
    console.log("Sistema listo.");

    VORTEX.system.initialized = true;

}

bootSystem();


/* ===============================
   FUTURE AI CONNECTOR
   =============================== */

async function askVortexAI(message) {

    try {

        const response = await fetch("/api/ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        return data.reply;

    } catch (err) {

        return "Sistema de inteligencia temporalmente no disponible.";

    }

}

VORTEX.askAI = askVortexAI;









