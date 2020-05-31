import { gql } from "apollo-boost";

export const usersQuery = gql`
  query Users($name: String!) {
    users(name: $name) {
      uid
      displayName
      photoUrl
    }
  }
`;
