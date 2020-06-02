import Json from "../func/Json.ts";
import _ from "lodash";
const json = new Json();
const typesPath = `${Deno.cwd()}/src/graphql/types`;
let typeDefs = ``;

for(const dir of Deno.readDirSync(typesPath)) {
  const fileName = _.get(dir,"name","");
  const filePath = `${typesPath}/${fileName}`
  if(_.endsWith(fileName,'yaml',fileName.length)) {
    typeDefs += json.readYamlSync(filePath);
  } else {
    // const json = Json.readJsonSync(filePath);
    // typeDefs += Json.makeGrapQLTypeString(json);
  }
}

export default typeDefs