import { getUser, setUser, signIn, signOut } from './resolvers/UserFunc.ts';

export const resolvers = {
    Query: {
      getUser,
      signIn,
      signOut
    },
    Mutation: {
      setUser,
    },
  };