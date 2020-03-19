import React, { useState } from "react";
import { Card, IconButton } from "react-native-paper";

interface Props {
  title: string;
}

export const ItemCard = (props: Props) => {
  const [completed, setCompleted] = useState(false);

  return (
    <Card onPress={() => console.log("a")}>
      <Card.Title
        title={props.title}
        left={() => (
          <IconButton
            icon={completed ? "check-circle" : "circle-outline"}
            onPress={() => setCompleted(!completed)}
          />
        )}
        titleStyle={completed && { textDecorationLine: "line-through" }}
      />
    </Card>
  );
};
