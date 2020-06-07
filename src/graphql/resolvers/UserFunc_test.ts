import { assertEquals, assert } from "denoTest";
import _ from "lodash";

const createQuery = `
mutation {
  signUp(data: {
    id: "test"
    hash: "1234"
    salt: "abcd"
  }) {
    done
  }
}`;
const readQuery = `
{
  getHash(id: "test") {
    hash
    salt
  }
}`;
const updateQuery = `
mutation {
  updateUser(data: {
    id: "test"
    hash: "4567"
    salt: "efgh"
  }) {
    done
  }
}`;
const deleteQuery = `
mutation {
  deleteUser(id: "test") {
    done
  }
}`;

const createOpts = (query:any):RequestInit => {
  return {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({query})
  };
}

const url = "http://localhost:8000/graphql";
let opts, json, done;

Deno.test("User Create Test", async () => {
  opts = createOpts(createQuery);
  const signUp = await fetch(url, opts);
  json = await signUp.json();
  done = _.get(json,"data.signUp.done","");
  assert(done);
})

Deno.test("User Read Test",async () => {
  opts = createOpts(readQuery);
  const signIn = await fetch(url,opts);
  json = await signIn.json();
  const id = _.get(json,"data.getHash.id","");
  const hash = _.get(json,"data.getHash.hash","");
  const salt = _.get(json,"data.getHash.salt","");
  assertEquals(hash,"1234");
  assertEquals(salt,"abcd");
})

Deno.test("User Update Test",async () => {
  opts = createOpts(updateQuery);
  const update = await fetch(url,opts);
  json = await update.json();
  done = _.get(json,"data.updateUser.done","");
  assert(done);
})

Deno.test("User Delete Test",async () => {
  opts = createOpts(deleteQuery);
  const remove = await fetch(url,opts);
  json = await remove.json();
  done = _.get(json,"data.deleteUser.done","");
  assert(done);
})