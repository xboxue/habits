import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { FeedScreen } from "./FeedScreen";
import { HomeScreen } from "./HomeScreen";

const Tab = createBottomTabNavigator();

export const BottomTabsScreen = () => (
  <Tab.Navigator
    tabBarOptions={{ keyboardHidesTabBar: true }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        const iconName = route.name === "Home" ? "home" : "users";
        return <Feather name={iconName} size={size} color={color} />;
      }
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Feed" component={FeedScreen} />
  </Tab.Navigator>
);
