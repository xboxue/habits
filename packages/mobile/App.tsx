import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { HomeScreen } from "./src/screens/HomeScreen";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    </PaperProvider>
  );
}
