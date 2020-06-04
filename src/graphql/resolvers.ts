import { getHash, signUp, signIn, signOut, updateUser, deleteUser } from './resolvers/UserFunc.ts';

export const resolvers = {
  Query: {
    getHash,
    signIn,
    signOut
  },
  Mutation: {
    signUp,
    updateUser,
    deleteUser
  },
};