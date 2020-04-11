import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Button, Dialog } from "react-native-paper";
import { RootStoreContext } from "../stores/RootStore";
import { days } from "../utils/days";
import { DayIcon } from "./DayIcon";

export const RepeatModal = observer(() => {
  const { viewStore } = useContext(RootStoreContext);

  return (
    <Modal
      isVisible={viewStore.showRepeatModal}
      style={styles.modal}
      backdropTransitionOutTiming={0}
    >
      <Dialog visible>
        <Dialog.Title>Repeat every</Dialog.Title>
        <Dialog.Content>
          <View style={styles.container}>
            {days.map((day, index) => (
              <DayIcon key={day} day={index} />
            ))}
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              viewStore.focusedTodo.repeatDays = {};
              viewStore.setRepeatModal(false);
            }}
          >
            Cancel
          </Button>
          <Button onPress={() => viewStore.setRepeatModal(false)}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
