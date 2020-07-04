import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { IconButton, Surface } from "react-native-paper";

interface Props {
  onSubmit: (value: string) => void;
}

export const AddCommentInput = ({ onSubmit }: Props) => {
  const [value, setValue] = useState("");

  return (
    <Surface style={styles.container}>
      <TextInput
        autoFocus
        style={styles.input}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={() => onSubmit(value)}
      />
      <IconButton icon="check" onPress={() => onSubmit(value)} />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    elevation: 5,
    flexDirection: "row"
  },
  input: {
    flex: 1
  }
});
