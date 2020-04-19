import { observer } from "mobx-react";
import React, { useContext } from "react";
import { FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import { PostCard } from "../components/PostCard";
import { RootStoreContext } from "../stores/RootStore";

export const FeedScreen = observer(() => {
  const { todoStore } = useContext(RootStoreContext);

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
    </>
  );
});
