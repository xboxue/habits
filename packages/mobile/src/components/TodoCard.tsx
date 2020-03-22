import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { Todo } from "../models/Todo";
import { RootStoreContext } from "../stores/RootStore";

interface Props {
  todo: Todo;
}

export const TodoCard = observer(({ todo }: Props) => {
  const { todoStore } = useContext(RootStoreContext);
  const icon = todoStore.isSelecting
    ? todo.selected
      ? "radiobox-marked"
      : "circle-outline"
    : todo.completed
    ? "check-circle"
    : "circle-outline";

  return (
    <Card
      style={styles.card}
      onPress={() => {
        if (todoStore.isSelecting) return todo.toggleSelected();
        todoStore.isEditing = true;
        todoStore.focusedTodo = todo;
      }}
      onLongPress={() => {
        if (todoStore.isSelecting) return;
        todoStore.isSelecting = true;
        todo.toggleSelected();
      }}
    >
      <Card.Title
        title={todo.title}
        left={() => (
          <IconButton
            icon={icon}
            onPress={() =>
              todoStore.isSelecting
                ? todo.toggleSelected()
                : todo.toggleCompleted()
            }
          />
        )}
        titleStyle={todo.completed && { textDecorationLine: "line-through" }}
      />
    </Card>
  );
});

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 6,
    marginVertical: 2
  }
});
