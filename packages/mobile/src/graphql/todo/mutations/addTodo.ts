import { gql } from "apollo-boost";

export const addTodoMutation = gql`
  mutation AddTodo($input: AddTodoInput!) {
    addTodo(input: $input) {
      id
      title
      completed
      createdAt
      updatedAt
    }
  }
`;
