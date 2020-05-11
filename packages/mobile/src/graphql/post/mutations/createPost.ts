import { gql } from "apollo-boost";

export const createUserMutation = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      content
      todos {
        title
        completed
      }
      createdAt
    }
  }
`;
