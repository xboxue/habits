import { observer } from "mobx-react";
import React, { useContext } from "react";
import { IconButton, List } from "react-native-paper";
import { RootStoreContext } from "../stores/RootStore";

export const TodoSheetList = observer(() => {
  const { viewStore } = useContext(RootStoreContext);

  return (
    <>
      <List.Item title="Set reminder" left={() => <List.Icon icon="bell" />} />
      <List.Item
        title={
          viewStore.focusedTodo?.isRepeating
            ? viewStore.focusedTodo?.repeatDaysText.join(", ")
            : "Repeat"
        }
        left={() => (
          <List.Icon
            icon="repeat"
            color={viewStore.focusedTodo?.isRepeating && "#00BBF2"}
          />
        )}
        right={() =>
          viewStore.focusedTodo?.isRepeating && (
            <IconButton
              icon="close"
              onPress={() => (viewStore.focusedTodo.repeatDays = {})}
            />
          )
        }
        onPress={() => viewStore.setRepeatModal(true)}
      />
    </>
  );
});
