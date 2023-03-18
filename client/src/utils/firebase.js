import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDE5z5KIxU4jr18U8-4hnrFfeTh-HNKb8",
  authDomain: "utube-clone-2141b.firebaseapp.com",
  projectId: "utube-clone-2141b",
  storageBucket: "utube-clone-2141b.appspot.com",
  messagingSenderId: "586210920055",
  appId: "1:586210920055:web:9c496908140db9667fe872"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;


