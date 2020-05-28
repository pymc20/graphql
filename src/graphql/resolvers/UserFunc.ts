import { db } from "../../mongo.ts"
import Json from "../../func/Json.ts";
import _ from "lodash";

const UserType = Json.readJsonSync("src/graphql/types/user.json");
const typeId = _.get(UserType,"typeId","");
const UserCollection = db.collection(typeId);

export const getUser = async (parent: any, id: any, context: any, info: any) => {
    const test = await UserCollection.findOne(id);
    return test;
}

export const setUser = async (parent: any, {input}: any, context: any, info: any) => {
    const test = await UserCollection.insertOne(input);
    return {
      done: true,
    };
  }