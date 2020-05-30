import { getHash, signUp, signIn, signOut } from './resolvers/UserFunc.ts';

export const resolvers = {
    Query: {
      getHash,
      signIn,
      signOut
    },
    Mutation: {
      signUp,
    },
  };