import React, { useContext, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Button, Card, IconButton, useTheme } from "react-native-paper";
import { useKeyboard } from "../hooks/useKeyboard";
import { RootStoreContext } from "../stores/RootStore";

export const AddTodoInput = () => {
  const { todoStore, viewStore } = useContext(RootStoreContext);
  const [value, setValue] = useState("");
  const { colors } = useTheme();

  useKeyboard({ keyboardDidHide: () => viewStore.setAddModal(false) });

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
        <IconButton icon="calendar-check" color={colors.primary} />
        <IconButton icon="repeat" color={colors.primary} />
        <Button
          color={colors.primary}
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
