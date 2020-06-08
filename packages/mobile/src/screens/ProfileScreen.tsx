import React from "react";
import { FlatList, View } from "react-native";
import { Appbar, Avatar, Button, Text, Title } from "react-native-paper";
import { PostCard } from "../components/PostCard";
import { StatusBanner } from "../components/StatusBanner";
import { useUserQuery } from "../graphql/types";

export const ProfileScreen = props => {
  const { photoUrl, displayName, uid } = props.route.params;
  const { loading, error, data } = useUserQuery({ variables: { id: uid } });

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      {loading || error ? (
        <StatusBanner loading={loading} error={error} />
      ) : (
        <>
          <View>
            <Avatar.Image size={64} source={{ uri: photoUrl }} />
            <Title>{displayName}</Title>
          </View>
          <Text>{data.user.followerCount} followers</Text>
          <Text>{data.user.followingCount} following</Text>
          <Button>Follow</Button>
          <FlatList
            data={data.user.posts}
            renderItem={({ item }) => (
              <PostCard
                post={{ ...item, author: { displayName, photoUrl, uid } }}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </>
      )}
    </>
  );
};
