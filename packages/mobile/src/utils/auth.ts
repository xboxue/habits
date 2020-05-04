import * as Google from "expo-google-app-auth";
import { User } from "firebase";
import Facebook from "./facebook";
import Firebase from "./firebase";

export const getUser = new Promise<User>((resolve, reject) => {
  const unsubscribe = Firebase.auth().onAuthStateChanged(user => {
    unsubscribe();
    resolve(user);
  }, reject);
});

export const getGoogleCredential = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId:
        "832534296077-uiqbfio3jn8b1e7mi78sq1vnvnr9q20j.apps.googleusercontent.com"
    });
    if (result.type === "cancel") throw new Error("Cancelled");

    return Firebase.auth.GoogleAuthProvider.credential(result.idToken);
  } catch (error) {
    console.log(error);
  }
};

export const getFacebookCredential = async () => {
  try {
    const result = await Facebook.logInWithReadPermissionsAsync();
    if (result.type === "cancel") throw new Error("Cancelled");

    return Firebase.auth.FacebookAuthProvider.credential(result.token);
  } catch (error) {
    console.log(error);
  }
};
