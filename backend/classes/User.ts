import { verify } from "crypto"

export default class User {

    name: string
    uuid?: string
    
    constructor(name: string, uuid?:string) {
        this.verifyParam("Nome", name)
        this.name = name.trim()
        this.uuid = uuid
    }

    verifyParam(param:string, value:string|number) {
        if(!value) {
            throw new Error(`O parâmetro ''${param}'' não pode estar vazio`)
        } else if(typeof value == "string" && value.trim() == "") {
            throw new Error(`O parâmetro ${param} não pode estar vazio`)
        }
    }

    setUUID(uuid:string) {
        this.uuid = uuid
    }

}