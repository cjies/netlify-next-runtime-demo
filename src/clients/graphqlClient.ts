import { cacheExchange, createClient, fetchExchange } from '@urql/core';
import { registerUrql } from '@urql/next/rsc';

// XXX: use NEXTAUTH_URL because this env var is always available
const INTERNAL_API_URL = `${process.env.NEXTAUTH_URL ?? ''}/api/graphql`;

const makeGraphqlClient = () => {
  return createClient({
    url: INTERNAL_API_URL,
    exchanges: [cacheExchange, fetchExchange],
    // ignore any cached results and send an API request
    requestPolicy: 'network-only',
  });
};

export const getGraphqlClient = registerUrql(makeGraphqlClient).getClient;
