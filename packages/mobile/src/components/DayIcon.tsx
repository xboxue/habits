import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { RootStoreContext } from "../stores/RootStore";
import { days } from "../utils/days";

interface Props {
  day: number;
}

export const DayIcon = observer(({ day }: Props) => {
  const { viewStore } = useContext(RootStoreContext);

  return (
    <TouchableOpacity
      onPress={() =>
        (viewStore.focusedTodo.repeatDays[day] = !viewStore.focusedTodo
          .repeatDays[day])
      }
      style={[
        styles.circle,
        viewStore.focusedTodo.repeatDays[day] && styles.selected
      ]}
    >
      <Text>{days[day][0]}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  circle: {
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f1f1"
  },
  selected: { backgroundColor: "#00BBF2" }
});
