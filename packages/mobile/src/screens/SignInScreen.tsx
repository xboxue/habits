import * as Google from "expo-google-app-auth";
import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStoreContext } from "../stores/RootStore";
import Facebook from "../utils/facebook";
import Firebase from "../utils/firebase";

export const SignInScreen = () => {
  const { viewStore } = useContext(RootStoreContext);

  const signInGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "832534296077-uiqbfio3jn8b1e7mi78sq1vnvnr9q20j.apps.googleusercontent.com"
      });

      if (result.type === "success") {
        const credential = Firebase.auth.GoogleAuthProvider.credential(
          result.idToken
        );
        const { user } = await Firebase.auth().signInWithCredential(credential);
        viewStore.setUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signInFacebook = async () => {
    try {
      const result = await Facebook.logInWithReadPermissionsAsync();
      if (result.type === "success") {
        const credential = Firebase.auth.FacebookAuthProvider.credential(
          result.token
        );
        const { user } = await Firebase.auth().signInWithCredential(credential);
        viewStore.setUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <Button onPress={signInFacebook}>Continue with Facebook</Button>
      <Button onPress={signInGoogle}>Continue with Google</Button>
    </SafeAreaView>
  );
};
