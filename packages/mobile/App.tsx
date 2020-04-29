import { ApolloProvider } from "@apollo/react-hooks";
import { NavigationContainer } from "@react-navigation/native";
import ApolloClient from "apollo-boost";
import { AppLoading } from "expo";
import "mobx-react-lite/batchingForReactNative";
import React, { useContext, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackNavigator } from "./src/components/RootStackNavigator";
import { RootStoreContext } from "./src/stores/RootStore";
import { theme } from "./src/styles/theme";
import { connect } from "./src/utils/connect";
import { getUser } from "./src/utils/getUser";

const client = new ApolloClient({ uri: "http://10.0.2.2:4000/graphql" });

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const { todoStore, viewStore } = useContext(RootStoreContext);

  const load = async () => {
    const [user] = await Promise.all([getUser, connect()]);
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
            <RootStackNavigator />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
