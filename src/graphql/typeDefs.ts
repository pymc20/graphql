export const typeDefs = `
type User {
    id: String
    hash: String
    salt: String
    attempts: Int
}
type ResolveType {
    done: Boolean
}
input SignUp {
    id: String
    hash: String
    salt: String
}
type Query {
    getHash(id: String): User
    signIn(id: String): ResolveType!
    signOut(id: String): ResolveType!
},
type Mutation {
    signUp(data: SignUp!): ResolveType!
    updateUser(data: SignUp): ResolveType!
    deleteUser(id: String): ResolveType!
}
`