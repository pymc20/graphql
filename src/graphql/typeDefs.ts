import { gql } from "oakGql";
import Json from "../func/Json.ts";
import _ from "lodash";
import {
  buildSchema
}  from "https://raw.githubusercontent.com/adelsz/graphql-deno/v15.0.0/mod.ts";

const typesPath = `${Deno.cwd()}/src/graphql/types`;
let typeString = "";

for(const dir of Deno.readDirSync(typesPath)) {
  const fileName = _.get(dir,"name","");
  const filePath = `${typesPath}/${fileName}`
  const json = Json.readJsonSync(filePath);
  typeString = Json.makeGrapQLTypeString(json);
  console.log(typeString);
  buildSchema(typeString,{})
  console.log(typeString == `
  type User {
    id: String
    pass: String
    name: String
    userInfo: UserInfo
  }
  type UserInfo {
    phone: String
  }
  input InputUserInfo {
    phone: String
  }
  input UserInput {
    id: String
    pass: String
    name: String
    userInfo: InputUserInfo
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
  `)
}

export const typeDefs = gql(`
type User {
  id: String
  pass: String
  name: String
  userInfo: UserInfo
}
type UserInfo {
  phone: String
}
input InputUserInfo {
  phone: String
}
input UserInput {
  id: String
  pass: String
  name: String
  userInfo: InputUserInfo
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
`);