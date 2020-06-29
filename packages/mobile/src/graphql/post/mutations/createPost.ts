import { gql } from "apollo-boost";

export const createUserMutation = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      content
      author {
        id
        displayName
        photoUrl
      }
      todos {
        id
        title
        completed
      }
      createdAt
    }
  }
`;
