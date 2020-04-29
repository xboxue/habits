import { User } from "firebase";
import Firebase from "./firebase";

export const getUser = new Promise<User>((resolve, reject) => {
  const unsubscribe = Firebase.auth().onAuthStateChanged(user => {
    unsubscribe();
    resolve(user);
  }, reject);
});
