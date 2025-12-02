// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCy9DtFyOywT9wsfv3Js4nGvV0UStVt_Hk",
  authDomain: "ssmart12.firebaseapp.com",
  projectId: "ssmart12",
  storageBucket: "ssmart12.appspot.com",
  messagingSenderId: "343859906946",
  appId: "1:343859906946:web:427396bff8b6ac9dcb679b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
