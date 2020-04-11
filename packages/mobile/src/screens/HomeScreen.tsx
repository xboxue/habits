import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";
import { Appbar, FAB, Portal } from "react-native-paper";
import { RepeatModal } from "../components/RepeatModal";
import { TodoList } from "../components/TodoList";
import { TodoSheet } from "../components/TodoSheet";
import { RootStoreContext } from "../stores/RootStore";

export const HomeScreen = observer(() => {
  const { todoStore, viewStore } = useContext(RootStoreContext);

  return (
    <CalendarProvider
      style={styles.container}
      date={todoStore.date}
      onDateChanged={date => todoStore.setDate(date)}
      showTodayButton={!viewStore.showAddModal}
      todayBottomMargin={40}
      todayButtonStyle={styles.todayButton}
    >
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
      <WeekCalendar firstDay={1} />
      <TodoList />
      <RepeatModal />
      <TodoSheet />
      <Portal>
        <FAB
          visible={!viewStore.showAddModal}
          style={styles.fab}
          onPress={() => viewStore.setAddModal(true)}
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
