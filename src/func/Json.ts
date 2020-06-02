import _ from "lodash";
import { parse } from "yaml";

const graphQLType = ["query","mutation","type","input","enum","interfaces","union"]

class Json {
    readJsonSync(path:string):any {
        const decoder = new TextDecoder("utf-8");
        const content = decoder.decode(Deno.readFileSync(path));
        try {
            return JSON.parse(content);
        } catch (err) {
            err.message = `${path}: ${err.message}`;
            throw err;
        }
    }

    readYamlSync(path:string):any {
        const decoder = new TextDecoder("utf-8");
        const yaml = decoder.decode(Deno.readFileSync(path));
        const parseYaml:any = parse(yaml);
        let result = "";
        for(const key of Object.keys(parseYaml)) {
            const types = _.get(parseYaml,key,{});
            const typeNames = Object.keys(types);
            for(const typeName of typeNames) {
                const customTypeNames = _.get(types,typeName,{});
                const customTypeNameKeys = Object.keys(customTypeNames);
                for(const customTypeName of customTypeNameKeys) {
                    result += `${typeName} ${customTypeName}{ `;
                    const properties = _.get(customTypeNames,customTypeName,{});
                    const propertyKeys = Object.keys(properties);
                    if(typeof properties === 'object') {
                        for(const propertyName of propertyKeys) {
                            const propertyValue = _.get(properties,propertyName,{});
                            result += `${propertyName}:${propertyValue} `;
                        }
                    } else if(typeof properties === 'string') {
                        result += `${properties}`;
                    }
                    result += `}`
                }
            }
        }
        return result;
    }

    makeGrapQLTypeString(json:any):string {
        let result = "";
        const typeId = _.get(json,"typeId","");
        if(typeId) {
            const types = _.get(json,"types",[]);
            for(const type of types) {
                const keys = Object.keys(type);
                result += `type ${keys[0]}{`;
                result = this.appendObjectValue(type,keys[0],result);
            }
            const inputs = _.get(json,"inputs",[]);
            for(const input of inputs) {
                const keys = Object.keys(input);
                result += `input ${keys[0]}{`;
                result = this.appendObjectValue(input,keys[0],result);
            }
        } else {
            const keys = Object.keys(json);
            for(const key of keys) {
                result += `type ${key}{`;
                result = this.appendObjectValue(json,key,result);
            }
        }
        return result;
    }

    appendObjectValue(json:any,key:string,result:string) {
        const fields = _.get(json,key,{});
        const fieldsKey = Object.keys(fields);
        for(const field of fieldsKey) {
            const fieldValue = _.get(fields,field,"");
            if(typeof fieldValue == 'string') {
                result += ` ${field}:${fieldValue}`
            } else {
                this.appendObjectValue(fieldValue,field,result);
            }
        }
        return result += `}`
    }

}

export default Json;