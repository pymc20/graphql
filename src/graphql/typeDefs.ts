import { gql } from "https://deno.land/x/oak_graphql/mod.ts";

export const typeDefs = gql`
type User {
  id: String
  pass: String
  name: String
}

input UserInput {
  id: String
  pass: String
  name: String
}

type ResolveType {
  done: Boolean
}

type Query {
  getUser(id: String): User
}

type Mutation {
  setUser(input: UserInput!): ResolveType!
}
`;