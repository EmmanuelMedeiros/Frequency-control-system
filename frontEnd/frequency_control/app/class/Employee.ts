import User from "./User";

export default class Employee extends User{

    private _weeklyWorkload: number

    constructor(weeklyWorkload: number, name: string, uuid?: string) {
        super(name, uuid);
        super.verifyParam("Horário semanal", weeklyWorkload)
        this._weeklyWorkload = weeklyWorkload;
    }

    get name(): string {
        return super.name;
    }

    get weeklyWorkload(): number {
        return this._weeklyWorkload;
    }
}