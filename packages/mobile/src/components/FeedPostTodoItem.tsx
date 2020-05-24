import React from "react";
import { IconButton, List } from "react-native-paper";

interface Props {
  todo: {
    title: string;
    completed: boolean;
  };
}

export const FeedPostTodoItem = ({ todo }: Props) => {
  return (
    <List.Item
      title={todo.title}
      left={() => (
        <IconButton icon={todo.completed ? "check-circle" : "circle-outline"} />
      )}
      titleStyle={todo.completed && { textDecorationLine: "line-through" }}
    />
  );
};
