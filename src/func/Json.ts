import _ from "lodash";

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
    makeGrapQLTypeString(json:any):string {
        let result = "";
        const typeId = _.get(json,"typeId","");
        if(typeId) {
            const types = _.get(json,"types",[]);
            for(const type of types) {
                const keys = Object.keys(type);
                result += `type ${keys[0]} {\n`;
                result = this.appendObjectValue(type,keys[0],result);
            }
        } else {
            const keys = Object.keys(json);
            for(const key of keys) {
                result += `type ${key} {\n`;
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
                result += ` ${field}: ${fieldValue}\n`
            } else {
                this.appendObjectValue(fieldValue,field,result);
            }
        }
        return result += `}\n`
    }

}

export default new Json();