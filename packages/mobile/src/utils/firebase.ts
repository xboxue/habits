import * as Firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhNew1kQTIxk0sLd2hCkFtC4llXZCz0nI",
  authDomain: "tortoise-88352.firebaseapp.com",
  databaseURL: "https://tortoise-88352.firebaseio.com",
  projectId: "tortoise-88352",
  storageBucket: "tortoise-88352.appspot.com",
  messagingSenderId: "832534296077",
  appId: "1:832534296077:web:ddc81aaa9e2ca4ddaa8744",
  measurementId: "G-DSM596ELZW"
};

Firebase.initializeApp(firebaseConfig);

export default Firebase;
