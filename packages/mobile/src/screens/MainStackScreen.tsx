import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";
import React from "react";
import { BottomTabsScreen } from "./BottomTabsScreen";
import { NewPostModal } from "./NewPostModal";
import { PostModal } from "./PostModal";
import { ProfileScreen } from "./ProfileScreen";
import { SearchUsersModal } from "./SearchUsersModal";
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
    <MainStack.Screen name="SearchUsersModal" component={SearchUsersModal} />
    <MainStack.Screen name="Profile" component={ProfileScreen} />
    <MainStack.Screen name="PostModal" component={PostModal} />
  </MainStack.Navigator>
));
