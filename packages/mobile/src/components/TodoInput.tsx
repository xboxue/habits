import React, { useContext, useState } from "react";
import { TextInput } from "react-native-paper";
import { useKeyboard } from "../hooks/useKeyboard";
import { RootStoreContext } from "../stores/RootStore";

export const TodoInput = () => {
  const { todoStore } = useContext(RootStoreContext);
  const [value, setValue] = useState("");

  useKeyboard(undefined, () => {
    todoStore.isAdding = false;
  });

  return (
    <TextInput
      autoFocus
      placeholder="Add a task"
      value={value}
      onChangeText={setValue}
      blurOnSubmit={false}
      onSubmitEditing={() => {
        if (!value) return;
        todoStore.addTodo(value);
        setValue("");
      }}
    />
  );
};
