import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateUserMutation } from "../graphql/types";
import { RootStoreContext } from "../stores/RootStore";
import { getFacebookCredential, getGoogleCredential } from "../utils/auth";
import Firebase from "../utils/firebase";

export const SignInScreen = () => {
  const [createUser] = useCreateUserMutation();
  const { viewStore } = useContext(RootStoreContext);

  const signIn = async (credential: Firebase.auth.OAuthCredential) => {
    const {
      user,
      additionalUserInfo
    } = await Firebase.auth().signInWithCredential(credential);

    viewStore.setUser(user);

    if (!additionalUserInfo.isNewUser) return;
    createUser({
      variables: {
        input: {
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          photoUrl: user.photoURL
        }
      }
    });
  };

  return (
    <SafeAreaView>
      <Button onPress={() => getFacebookCredential().then(signIn)}>
        Continue with Facebook
      </Button>
      <Button onPress={() => getGoogleCredential().then(signIn)}>
        Continue with Google
      </Button>
    </SafeAreaView>
  );
};
