import { NextRequest, NextResponse } from 'next/server';
import { createSchema, createYoga } from 'graphql-yoga';

import type { IResolvers } from '@graphql-tools/utils';

import { createContext, YogaContext } from './context';
import schemaTypeDef from './schema.graphql';

const resolvers: IResolvers<unknown, YogaContext> = {
  Query: {
    test: async (_, _args, context) => {
      const test = await context.testLoader.load('test');
      return test;
    },
  }
}

export default createYoga({
  graphqlEndpoint: '/api/graphql',
  schema: createSchema({
    typeDefs: schemaTypeDef,
    resolvers: resolvers,
  }),
  context: createContext, 
  logging: 'debug',
  // Yoga needs to know how to create a valid Next response
  fetchAPI: {
    Response: NextResponse,
  },
});
