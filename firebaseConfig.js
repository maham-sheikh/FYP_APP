import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaRziL4hdQ3RSgn_Kk4PJQycr9tXhOz2o", 
  authDomain: "findigoapp-ffa7a.firebaseapp.com",    
  projectId: "findigoapp-ffa7a",
  storageBucket: "findigoapp-ffa7a.appspot.com",     
  messagingSenderId: "922532947674",
  appId: "1:922532947674:ios:4e65af7d65bb01be8a27e3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, firebaseConfig, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential };