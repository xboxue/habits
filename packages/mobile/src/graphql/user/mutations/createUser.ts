import { gql } from "apollo-boost";

export const createUserMutation = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      uid
      displayName
      email
      emailVerified
      phoneNumber
      photoUrl
    }
  }
`;
