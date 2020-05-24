import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";
import React from "react";
import { BottomTabsScreen } from "./BottomTabsScreen";
import { NewPostModal } from "./NewPostModal";
import { SelectTodoModal } from "./SelectTodoModal";

const MainStack = createStackNavigator();

export const MainStackScreen = observer(() => (
  <MainStack.Navigator
    mode="modal"
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: "white" }
    }}
  >
    <MainStack.Screen name="BottomTabs" component={BottomTabsScreen} />
    <MainStack.Screen name="NewPostModal" component={NewPostModal} />
    <MainStack.Screen name="SelectTodoModal" component={SelectTodoModal} />
  </MainStack.Navigator>
));
