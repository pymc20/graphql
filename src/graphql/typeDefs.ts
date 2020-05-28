import { gql } from "oakGql";
import Json from "../func/Json.ts";
import _ from "lodash";
import {
  buildSchema
}  from "https://raw.githubusercontent.com/adelsz/graphql-deno/v15.0.0/mod.ts";

const typesPath = `${Deno.cwd()}/src/graphql/types`;
let typeString = ``;

for(const dir of Deno.readDirSync(typesPath)) {
  const fileName = _.get(dir,"name","");
  const filePath = `${typesPath}/${fileName}`
  const json = Json.readJsonSync(filePath);
  typeString += Json.makeGrapQLTypeString(json);
}

export const typeDefs = gql(typeString);