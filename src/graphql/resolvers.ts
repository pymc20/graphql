import store from "./store.ts"

export const resolvers = {
    Query: {
      getUser: (parent: any, {id}: any, context: any, info: any) => {
        return store.getUser(id);
      },
    },
    Mutation: {
      setUser: (parent: any, {input}: any, context: any, info: any) => {
        store.setUser(input);
        return {
          done: true,
        };
      },
    },
  };