import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, FAB, Portal } from "react-native-paper";
import { TodoList } from "../components/TodoList";
import { TodoSelectBar } from "../components/TodoSelectBar";
import { TodoSheet } from "../components/TodoSheet";
import { RootStoreContext } from "../stores/RootStore";

export const HomeScreen = observer(() => {
  const { todoStore } = useContext(RootStoreContext);

  return (
    <View style={styles.container}>
      {todoStore.isSelecting ? (
        <TodoSelectBar />
      ) : (
        <Appbar.Header>
          <Appbar.Content title="Home" />
        </Appbar.Header>
      )}
      <TodoList />
      <TodoSheet />
      <Portal>
        <FAB
          visible
          style={styles.fab}
          onPress={() => (todoStore.isAdding = true)}
          icon="plus"
        />
      </Portal>
    </View>
  );
});

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "black"
  },
  container: {
    flex: 1
  }
});
