import { gql } from "apollo-boost";

export const createCommentMutation = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
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
