import { gql } from "apollo-boost";

export const todosQuery = gql`
  query Todos {
    todos {
      id
      title
      completed
      createdAt
      updatedAt
    }
  }
`;
