import { observer } from "mobx-react";
import React, { useContext } from "react";
import { FlatList } from "react-native";
import {
  Avatar,
  Card,
  Divider,
  IconButton,
  List,
  Paragraph,
  useTheme
} from "react-native-paper";
import { TodoListItem } from "../components/TodoListItem";
import { RootStoreContext } from "../stores/RootStore";

export const PostCard = observer(() => {
  const { todoStore } = useContext(RootStoreContext);
  const { colors } = useTheme();

  return (
    <Card style={{ elevation: 0, marginBottom: 10 }}>
      <Card.Title
        title="Bowen Xue"
        left={props => <Avatar.Text {...props} label="BX" />}
      />
      <Card.Content>
        <Paragraph>
          I did nothing today lol. Here's my plan for tomorrow
        </Paragraph>
        <FlatList
          data={todoStore.todos.slice(0, 3)}
          renderItem={({ item }) => (
            <TodoListItem todo={item} drag={() => {}} />
          )}
          ListFooterComponent={() => (
            <>
              <Divider />
              <List.Subheader>+12 more</List.Subheader>
            </>
          )}
          ItemSeparatorComponent={Divider}
          keyExtractor={item => item.id.toString()}
        />
      </Card.Content>
      <Divider />
      <Card.Actions style={{ justifyContent: "space-around" }}>
        <IconButton icon="thumb-up-outline" color={colors.text} size={18} />
        <IconButton icon="message-outline" color={colors.text} size={18} />
        <IconButton icon="share-variant" color={colors.text} size={18} />
      </Card.Actions>
    </Card>
  );
});
