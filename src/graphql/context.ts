import type { NextRequest } from 'next/server';
import type { YogaInitialContext } from 'graphql-yoga';

import { testLoader } from './dataloaders';

export interface ServerContext {
  request: NextRequest;
  [key: string]: unknown;
}

export const createContext = () => {
  return {
    testLoader,
  };
};

export type UserContext = Awaited<ReturnType<typeof createContext>>;
export type YogaContext = YogaInitialContext & ServerContext & UserContext; // for resolvers
