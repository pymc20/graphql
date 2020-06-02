import { assertThrows } from "https://deno.land/std/testing/asserts.ts";
import { parse } from "https://deno.land/x/oak_graphql/deps.ts"
import Json from "./Json.ts";

const json = new Json();

Deno.test("readYamlSync Test", () => {
    const path = Deno.cwd() + "/src/graphql/types/types.yaml";
    assertThrows(json.readYamlSync(path));
});

Deno.test("validType Test",async () => {
    const path = Deno.cwd() + "/src/graphql/types/types.yaml";
    const typeDefs = json.readYamlSync(path);
    parse(typeDefs,{});
})