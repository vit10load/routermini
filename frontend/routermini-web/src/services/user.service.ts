import { apolloClient } from '../apollo/client';
import { REGISTER_USER_MUTATION } from '../graphql/mutations/registerUser';

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  const { data } = await apolloClient.mutate({
    mutation: REGISTER_USER_MUTATION,
    variables: { input },
  });

  return data;
}