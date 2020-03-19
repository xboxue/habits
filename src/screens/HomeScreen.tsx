import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { FAB, TextInput } from "react-native-paper";
import { ItemCard } from "../components/ItemCard";
import { useKeyboard } from "../hooks/useKeyboard";

export const HomeScreen = () => {
  const [add, setAdd] = useState(false);

  useKeyboard(
    () => {},
    () => setAdd(false)
  );

  return (
    <View style={styles.container}>
      <ItemCard title="Help me" />
      <ItemCard title="I love coding!" />
      {add && (
        <TextInput
          autoFocus
          placeholder="Add a task"
          onSubmitEditing={() => {}}
        />
      )}
      <FAB
        visible
        style={styles.fab}
        onPress={() => setAdd(true)}
        icon="plus"
      />
    </View>
  );
};

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
  }
});
