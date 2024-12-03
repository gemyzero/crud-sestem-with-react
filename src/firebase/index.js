import { initializeApp } from "firebase/app";

// not miss
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCih7pPaDrtqjqwB6YIbqIQTmKJ6qNx2AA",
  authDomain: "gemy432-97a3f.firebaseapp.com",
  projectId: "gemy432-97a3f",
  storageBucket: "gemy432-97a3f.appspot.com",
  messagingSenderId: "1043897085946",
  appId: "1:1043897085946:web:a3f42302e2c02de1a23e43"
};

const app = initializeApp(firebaseConfig); 

// not miss
 export const db = getFirestore(app);