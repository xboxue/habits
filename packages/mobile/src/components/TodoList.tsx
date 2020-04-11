import { observer } from "mobx-react";
import React, { useContext, useRef } from "react";
import { KeyboardAvoidingView } from "react-native";
import DraggableFlatlist from "react-native-draggable-flatlist";
import { Todo } from "../models/Todo";
import { RootStoreContext } from "../stores/RootStore";
import { AddTodoInput } from "./AddTodoInput";
import { TodoCard } from "./TodoCard";

export const TodoList = observer(() => {
  const { todoStore, viewStore } = useContext(RootStoreContext);
  const listRef = useRef(null);

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ flex: 1, justifyContent: "space-between" }}
    >
      <DraggableFlatlist<Todo>
        onContentSizeChange={() => {
          if (viewStore.showAddModal)
            listRef.current.current.getNode().scrollToEnd();
        }}
        onRef={ref => {
          listRef.current = ref;
        }}
        data={todoStore.todos.slice()}
        renderItem={({ item, drag, isActive }) => (
          <TodoCard todo={item} drag={drag} />
        )}
        keyExtractor={item => item.id.toString()}
      />
      {viewStore.showAddModal && <AddTodoInput />}
    </KeyboardAvoidingView>
  );
});
