import { gql } from "apollo-boost";

export const userQuery = gql`
  query User($id: String!) {
    user(id: $id) {
      uid
      posts {
        id
        content
        todos {
          id
          title
          completed
        }
        createdAt
      }
      followerCount
      followingCount
    }
  }
`;
