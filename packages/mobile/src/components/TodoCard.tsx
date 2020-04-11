import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { Todo } from "../models/Todo";
import { RootStoreContext } from "../stores/RootStore";

interface Props {
  todo: Todo;
  drag: () => void;
}

export const TodoCard = observer(({ todo, drag }: Props) => {
  const { viewStore } = useContext(RootStoreContext);

  return (
    <Card
      style={styles.card}
      onPress={() => {
        viewStore.setEditModal(true);
        viewStore.setFocusedTodo(todo);
      }}
      onLongPress={drag}
    >
      <Card.Title
        title={todo.title}
        left={() => (
          <IconButton
            icon={todo.completed ? "check-circle" : "circle-outline"}
            onPress={() => todo.toggleCompleted()}
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
