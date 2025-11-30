import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBlJ8otlsR1ipYIQhNbk8m-hIQ3J5cC_QU",
    authDomain: "nira-xt-x-guardian.firebaseapp.com",
    projectId: "nira-xt-x-guardian",
    storageBucket: "nira-xt-x-guardian.firebasestorage.app",
    messagingSenderId: "476930864478",
    appId: "1:476930864478:web:4fe55429c50ef641f10bcf",
    measurementId: "G-1E70MC7XDV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
