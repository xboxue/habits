import { gql } from "apollo-boost";

export const createUserMutation = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      displayName
      email
      emailVerified
      phoneNumber
      photoUrl
    }
  }
`;
