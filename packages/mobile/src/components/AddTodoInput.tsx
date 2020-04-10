import React, { useContext, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
import { useKeyboard } from "../hooks/useKeyboard";
import { RootStoreContext } from "../stores/RootStore";

export const AddTodoInput = () => {
  const { todoStore } = useContext(RootStoreContext);
  const [value, setValue] = useState("");

  useKeyboard(undefined, () => (todoStore.isAdding = false));

  const addTodo = () => {
    if (!value) return;
    todoStore.addTodo(value);
    setValue("");
  };

  return (
    <Card style={styles.card} elevation={5}>
      <Card.Content>
        <TextInput
          autoFocus
          style={styles.input}
          placeholder="Add a task"
          value={value}
          onChangeText={setValue}
          blurOnSubmit={false}
          onSubmitEditing={addTodo}
        />
      </Card.Content>
      <Card.Actions>
        <IconButton color="blue" icon="calendar-check" />
        <IconButton color="blue" icon="repeat" />
        <Button
          color="blue"
          disabled={!value}
          onPress={addTodo}
          style={styles.saveButton}
        >
          Save
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  input: {
    fontSize: 16,
    paddingLeft: 8
  },
  saveButton: {
    marginLeft: "auto",
    marginRight: 10
  }
});
