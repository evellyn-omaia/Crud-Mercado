 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAk0q1Ai3xpbaETD-0X5sz4eFRQ7NU_CrY",
    authDomain: "estoque-9be14.firebaseapp.com",
    databaseURL: "https://estoque-9be14-default-rtdb.firebaseio.com",
    projectId: "estoque-9be14",
    storageBucket: "estoque-9be14.firebasestorage.app",
    messagingSenderId: "225749644856",
    appId: "1:225749644856:web:aff473ba6c4431be4598cd"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const database = getDatabase(app);