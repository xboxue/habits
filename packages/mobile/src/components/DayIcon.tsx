import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { RootStoreContext } from "../stores/RootStore";
import { days } from "../utils/days";

interface Props {
  day: number;
}

export const DayIcon = observer(({ day }: Props) => {
  const { todoStore } = useContext(RootStoreContext);

  return (
    <TouchableOpacity
      onPress={() =>
        (todoStore.focusedTodo.repeatDays[day] = !todoStore.focusedTodo
          .repeatDays[day])
      }
      style={[
        styles.circle,
        todoStore.focusedTodo.repeatDays[day] && styles.selected
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
