import User from "./User";

import crypto from 'crypto'

export default class Admin extends User {

    private _email: string
    private _password:string

    constructor(name: string, email: string, password: string, uuid?:string) {
        super(name, uuid);
        super.verifyParam("Nome", name);
        super.verifyParam("Email", email);
        super.verifyParam("Senha", password);
        this._email = email.toLocaleLowerCase();
        this._password = password.trim()

        super.uuid
    };

    get name(): string {
        return (super.name)
    }

    get email(): string {
        return this._email
    }

    get password(): string {
        return this._password
    }

    toString() {
        return `Usuário administrador; email: ${this._email}; senha: ${this._password}; uuid${this.uuid}`
    }

}