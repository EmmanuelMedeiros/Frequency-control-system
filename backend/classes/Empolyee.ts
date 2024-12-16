import User from "./User";

export default class Employee extends User{

    private _weeklyWorkload: string

    constructor(name: string, weeklyWorkLoad: string, uuid?: string) {
        super(name, uuid);
        super.verifyParam("Nome", name)
        super.verifyParam("Horário semanal", weeklyWorkLoad)
        this._weeklyWorkload = weeklyWorkLoad;
    }

    get name(): string {
        return super.name;
    }

    get uuid(): string|undefined {
        return super.uuid;
    }

    get weeklyWorkLoad(): string {
        return this._weeklyWorkload;
    }

    toString() {
        return("opa")
    }
}