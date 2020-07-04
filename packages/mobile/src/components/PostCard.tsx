import { formatDistanceToNowStrict, parseISO } from "date-fns";
import React from "react";
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
import { FeedPostTodoItem } from "./FeedPostTodoItem";

interface Props {
  post: FeedQuery["feed"][0];
  onPress: () => void;
  showAllTodos?: boolean;
}

export const PostCard = ({ post, onPress, showAllTodos = false }: Props) => {
  const { colors } = useTheme();

  return (
    <Card style={{ elevation: 0, marginBottom: 10 }}>
      <Card.Title
        title={post.author.displayName}
        subtitle={`${formatDistanceToNowStrict(parseISO(post.createdAt))} ago`}
        left={props => (
          <Avatar.Image size={40} source={{ uri: post.author.photoUrl }} />
        )}
      />
      <Card.Content>
        <Paragraph>{post.content}</Paragraph>
        <FlatList
          data={showAllTodos ? post.todos : post.todos.slice(0, 3)}
          renderItem={({ item }) => <FeedPostTodoItem todo={item} />}
          ListFooterComponent={() => (
            <>
              {!showAllTodos && post.todos.length > 3 && (
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
        <IconButton
          onPress={onPress}
          icon="message-outline"
          color={colors.text}
          size={18}
        />
        <IconButton icon="share-variant" color={colors.text} size={18} />
      </Card.Actions>
    </Card>
  );
};
