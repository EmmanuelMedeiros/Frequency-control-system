import User from './User';

export default class Admin extends User {

    private _email:string
    private _password:string

    constructor(email: string, password: string, name: string, uuid?: string) {
        super(name, uuid)
        super.verifyParam("Email", email);
        super.verifyParam("Senha", password);
        this._email = email.toLocaleLowerCase();
        this._password = password.trim()
    };

    get email(): string {
        return this._email
    }

    get password(): string {
        return this._password
    }

    toString() {
        return `Usuário administrador; email: ${this._email}; senha: ${this._password}`
    }

}