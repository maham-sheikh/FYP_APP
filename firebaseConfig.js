import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABseLRTgm6vkSTLXgiXa1Shnf833LnzhI",
  authDomain: "otpapp-e193f.firebaseapp.com",
  projectId: "otpapp-e193f",
  storageBucket: "otpapp-e193f.firebasestorage.app",
  messagingSenderId: "906030618378",
  appId: "1:906030618378:ios:842abd07c0c419dfdb4cf3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, firebaseConfig, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential };