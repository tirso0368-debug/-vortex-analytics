
// =========================
// DATOS DE MERCADO REALES
// =========================

async function loadMarket() {

  try {

    const btcRes = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur"
    );
    const btcData = await btcRes.json();

    document.getElementById("btc").innerText =
      btcData.bitcoin.eur.toLocaleString();


    const fxRes = await fetch(
      "https://api.exchangerate.host/latest?base=EUR&symbols=USD"
    );
    const fxData = await fxRes.json();

    document.getElementById("eurusd").innerText =
      fxData.rates.USD.toFixed(3);

  } catch (err) {

    console.log("Error mercado:", err);

  }

}

loadMarket();
setInterval(loadMarket, 60000);



// =========================
// CALCULADORA FINANCIERA
// =========================

let chart;

function calculate() {

  const capital = parseFloat(document.getElementById("capital").value);
  const rate = parseFloat(document.getElementById("rate").value) / 100;
  const inflation = parseFloat(document.getElementById("inflation").value) / 100;
  const years = parseInt(document.getElementById("years").value);

  let nominal = [];
  let real = [];
  let labels = [];

  let value = capital;
  let inflationFactor = 1;

  for (let i = 0; i <= years; i++) {

    labels.push("Año " + i);

    nominal.push(value);
    real.push(value / inflationFactor);

    value *= (1 + rate);
    inflationFactor *= (1 + inflation);

  }

  document.getElementById("future").innerText =
    nominal[nominal.length - 1].toFixed(0);

  document.getElementById("real").innerText =
    real[real.length - 1].toFixed(0);

  drawChart(labels, nominal, real);

}

function drawChart(labels, nominal, real) {

  const ctx = document.getElementById("chart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {

    type: "line",

    data: {
      labels: labels,
      datasets: [
        {
          label: "Capital nominal",
          data: nominal,
          borderWidth: 2
        },
        {
          label: "Valor real",
          data: real,
          borderWidth: 2
        }
      ]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false
    }

  });

}

calculate();



// =========================
// REGISTRO USUARIOS
// =========================

document.getElementById("signupForm").addEventListener("submit", function(e) {

  e.preventDefault();

  const email = document.getElementById("email").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({
    email: email,
    date: new Date().toISOString()
  });

  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("msg").innerText =
    "Cuenta creada correctamente";

  document.getElementById("signupForm").reset();

});











