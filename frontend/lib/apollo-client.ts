import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://slooze-backend-z2iq.onrender.com/graphql',
  }),
  cache: new InMemoryCache(),
});