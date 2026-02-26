import { auth } from "./firebase.js";
import { db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

window.finalizarTest = async function () {

  const user = auth.currentUser;

  if (!user) {
    alert("Usuario no autenticado");
    window.location.href = "index.html";
    return;
  }

  const q1 = document.querySelector('input[name="q1"]:checked');
  const q2 = document.querySelector('input[name="q2"]:checked');
  const q3 = document.querySelector('input[name="q3"]:checked');

  if (!q1 || !q2 || !q3) {
    alert("Responde todas las preguntas");
    return;
  }

  let analitico = 0;
  let creativo = 0;

  [q1, q2, q3].forEach(q => {
    if (q.value === "analitico") analitico++;
    if (q.value === "creativo") creativo++;
  });

  const resultado = analitico > creativo ? "Analítico" : "Creativo";

  try {
    await setDoc(doc(db, "resultados", user.uid), {
      email: user.email,
      resultado: resultado,
      fecha: new Date()
    });

    alert("Evaluación guardada correctamente");
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error(error);
    alert("Error guardando resultado");
  }
};
