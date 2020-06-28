import { gql } from "apollo-boost";

export const followUserMutation = gql`
  mutation FollowUser($id: String!) {
    followUser(id: $id) {
      uid
      followerCount
      isFollowing
    }
  }
`;
