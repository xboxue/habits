import { gql } from "apollo-boost";

export const deleteTodoMutation = gql`
  mutation DeleteTodo($ids: [String!]!) {
    deleteTodo(ids: $ids) {
      id
      title
      completed
      createdAt
      updatedAt
    }
  }
`;
