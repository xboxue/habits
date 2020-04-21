import { observer } from "mobx-react";
import React, { useContext } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Appbar, Divider } from "react-native-paper";
import { TodoSelectItem } from "../components/TodoSelectItem";
import { RootStoreContext } from "../stores/RootStore";

export const SelectTodoModal = observer(({ navigation }) => {
  const { todoStore } = useContext(RootStoreContext);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={`${todoStore.selectedCount} selected`} />
        <Appbar.Action icon="check" onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <FlatList
        data={todoStore.todos.slice()}
        renderItem={({ item }) => <TodoSelectItem todo={item} />}
        ItemSeparatorComponent={Divider}
        keyExtractor={item => item.id.toString()}
      />
    </>
  );
});
