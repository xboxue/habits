import React, { useState } from "react";
import { FlatList, StyleSheet, TextInput } from "react-native";
import { Appbar, Avatar, Divider, List } from "react-native-paper";
import { StatusBanner } from "../components/StatusBanner";
import { useUsersLazyQuery } from "../graphql/types";

export const SearchUsersModal = props => {
  const [value, setValue] = useState("");
  const [getUsers, { loading, error, data }] = useUsersLazyQuery();

  const handleChange = (text: string) => {
    setValue(text);
    if (text)
      getUsers({
        variables: { name: text }
      });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <TextInput
          style={styles.input}
          placeholder="Search Tortoise"
          placeholderTextColor="rgba(255,255,255,0.5)"
          value={value}
          onChangeText={handleChange}
        />
      </Appbar.Header>
      {loading || error ? (
        <StatusBanner loading={loading} error={error} />
      ) : (
        !!value &&
        data && (
          <FlatList
            data={data.users}
            renderItem={({ item }) => (
              <List.Item
                title={item.displayName}
                left={() => (
                  <List.Icon
                    icon={() => (
                      <Avatar.Image size={40} source={{ uri: item.photoUrl }} />
                    )}
                  />
                )}
              />
            )}
            keyExtractor={item => item.uid}
            ItemSeparatorComponent={Divider}
          />
        )
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.8)",
    marginLeft: 12,
    marginRight: 12
  }
});
