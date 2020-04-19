import { observer } from "mobx-react";
import React, { useContext, useRef } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import DraggableFlatlist from "react-native-draggable-flatlist";
import { Divider } from "react-native-paper";
import { Todo } from "../models/Todo";
import { RootStoreContext } from "../stores/RootStore";
import { AddTodoInput } from "./AddTodoInput";
import { TodoListItem } from "./TodoListItem";

export const TodoList = observer(() => {
  const { todoStore, viewStore } = useContext(RootStoreContext);
  const listRef = useRef(null);

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <DraggableFlatlist<Todo>
        contentContainerStyle={styles.listContainer}
        onContentSizeChange={() => {
          if (viewStore.showAddModal)
            listRef.current.current.getNode().scrollToEnd();
        }}
        onRef={ref => {
          listRef.current = ref;
        }}
        data={todoStore.todos.slice()}
        renderItem={({ item, drag, isActive }) => (
          <TodoListItem todo={item} drag={drag} />
        )}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={Divider}
      />
      {viewStore.showAddModal && <AddTodoInput />}
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  listContainer: {
    paddingTop: 4,
    paddingBottom: 4
  }
});
