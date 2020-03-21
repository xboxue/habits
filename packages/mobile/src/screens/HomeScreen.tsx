import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, FAB, Portal } from "react-native-paper";
import { TodoList } from "../components/TodoList";
import { RootStoreContext } from "../stores/RootStore";

export const HomeScreen = observer(() => {
  const { todoStore } = useContext(RootStoreContext);

  return (
    <View style={styles.container}>
      {!todoStore.isSelecting ? (
        <Appbar.Header>
          <Appbar.Content title="Home" />
        </Appbar.Header>
      ) : (
        <Appbar.Header>
          <Appbar.Action
            style={styles.closeIcon}
            icon="close"
            onPress={() => {
              todoStore.isSelecting = false;
              todoStore.toggleAllSelected(false);
            }}
          />
          <Appbar.Action
            icon="delete"
            onPress={() => {
              todoStore.deleteSelected();
              todoStore.isSelecting = false;
            }}
          />
        </Appbar.Header>
      )}
      <TodoList />
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
  },
  closeIcon: {
    marginRight: "auto"
  }
});
