import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Appbar, FAB, Portal, useTheme } from "react-native-paper";
import { PostCard } from "../components/PostCard";
import { StatusBanner } from "../components/StatusBanner";
import { useFeedQuery } from "../graphql/types";

export const FeedScreen = observer(props => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const { loading, error, data } = useFeedQuery();

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Feed" />
        <Appbar.Action
          icon="account-multiple"
          onPress={() => props.navigation.navigate("SearchUsersModal")}
        />
      </Appbar.Header>
      {loading || error ? (
        <StatusBanner loading={loading} error={error} />
      ) : (
        <FlatList
          data={data.feed}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={item => item.id.toString()}
        />
      )}
      <Portal>
        <FAB
          visible={isFocused}
          style={[styles.fab, { backgroundColor: colors.text }]}
          onPress={() => props.navigation.navigate("NewPostModal")}
          icon="pencil"
        />
      </Portal>
    </>
  );
});

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 50
  }
});
