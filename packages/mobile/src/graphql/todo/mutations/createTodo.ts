import { gql } from "apollo-boost";

export const createTodoMutation = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      title
      completed
      createdAt
      updatedAt
    }
  }
`;
