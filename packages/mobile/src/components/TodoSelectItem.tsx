import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { IconButton, List, useTheme } from "react-native-paper";
import { Todo } from "../models/Todo";

interface Props {
  todo: Todo;
}

export const TodoSelectItem = observer(({ todo }: Props) => {
  const { colors } = useTheme();

  return (
    <List.Item
      title={todo.title}
      onPress={() => todo.toggleSelected()}
      left={() => (
        <IconButton
          icon={todo.selected ? "radiobox-marked" : "circle-outline"}
        />
      )}
      style={[
        styles.container,
        todo.selected && { backgroundColor: colors.background }
      ]}
      titleStyle={todo.completed && { textDecorationLine: "line-through" }}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  }
});
