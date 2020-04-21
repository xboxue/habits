import { ApolloProvider } from "@apollo/react-hooks";
import { NavigationContainer } from "@react-navigation/native";
import ApolloClient from "apollo-boost";
import { AppLoading } from "expo";
import "mobx-react-lite/batchingForReactNative";
import React, { useContext, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { createConnection } from "typeorm/browser";
import { RootStackNavigator } from "./src/components/RootStackNavigator";
import { Todo as TodoEntity } from "./src/entities/Todo";
import { RootStoreContext } from "./src/stores/RootStore";
import { theme } from "./src/styles/theme";

const client = new ApolloClient({ uri: "http://10.0.2.2:4000/graphql" });

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
        <NavigationContainer theme={theme}>
          <RootStackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
