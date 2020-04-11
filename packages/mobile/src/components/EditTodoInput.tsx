import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { RootStoreContext } from "../stores/RootStore";

export const EditTodoInput = observer(() => {
  const { viewStore } = useContext(RootStoreContext);
  const [value, setValue] = useState(viewStore.focusedTodo?.title);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onSubmitEditing={() => (viewStore.focusedTodo.title = value)}
      style={[
        styles.input,
        viewStore.focusedTodo.completed &&
          !isFocused && {
            textDecorationLine: "line-through"
          }
      ]}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    fontSize: 22,
    paddingLeft: 8,
    flex: 1
  }
});
