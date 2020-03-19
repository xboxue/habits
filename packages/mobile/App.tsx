import { ApolloProvider } from "@apollo/react-hooks";
import { NavigationContainer } from "@react-navigation/native";
import ApolloClient from "apollo-boost";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { HomeScreen } from "./src/screens/HomeScreen";

const client = new ApolloClient({ uri: "http://10.0.2.2:4000/graphql" });

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
