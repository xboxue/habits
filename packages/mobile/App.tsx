import { ApolloProvider } from "@apollo/react-hooks";
import { NavigationContainer } from "@react-navigation/native";
import ApolloClient from "apollo-boost";
import { AppLoading } from "expo";
import "mobx-react-lite/batchingForReactNative";
import React, { useContext, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackScreen } from "./src/screens/RootStackScreen";
import { RootStoreContext } from "./src/stores/RootStore";
import { theme } from "./src/styles/theme";
import { getUser } from "./src/utils/auth";
import { connect } from "./src/utils/connect";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const { todoStore, viewStore } = useContext(RootStoreContext);

  const client = new ApolloClient({
    uri: "http://10.0.2.2:4000/graphql",
    request: async operation => {
      const token = await viewStore.user.getIdToken();
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ""
        }
      });
    }
  });

  const load = async () => {
    const [user] = await Promise.all([getUser, connect()]);
    if (!user) return;
    viewStore.setUser(user);
    await todoStore.loadTodos();
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
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <RootStackScreen />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
