// src/services/firebaseConfig.js

// Importamos las funciones necesarias desde el SDK de Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuración del proyecto de Firebase - reemplaza con tu propia configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_MOVILINFO_API_KEY,
  authDomain: import.meta.env.VITE_MOVILINFO_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_MOVILINFO_PROJECT_ID,
  storageBucket: import.meta.env.VITE_MOVILINFO_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MOVILINFO_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_MOVILINFO_APP_ID,
};

// Inicializamos la app de Firebase (asegurándonos de inicializarla solo una vez)
const app = initializeApp(firebaseConfig);

// Configuramos Firestore (base de datos)
const db = getFirestore(app);

// Configuramos el servicio de autenticación
const auth = getAuth(app);

// Creamos referencias a las colecciones que usaremos
const incidentsCollection = collection(db, 'incidents');
const usersCollection = collection(db, 'users');

// Exportamos las instancias de Firebase y las colecciones para usarlas en toda la aplicación
export { app, db, auth, incidentsCollection, usersCollection };
