import { gql } from "apollo-boost";

export const unfollowUserMutation = gql`
  mutation UnfollowUser($id: String!) {
    unfollowUser(id: $id) {
      id
      followerCount
      isFollowing
    }
  }
`;
