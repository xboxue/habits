import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { RootStoreContext } from "../stores/RootStore";

export const TodoSelectBar = observer(() => {
  const { todoStore } = useContext(RootStoreContext);

  return (
    <Appbar.Header>
      <Appbar.Action
        style={styles.closeIcon}
        icon="close"
        onPress={() => {
          todoStore.isSelecting = false;
          todoStore.toggleAllSelected(false);
        }}
      />
      <Appbar.Action
        icon="delete"
        onPress={() => {
          todoStore.deleteSelected();
          todoStore.isSelecting = false;
        }}
      />
    </Appbar.Header>
  );
});

const styles = StyleSheet.create({
  closeIcon: {
    marginRight: "auto"
  }
});
