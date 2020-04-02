import { observer } from "mobx-react";
import React, { useContext } from "react";
import { IconButton, List } from "react-native-paper";
import { RootStoreContext } from "../stores/RootStore";

export const TodoSheetList = observer(() => {
  const { todoStore } = useContext(RootStoreContext);

  return (
    <>
      <List.Item title="Set reminder" left={() => <List.Icon icon="bell" />} />
      <List.Item
        title={
          todoStore.focusedTodo?.isRepeating
            ? todoStore.focusedTodo?.repeatDaysText.join(", ")
            : "Repeat"
        }
        left={() => (
          <List.Icon
            icon="repeat"
            color={todoStore.focusedTodo?.isRepeating && "#00BBF2"}
          />
        )}
        right={() =>
          todoStore.focusedTodo?.isRepeating && (
            <IconButton
              icon="close"
              onPress={() => (todoStore.focusedTodo.repeatDays = {})}
            />
          )
        }
        onPress={() => (todoStore.isEditingRepeat = true)}
      />
    </>
  );
});
