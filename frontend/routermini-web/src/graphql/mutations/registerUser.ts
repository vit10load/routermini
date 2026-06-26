import { gql } from '@apollo/client/core';

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($input: CreateUserInput!) {
    registerUser(input: $input) {
      id
      name
      email
      createdAt
    }
  }
`;