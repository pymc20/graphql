import { db } from "../../mongo.ts";

const UserCollection = db.collection("User");

export const getHash = async (parent: any, id: any, context: any, info: any) => {
  const user = await UserCollection.findOne(id);
  const test = await UserCollection.updateOne({id},{$inc:{attempts:1}});
  const { hash, salt } = user;
  return {
    hash,
    salt
  };
}

export const signIn = async (parent: any, id: any, context: any, info: any) => {
  await UserCollection.updateOne({id},{$set:{attempts:0}});
  return {
    done:true
  }
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
    const { id } = data;
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