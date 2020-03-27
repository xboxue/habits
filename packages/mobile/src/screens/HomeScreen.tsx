import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";
import { Appbar, FAB, Portal } from "react-native-paper";
import { TodoList } from "../components/TodoList";
import { TodoSelectBar } from "../components/TodoSelectBar";
import { TodoSheet } from "../components/TodoSheet";
import { RootStoreContext } from "../stores/RootStore";

export const HomeScreen = observer(() => {
  const { todoStore } = useContext(RootStoreContext);

  return (
    <CalendarProvider
      style={styles.container}
      date={todoStore.date}
      onDateChanged={date => (todoStore.date = date)}
      showTodayButton
      todayBottomMargin={40}
      todayButtonStyle={styles.todayButton}
    >
      {todoStore.isSelecting ? (
        <TodoSelectBar />
      ) : (
        <Appbar.Header>
          <Appbar.Content
            title={
              isToday(todoStore.parsedDate)
                ? "Today"
                : isTomorrow(todoStore.parsedDate)
                ? "Tomorrow"
                : isYesterday(todoStore.parsedDate)
                ? "Yesterday"
                : format(todoStore.parsedDate, "MMMM d")
            }
          />
        </Appbar.Header>
      )}
      <WeekCalendar firstDay={1} />
      <TodoList />
      <TodoSheet />
      <Portal>
        <FAB
          visible
          style={styles.fab}
          onPress={() => (todoStore.isAdding = true)}
          icon="plus"
        />
      </Portal>
    </CalendarProvider>
  );
});

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "black"
  },
  container: {
    flex: 1
  },
  todayButton: {
    alignSelf: "center"
  }
});
