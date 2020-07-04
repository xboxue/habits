import { gql } from "apollo-boost";

export const commentsQuery = gql`
  query Comments($postId: ID!) {
    comments(postId: $postId) {
      id
      content
      author {
        id
        displayName
        photoUrl
      }
      createdAt
    }
  }
`;
