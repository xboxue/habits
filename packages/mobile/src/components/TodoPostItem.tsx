import { observer } from "mobx-react";
import React from "react";
import { IconButton, List } from "react-native-paper";
import { Todo } from "../models/Todo";

interface Props {
  todo: Todo;
  drag: () => void;
}

export const TodoPostItem = observer(({ todo, drag }: Props) => {
  return (
    <List.Item
      title={todo.title}
      onPress={() => {}}
      onLongPress={drag}
      left={() => (
        <IconButton icon={todo.completed ? "check-circle" : "circle-outline"} />
      )}
      right={() => (
        <IconButton icon="close" onPress={() => todo.toggleSelected()} />
      )}
      titleStyle={todo.completed && { textDecorationLine: "line-through" }}
    />
  );
});
