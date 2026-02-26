// auth.js

import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/* =========================
   LOGIN
========================= */
window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Por favor completa todos los campos.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "evaluacion.html";
  } catch (error) {
    alert("Error al iniciar sesión: " + traducirError(error.code));
  }
};


/* =========================
   REGISTRO
========================= */
window.register = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Por favor completa todos los campos.");
    return;
  }

  if (password.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "evaluacion.html";
  } catch (error) {
    alert("Error al crear cuenta: " + traducirError(error.code));
  }
};


/* =========================
   TRADUCCIÓN DE ERRORES
========================= */
function traducirError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "Este correo ya está registrado.";
    case "auth/invalid-email":
      return "Correo inválido.";
    case "auth/user-not-found":
      return "Usuario no encontrado.";
    case "auth/wrong-password":
      return "Contraseña incorrecta.";
    case "auth/weak-password":
      return "La contraseña es demasiado débil.";
    default:
      return "Ocurrió un error inesperado.";
  }
}


/* =========================
   OBSERVADOR DE SESIÓN
========================= */
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario autenticado:", user.email);
  } else {
    console.log("No hay usuario autenticado");
  }
});gic
