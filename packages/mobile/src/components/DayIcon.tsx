import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { RootStoreContext } from "../stores/RootStore";
import { days } from "../utils/days";

interface Props {
  day: number;
}

export const DayIcon = observer(({ day }: Props) => {
  const { viewStore } = useContext(RootStoreContext);
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() =>
        (viewStore.focusedTodo.repeatDays[day] = !viewStore.focusedTodo
          .repeatDays[day])
      }
      style={[
        styles.circle,
        {
          backgroundColor: viewStore.focusedTodo.repeatDays[day]
            ? colors.primary
            : colors.background
        }
      ]}
    >
      <Text style={viewStore.focusedTodo.repeatDays[day] && { color: "white" }}>
        {days[day][0]}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  circle: {
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  }
});
