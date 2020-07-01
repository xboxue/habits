import { formatDistanceToNowStrict } from "date-fns";
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
import { FeedQuery } from "../graphql/types";
import { RootStoreContext } from "../stores/RootStore";
import { FeedPostTodoItem } from "./FeedPostTodoItem";

interface Props {
  post: FeedQuery["feed"][0];
}

export const PostCard = observer(({ post }: Props) => {
  const { todoStore } = useContext(RootStoreContext);
  const { colors } = useTheme();

  return (
    <Card style={{ elevation: 0, marginBottom: 10 }}>
      <Card.Title
        title={post.author.displayName}
        subtitle={`${formatDistanceToNowStrict(new Date(post.createdAt))} ago`}
        left={props => (
          <Avatar.Image size={40} source={{ uri: post.author.photoUrl }} />
        )}
      />
      <Card.Content>
        <Paragraph>{post.content}</Paragraph>
        <FlatList
          data={post.todos.slice(0, 3)}
          renderItem={({ item }) => <FeedPostTodoItem todo={item} />}
          ListFooterComponent={() => (
            <>
              {post.todos.length > 3 && (
                <>
                  <Divider />
                  <List.Subheader>+{post.todos.length - 3} more</List.Subheader>
                </>
              )}
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
