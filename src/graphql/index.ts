import { NextRequest, NextResponse } from 'next/server';
import { createSchema, createYoga } from 'graphql-yoga';
import type { IResolvers } from '@graphql-tools/utils';
import schemaTypeDef from './schema.graphql';

const resolvers: IResolvers = {
  Query: {
    test: () => {
      return { foo: 'Hello World!' };
    }
  }
}

export default createYoga({
  graphqlEndpoint: '/api/graphql',
  schema: createSchema({
    typeDefs: schemaTypeDef,
    resolvers: resolvers,
  }),
  logging: 'debug',
  // Yoga needs to know how to create a valid Next response
  fetchAPI: {
    Request: NextRequest,
    Response: NextResponse,
  },
});
