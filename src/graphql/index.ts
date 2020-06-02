import { applyGraphQL } from "https://deno.land/x/oak_graphql/mod.ts";
import { parse } from "https://deno.land/x/oak_graphql/deps.ts"
import typeDefs from "./typeDefs.ts"
import { resolvers } from './resolvers.ts';

const context = (ctx:any) => {
    return ctx;
}

export const GraphQLService = applyGraphQL({
    typeDefs,
    resolvers,
    context
});