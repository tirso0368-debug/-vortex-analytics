// 🔥 Firebase versión navegador (SIN NPM)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCSa3xZ2iKtvnPaXeNQMluaoa27iiOEyeM",
  authDomain: "vortex-app-c8b00.firebaseapp.com",
  projectId: "vortex-app-c8b00",
  storageBucket: "vortex-app-c8b00.appspot.com",
  messagingSenderId: "174144803653",
  appId: "1:174144803653:web:eeb421bd5770ee1f69a42c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
