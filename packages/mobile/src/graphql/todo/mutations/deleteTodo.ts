import { gql } from "apollo-boost";

export const deleteTodoMutation = gql`
  mutation deleteTodo($ids: [String!]!) {
    deleteTodo(ids: $ids) {
      id
      title
      completed
      createdAt
      updatedAt
    }
  }
`;
