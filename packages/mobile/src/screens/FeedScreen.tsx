import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Appbar, FAB, Portal, useTheme } from "react-native-paper";
import { PostCard } from "../components/PostCard";
import { RootStoreContext } from "../stores/RootStore";

export const FeedScreen = observer(props => {
  const { viewStore } = useContext(RootStoreContext);
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Feed" />
      </Appbar.Header>
      <FlatList
        data={[1, 2, 3]}
        renderItem={item => <PostCard />}
        keyExtractor={item => item.toString()}
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
