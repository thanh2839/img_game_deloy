// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
export const firebaseConfig = {
    apiKey: "AIzaSyD9yVb745_9L_d8Y5YQ5q2J2360l23Z",
    authDomain: "img-game.firebaseapp.com",
    databaseURL: "https://img-game-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "img-game",
    storageBucket: "img-game.firebasestorage.app",
    messagingSenderId: "19113764138",
    appId: "1:19113764138:web:61d7fcb4b11cfa847dea53",
    measurementId: "G-8993EC38LR"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);