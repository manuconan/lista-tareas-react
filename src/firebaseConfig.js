import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAe2k4onhmhN37YptDqZ0UF_fqWt7WFG_Y",
  authDomain: "listas-tareas-firebase.firebaseapp.com", // ← Añadir este campo
  projectId: "listas-tareas-firebase",
  storageBucket: "listas-tareas-firebase.appspot.com",
  messagingSenderId: "10187140917",
  appId: "1:10187140917:web:3903c4b2d84c9042a7a67c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, serverTimestamp };
// Exportamos la app y la base de datos para usarlas en otros archivos