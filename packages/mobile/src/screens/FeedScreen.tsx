import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  FAB,
  Portal,
  useTheme
} from "react-native-paper";
import { PostCard } from "../components/PostCard";
import { useFeedQuery } from "../graphql/types";

export const FeedScreen = observer(props => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const { loading, error, data } = useFeedQuery();

  if (loading) return <ActivityIndicator />;
  if (error) return <ActivityIndicator />;

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Feed" />
      </Appbar.Header>
      <FlatList
        data={data.feed}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={item => item.id.toString()}
      />
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
