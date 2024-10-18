// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAoiIG8aR9jlzQjvXmQt9B0480w5NpMPhE",
  authDomain: "hk-task-f2e9a.firebaseapp.com",
  projectId: "hk-task-f2e9a",
  storageBucket: "hk-task-f2e9a.appspot.com",
  messagingSenderId: "1004029614045",
  appId: "1:1004029614045:web:58fbdf79169cda667f0834",
  measurementId: "G-P4N15HLPJ3",
  databaseURL: "https://hk-task-f2e9a-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
