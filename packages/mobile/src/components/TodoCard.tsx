import { observer } from "mobx-react";
import React, { useContext } from "react";
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
      ? "circle"
      : "circle-outline"
    : todo.completed
    ? "check-circle"
    : "circle-outline";

  return (
    <Card
      onPress={() => {
        if (todoStore.isSelecting) todo.toggleSelected();
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
