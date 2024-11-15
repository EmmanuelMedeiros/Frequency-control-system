import User from "./User";

export default class Admin extends User {

    email: string
    password:string

    constructor(name: string, email: string, password: string, uuid?:string) {
        super(name, uuid)
        super.verifyParam("Email", email)
        super.verifyParam("Senha", password)
        this.email = email,
        this.password = password
    }
}