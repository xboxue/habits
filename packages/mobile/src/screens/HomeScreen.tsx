import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { FAB, Portal, useTheme } from "react-native-paper";
import { CalendarBar } from "../components/CalendarBar";
import { RepeatModal } from "../components/RepeatModal";
import { TodoHeader } from "../components/TodoHeader";
import { TodoList } from "../components/TodoList";
import { TodoSheet } from "../components/TodoSheet";
import { RootStoreContext } from "../stores/RootStore";

export const HomeScreen = observer(() => {
  const { viewStore } = useContext(RootStoreContext);
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  return (
    <>
      <TodoHeader />
      <CalendarBar />
      <TodoList />
      <RepeatModal />
      <TodoSheet />
      <Portal>
        <FAB
          visible={!viewStore.showAddModal && isFocused}
          style={[styles.fab, { backgroundColor: colors.text }]}
          onPress={() => viewStore.setAddModal(true)}
          icon="plus"
        />
      </Portal>
    </>
  );
});

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 50
  },
  todayButton: {
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  },
  todayButtonText: {
    fontSize: 12,
    marginTop: 6,
    marginBottom: 6
  }
});
