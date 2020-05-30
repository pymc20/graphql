import { db } from "../../mongo.ts";
import Json from "../../func/Json.ts";
import _ from "lodash";
import { validateJwt } from "djwt";

const UserType = Json.readJsonSync("src/graphql/types/user.json");
const typeId = _.get(UserType,"typeId","");
const UserCollection = db.collection(typeId);

export const getHash = async (parent: any, id: any, context: any, info: any) => {
    const test = await UserCollection.findOne(id);
    const hash = _.get(test,"hash","");
    const salt = _.get(test,"salt","");
    return {hash,salt};
}

export const signIn = async (parent: any, {data}: any, context: any, info: any) => {
  const jwt = _.get(data,"token","");
  const key = "secret"
  const valid = await validateJwt(jwt, key, { isThrowing: false })
  console.log('valid : ',valid);
  if(valid)
    return {done:true}
  else
    return {done:false}
}

export const signOut = (parent: any, id: any, context: any, info: any) => {

}

export const signUp = async (parent: any, {data}: any, context: any, info: any) => {
    data['passCnt'] = 0;
    const test = await UserCollection.insertOne(data);
    return {
      done: true,
    };
  }