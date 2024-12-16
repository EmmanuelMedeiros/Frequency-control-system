export default class User {

    private _name: string
    private _uuid?: string
    
    constructor(name: string, uuid?: string)  {
        this.verifyParam("Nome", name);
        this._name = name.trim();
        this._uuid = uuid
    };

    verifyParam(param:string, value:string|number) {
        if(!value) {
            throw new Error(`O parâmetro ''${param}'' não pode estar vazio`)
        } else if(typeof value == "string" && value.trim() == "") {
            throw new Error(`O parâmetro ${param} não pode estar vazio`)
        }
    };

    set name(name: string) {
        this.verifyParam("Nome", name);
        this._name = name;
    }

    get name() {
        return this._name || "This user was registered with no name";
    }

    get uuid() {
        return this._uuid
    }


    toString() {
        return `Nome: ${this._name};`
    }

}