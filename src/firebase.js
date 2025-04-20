
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDwBlKoNrWJOOhNRevGbvgMGt4glQvYH6c",
  authDomain: "ipl-manager-907ae.firebaseapp.com",
  projectId: "ipl-manager-907ae",
  storageBucket: "ipl-manager-907ae.firebasestorage.app",
  messagingSenderId: "265322728332",
  appId: "1:265322728332:web:46e02982f978cec59764a9",
  measurementId: "G-MQL0800DXS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firebaseDb = getStorage(app);
export default app;