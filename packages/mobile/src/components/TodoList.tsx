import { observer } from "mobx-react";
import React, { useContext } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { TodoCard } from "../components/TodoCard";
import { RootStoreContext } from "../stores/RootStore";
import { AddTodoInput } from "./AddTodoInput";

export const TodoList = observer(() => {
  const { todoStore } = useContext(RootStoreContext);

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ flex: 1, justifyContent: "space-between" }}
    >
      <ScrollView keyboardShouldPersistTaps="always">
        {todoStore.todos.map(todo => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </ScrollView>
      {todoStore.isAdding && <AddTodoInput />}
    </KeyboardAvoidingView>
  );
});
