import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { RootStoreContext } from "../stores/RootStore";

export const TodoHeader = observer(() => {
  const { todoStore } = useContext(RootStoreContext);

  return (
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
      {!isToday(todoStore.parsedDate) && (
        <Button
          style={styles.todayButton}
          labelStyle={styles.todayButtonText}
          onPress={() => todoStore.setDate(format(new Date(), "yyyy-MM-dd"))}
          color="white"
          mode="outlined"
        >
          Today
        </Button>
      )}
    </Appbar.Header>
  );
});

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 50
  },
  todayButton: {
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  },
  todayButtonText: {
    fontSize: 12,
    marginTop: 6,
    marginBottom: 6
  }
});
