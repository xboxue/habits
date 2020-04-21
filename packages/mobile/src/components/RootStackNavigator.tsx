import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { NewPostModal } from "../screens/NewPostModal";
import { SelectTodoModal } from "../screens/SelectTodoModal";
import { BottomTabNavigator } from "./BottomTabNavigator";

export const RootStackNavigator = () => {
  const RootStack = createStackNavigator();

  return (
    <RootStack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "white" }
      }}
    >
      <RootStack.Screen name="Main" component={BottomTabNavigator} />
      <RootStack.Screen name="NewPostModal" component={NewPostModal} />
      <RootStack.Screen name="SelectTodoModal" component={SelectTodoModal} />
    </RootStack.Navigator>
  );
};
