import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, TextInput } from "react-native";
import DraggableFlatlist from "react-native-draggable-flatlist";
import { Appbar, Button, Divider } from "react-native-paper";
import { TodoPostItem } from "../components/TodoPostItem";
import {
  FeedDocument,
  FeedQuery,
  useCreatePostMutation
} from "../graphql/types";
import { Todo } from "../models/Todo";
import { RootStoreContext } from "../stores/RootStore";

export const NewPostModal = observer(({ navigation }) => {
  const { todoStore } = useContext(RootStoreContext);
  const [createPost] = useCreatePostMutation({
    update: (cache, { data: { createPost } }) => {
      const { feed }: FeedQuery = cache.readQuery({ query: FeedDocument });
      cache.writeQuery({
        query: FeedDocument,
        data: {
          feed: [createPost].concat(feed)
        }
      });
    }
  });
  const [value, setValue] = useState("");

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="New Post" />
        <Appbar.Action
          icon="check"
          onPress={() => {
            createPost({
              variables: {
                input: {
                  content: value,
                  todos: todoStore.selectedTodos.map(
                    ({ title, completed }) => ({
                      title,
                      completed
                    })
                  )
                }
              }
            });
            navigation.goBack();
          }}
        />
      </Appbar.Header>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <TextInput
          // autoFocus
          value={value}
          onChangeText={setValue}
          multiline
          style={styles.input}
          placeholder="What's going on?"
        />
        <DraggableFlatlist<Todo>
          data={todoStore.selectedTodos.slice()}
          renderItem={({ item, drag }) => (
            <TodoPostItem todo={item} drag={drag} />
          )}
          ItemSeparatorComponent={Divider}
          keyExtractor={item => item.id.toString()}
        />
        <Button onPress={() => navigation.navigate("SelectTodoModal")}>
          Add Todos
        </Button>
      </KeyboardAvoidingView>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16
  },
  input: {
    textAlignVertical: "top",
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 16
  }
});
