import { ApolloProvider } from "@apollo/react-hooks";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ApolloClient from "apollo-boost";
import { AppLoading } from "expo";
import React, { useContext, useState } from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { createConnection } from "typeorm/browser";
import { Todo as TodoEntity } from "./src/entities/Todo";
import { HomeScreen } from "./src/screens/HomeScreen";
import { RootStoreContext } from "./src/stores/RootStore";

const client = new ApolloClient({ uri: "http://10.0.2.2:4000/graphql" });
const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backdrop: "transparent"
  }
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const { todoStore } = useContext(RootStoreContext);

  const load = async () => {
    await createConnection({
      type: "expo",
      driver: require("expo-sqlite"),
      database: "test",
      synchronize: true,
      logging: true,
      entities: [TodoEntity]
    });

    todoStore.loadTodos();
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={load}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
