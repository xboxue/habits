import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";
import React, { useContext } from "react";
import { RootStoreContext } from "../stores/RootStore";
import { MainStackScreen } from "./MainStackScreen";
import { SignInScreen } from "./SignInScreen";

const RootStack = createStackNavigator();

export const RootStackScreen = observer(() => {
  const { viewStore } = useContext(RootStoreContext);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {viewStore.user ? (
        <RootStack.Screen name="Main" component={MainStackScreen} />
      ) : (
        <RootStack.Screen name="SignIn" component={SignInScreen} />
      )}
    </RootStack.Navigator>
  );
});
