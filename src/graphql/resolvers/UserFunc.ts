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
  return {...test};
}

export const signIn = async (parent: any, {data}: any, context: any, info: any) => {
  const jwt = _.get(data,"token","");
  const key = "secret"
  const valid = await validateJwt(jwt, key, { isThrowing: false })
  console.log('valid : ',valid);
  if(valid)
    return {done:true,context}
  else
    return {done:false}
}

export const signOut = (parent: any, id: any, context: any, info: any) => {

}

export const signUp = async (parent: any, {data}: any, context: any, info: any) => {
  try {
    data['passCnt'] = 0;
    const test = await UserCollection.insertOne(data);
    return {
      done: true
    };
  } catch(err) {
    console.log(err);
    return {
      done: false
    }
  }
}

export const updateUser = async (parent: any, {data}: any, context: any, info: any) => {
  try {
    const id = _.get(data,"id","");
    await UserCollection.updateOne({id},{$set:data});
    return {
      done: true
    }
  } catch(err) {
    console.log(err);
    return {
      done: false
    }
  }
  
}

export const deleteUser = async (parent: any, id: any, context: any, info: any) => {
  try {
    console.log(id);
    await UserCollection.deleteOne(id);
    return {
      done: true
    }
  } catch(err) {
    console.log(err);
    return {
      done: false
    }
  }
}