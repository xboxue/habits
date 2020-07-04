import { useTheme } from "@react-navigation/native";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import React, { useState } from "react";
import { FlatList, KeyboardAvoidingView, StyleSheet } from "react-native";
import {
  Appbar,
  Avatar,
  Divider,
  FAB,
  List,
  Portal,
  Text
} from "react-native-paper";
import { AddCommentInput } from "../components/AddCommentInput";
import { PostCard } from "../components/PostCard";
import { StatusBanner } from "../components/StatusBanner";
import {
  CommentsDocument,
  CommentsQuery,
  useCommentsQuery,
  useCreateCommentMutation
} from "../graphql/types";
import { useKeyboard } from "../hooks/useKeyboard";

export const PostModal = props => {
  const [showInput, setShowInput] = useState(false);
  const { post } = props.route.params;

  const { loading, error, data } = useCommentsQuery({
    variables: { postId: post.id }
  });

  const [createComment] = useCreateCommentMutation({
    update: (cache, { data: { createComment } }) => {
      const { comments }: CommentsQuery = cache.readQuery({
        query: CommentsDocument,
        variables: { postId: post.id }
      });
      cache.writeQuery({
        query: CommentsDocument,
        data: {
          comments: comments.concat([createComment])
        },
        variables: { postId: post.id }
      });
    }
  });

  useKeyboard({ keyboardDidHide: () => setShowInput(false) });
  const { colors } = useTheme();

  const onSubmit = (value: string) => {
    createComment({
      variables: { input: { postId: post.id, content: value } }
    });
    setShowInput(false);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Post" />
      </Appbar.Header>
      {loading || error ? (
        <StatusBanner loading={loading} error={error} />
      ) : (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
          <FlatList
            data={data.comments}
            renderItem={({ item }) => (
              <List.Item
                title={item.author.displayName}
                description={item.content}
                left={() => (
                  <List.Icon
                    icon={() => (
                      <Avatar.Image
                        size={40}
                        source={{ uri: item.author.photoUrl }}
                      />
                    )}
                  />
                )}
                right={() => (
                  <Text style={styles.dateText}>{`${formatDistanceToNowStrict(
                    parseISO(item.createdAt)
                  )} ago`}</Text>
                )}
              />
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={Divider}
            ListHeaderComponent={() => (
              <>
                <PostCard showAllTodos post={post} onPress={() => {}} />
              </>
            )}
          />
          {showInput && <AddCommentInput onSubmit={onSubmit} />}
        </KeyboardAvoidingView>
      )}
      <Portal>
        <FAB
          visible={!showInput}
          style={[styles.fab, { backgroundColor: colors.text }]}
          onPress={() => setShowInput(true)}
          icon="pencil"
        />
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  },
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  dateText: {
    fontSize: 12,
    marginTop: 8,
    marginRight: 8
  }
});
