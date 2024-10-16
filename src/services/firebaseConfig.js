// src/services/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA-dVnN_YnF15iEUfZFVn2YLw-5PbLmuqM",
  authDomain: "mobility-project-ebefc.firebaseapp.com",
  projectId: "mobility-project-ebefc",
  storageBucket: "mobility-project-ebefc.appspot.com",
  messagingSenderId: "670995419246",
  appId: "1:670995419246:web:16ea6da86322eddc5d567f"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener Firestore y Authentication
const db = getFirestore(app);
const auth = getAuth(app);

// Exportar la colección de incidentes y auth
export const incidentsCollection = collection(db, "incidents");
export { db, auth };
