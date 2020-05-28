import { getUser, setUser } from './resolvers/UserFunc.ts';

export const resolvers = {
    Query: {
      getUser,
    },
    Mutation: {
      setUser,
    },
  };