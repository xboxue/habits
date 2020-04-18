import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";
import { useTheme } from "react-native-paper";
import { RootStoreContext } from "../stores/RootStore";

export const CalendarBar = observer(() => {
  const { todoStore } = useContext(RootStoreContext);
  const { colors } = useTheme();

  return (
    <CalendarProvider
      date={todoStore.date}
      onDateChanged={date => todoStore.setDate(date)}
      style={styles.container}
    >
      <WeekCalendar
        firstDay={1}
        theme={{
          selectedDayBackgroundColor: colors.text,
          todayTextColor: colors.primary
        }}
      />
    </CalendarProvider>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 0
  }
});
