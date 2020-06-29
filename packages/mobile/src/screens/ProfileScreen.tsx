import React from "react";
import { FlatList, View } from "react-native";
import { Appbar, Avatar, Button, Text, Title } from "react-native-paper";
import { PostCard } from "../components/PostCard";
import { StatusBanner } from "../components/StatusBanner";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useUserQuery
} from "../graphql/types";

export const ProfileScreen = props => {
  const { photoUrl, displayName, id } = props.route.params;
  const { loading, error, data } = useUserQuery({ variables: { id } });
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

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
          {data.user.isFollowing ? (
            <Button onPress={() => unfollowUser({ variables: { id } })}>
              Unfollow
            </Button>
          ) : (
            <Button onPress={() => followUser({ variables: { id } })}>
              Follow
            </Button>
          )}
          <FlatList
            data={data.user.posts}
            renderItem={({ item }) => (
              <PostCard
                post={{ ...item, author: { displayName, photoUrl, id } }}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </>
      )}
    </>
  );
};
