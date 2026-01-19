import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAL5d_s1suwynuNn-1BI1kGlkjj9fqAoiM",
  authDomain: "codelearn-platform.firebaseapp.com",
  projectId: "codelearn-platform",
  storageBucket: "codelearn-platform.firebasestorage.app",
  messagingSenderId: "970418070950",
  appId: "1:970418070950:web:26b71ba71cac06a1d01b67",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
