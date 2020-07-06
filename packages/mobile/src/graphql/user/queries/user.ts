import { gql } from "apollo-boost";

export const userQuery = gql`
  query User($id: String!) {
    user(id: $id) {
      id
      posts {
        id
        content
        todos {
          id
          title
          completed
        }
        createdAt
        likeCount
        commentCount
        isLiked
      }
      followerCount
      followingCount
      isFollowing
    }
  }
`;
