import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator, FAB, Portal, TextInput } from "react-native-paper";
import { TodoCard } from "../components/TodoCard";
import {
  TodosDocument,
  TodosQuery,
  useAddTodoMutation,
  useTodosQuery
} from "../graphql/types";
import { useKeyboard } from "../hooks/useKeyboard";

export const HomeScreen = () => {
  const [add, setAdd] = useState(false);
  const [value, setValue] = useState("");

  const { loading, error, data } = useTodosQuery();
  const [createTodo] = useAddTodoMutation({
    update: (cache, { data }) => {
      const { todos } = cache.readQuery<TodosQuery>({
        query: TodosDocument
      });

      cache.writeQuery<TodosQuery>({
        query: TodosDocument,
        data: { todos: todos.concat([data.addTodo]) }
      });
    }
  });

  useKeyboard(
    () => {},
    () => setAdd(false)
  );

  if (loading) return <ActivityIndicator />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.todos.map(todo => (
        <TodoCard key={todo.id} {...todo} />
      ))}
      <Portal>
        {add && (
          <KeyboardAvoidingView style={styles.input} behavior="position">
            <TextInput
              value={value}
              autoFocus
              placeholder="Add a task"
              onChangeText={setValue}
              onSubmitEditing={() => {
                createTodo({ variables: { input: { title: value } } });
                setValue("");
              }}
            />
          </KeyboardAvoidingView>
        )}
        <FAB
          visible
          style={styles.fab}
          onPress={() => setAdd(true)}
          icon="plus"
        />
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "black"
  },
  container: {
    flex: 1
  },
  input: {
    position: "absolute",
    bottom: 0
  }
});
