export const typeDefs = `
type User {
    id: String
    hash: String
    salt: String
    attempts: Int
    token: String
}
ResolveType {
    done: Boolean
}

input SignIn {
    id: String
    token: String
}
input SignUp {
    id: String
    hash: String
    salt: String
}
type Query {
    getHash(id: String): User
    signIn(data:SignIn): ResolveType!
    signOut(id: String): ResolveType!
},
type Mutation {
    signUp(data: SignUp!): ResolveType!
}
`