import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { IconButton, List } from "react-native-paper";
import { Todo } from "../models/Todo";
import { RootStoreContext } from "../stores/RootStore";

interface Props {
  todo: Todo;
  drag: () => void;
}

export const TodoListItem = observer(({ todo, drag }: Props) => {
  const { viewStore } = useContext(RootStoreContext);

  return (
    <List.Item
      title={todo.title}
      onPress={() => {
        viewStore.setEditModal(true);
        viewStore.setFocusedTodo(todo);
      }}
      onLongPress={drag}
      left={() => (
        <IconButton
          icon={todo.completed ? "check-circle" : "circle-outline"}
          onPress={() => todo.toggleCompleted()}
        />
      )}
      style={styles.container}
      titleStyle={todo.completed && { textDecorationLine: "line-through" }}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  }
});
