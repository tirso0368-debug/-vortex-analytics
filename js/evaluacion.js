import { auth } from "./firebase.js";
import { db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.finalizarTest = async function () {

  const user = auth.currentUser;

  if (!user) {
    alert("Usuario no autenticado");
    window.location.href = "index.html";
    return;
  }

  let respuestas = [];

  for (let i = 1; i <= 12; i++) {
    const seleccion = document.querySelector(`input[name="q${i}"]:checked`);
    if (!seleccion) {
      alert("Responde todas las preguntas");
      return;
    }
    respuestas.push(parseInt(seleccion.value));
  }

  // Dimensiones
  const disciplina = respuestas[0] + respuestas[1] + respuestas[2];
  const enfoque = respuestas[3] + respuestas[4] + respuestas[5];
  const estrategia = respuestas[6] + respuestas[7] + respuestas[8];
  const ejecucion = respuestas[9] + respuestas[10] + respuestas[11];

  const convertir = (score) => Math.round((score / 15) * 100);

  const perfil = {
    disciplina: convertir(disciplina),
    enfoque: convertir(enfoque),
    estrategia: convertir(estrategia),
    ejecucion: convertir(ejecucion)
  };

  const scoreGlobal = Math.round(
    (perfil.disciplina +
     perfil.enfoque +
     perfil.estrategia +
     perfil.ejecucion) / 4
  );

  try {
    await setDoc(doc(db, "resultados", user.uid), {
      email: user.email,
      perfil: perfil,
      scoreGlobal: scoreGlobal,
      fecha: new Date()
    });

    alert("Evaluación completada correctamente");
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error(error);
    alert("Error guardando resultados");
  }
};
