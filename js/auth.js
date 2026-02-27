import { auth } from "./firebase.js";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from  "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";// LOGIN
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Completa todos los campos.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "evaluacion.html";
  } catch (error) {
    alert("Error al iniciar sesión: " + error.message);
    console.error(error);
  }
};

// REGISTER
window.register = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (password.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "evaluacion.html";
  } catch (error) {
    alert("Error al crear cuenta: " + error.message);
    console.error(error);
  }
};
