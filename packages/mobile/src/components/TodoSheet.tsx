import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Card, IconButton } from "react-native-paper";
import { RootStoreContext } from "../stores/RootStore";
import { EditTodoInput } from "./EditTodoInput";
import { TodoSheetList } from "./TodoSheetList";

export const TodoSheet = observer(() => {
  const { todoStore, viewStore } = useContext(RootStoreContext);

  return (
    <Modal
      isVisible={viewStore.showEditModal}
      swipeDirection="down"
      backdropTransitionOutTiming={0}
      onBackdropPress={() => viewStore.setEditModal(false)}
      onSwipeComplete={() => viewStore.setEditModal(false)}
      onModalHide={() => viewStore.setFocusedTodo(null)}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.bar} />
        <Card>
          <Card.Content style={styles.card}>
            <IconButton
              onPress={() => viewStore.focusedTodo.toggleCompleted()}
              icon={
                viewStore.focusedTodo?.completed
                  ? "check-circle"
                  : "circle-outline"
              }
            />
            <EditTodoInput />
            <IconButton
              onPress={() => {
                viewStore.setEditModal(false);
                todoStore.deleteTodo(viewStore.focusedTodo);
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
