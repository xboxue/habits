import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Card, IconButton } from "react-native-paper";
import { RootStoreContext } from "../stores/RootStore";
import { EditTodoInput } from "./EditTodoInput";
import { TodoSheetList } from "./TodoSheetList";

export const TodoSheet = observer(() => {
  const { todoStore } = useContext(RootStoreContext);

  return (
    <Modal
      isVisible={todoStore.isEditing}
      swipeDirection="down"
      backdropTransitionOutTiming={0}
      onBackdropPress={() => (todoStore.isEditing = false)}
      onSwipeComplete={() => (todoStore.isEditing = false)}
      onModalHide={() => (todoStore.focusedTodo = null)}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.bar} />
        <Card>
          <Card.Content style={styles.card}>
            <IconButton
              onPress={() => todoStore.focusedTodo.toggleCompleted()}
              icon={
                todoStore.focusedTodo?.completed
                  ? "check-circle"
                  : "circle-outline"
              }
            />
            <EditTodoInput />
            <IconButton
              onPress={() => {
                todoStore.isEditing = false;
                todoStore.deleteTodo(todoStore.focusedTodo);
              }}
              icon="delete"
            />
          </Card.Content>
        </Card>
        <TodoSheetList />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0
  },
  bar: {
    backgroundColor: "black",
    borderRadius: 4,
    height: 5,
    width: 40,
    alignSelf: "center"
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 10
  },
  card: {
    flexDirection: "row",
    alignItems: "center"
  }
});
