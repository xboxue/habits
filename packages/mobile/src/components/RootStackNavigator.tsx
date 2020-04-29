import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";
import React, { useContext } from "react";
import { NewPostModal } from "../screens/NewPostModal";
import { SelectTodoModal } from "../screens/SelectTodoModal";
import { SignInScreen } from "../screens/SignInScreen";
import { RootStoreContext } from "../stores/RootStore";
import { BottomTabNavigator } from "./BottomTabNavigator";

export const RootStackNavigator = observer(() => {
  const RootStack = createStackNavigator();
  const { viewStore } = useContext(RootStoreContext);

  return (
    <RootStack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "white" }
      }}
    >
      {viewStore.user ? (
        <>
          <RootStack.Screen name="Main" component={BottomTabNavigator} />
          <RootStack.Screen name="NewPostModal" component={NewPostModal} />
          <RootStack.Screen
            name="SelectTodoModal"
            component={SelectTodoModal}
          />
        </>
      ) : (
        <>
          <RootStack.Screen name="SignIn" component={SignInScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
});
