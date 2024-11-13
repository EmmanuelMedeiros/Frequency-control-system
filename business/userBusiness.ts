import Admin from "../classes/Admin";

import EndMessage from "../interface/EndMessage";

import UserRepository from "../repository/userRepository";

const bcrypt = require('bcrypt')
import crypto from 'crypto'

const jwt = require("jsonwebtoken")

require('dotenv').config()

export default class UserBusiness {

    static async registerFirstAdmin(admin: Admin) {

        const hash = await UserBusiness.generatingHash(admin.password.trim())
        const userUUID: string = crypto.randomUUID()

        const adminWithEncryptedPassword: Admin = new Admin(
            admin.name,
            admin.email,
            hash,
            userUUID
        )
        
        const dbResponse: EndMessage = await UserRepository.registerFirstAdmin(adminWithEncryptedPassword)
        return dbResponse
    }

    static async authenticateAdmin(userToAuth: {email: string, password: string}) {

        let endMessage: EndMessage

        try {

            if(typeof userToAuth.email !== "string") {
                endMessage = {response: "O campo de email precisa ser do tipo 'string'", status: 400}
                return endMessage
            }
            else if(!userToAuth.email.trim()) {
                endMessage = {response: "O campo de email precisa ser preenchido", status: 400}
                return endMessage
            } 

            if(typeof userToAuth.password !== "string") {
                endMessage = {response: "O campo de senha precisa ser do tipo 'string'", status: 400}
                return endMessage
            }
            else if(!userToAuth.password.trim()) {
                endMessage = {response: "O campo de senha precisa ser preenchido", status: 400}
                return endMessage
            } 

            const dbResponse: EndMessage = await UserRepository.authenticateAdmin(userToAuth)

            if(dbResponse.status != 200) {
                return dbResponse
            }

            const token = jwt.sign(dbResponse.response, process.env.JWT_SECRET)
            endMessage = {response: [{jwt: token}, {user: dbResponse.response}], status: 200}
            return endMessage

        }catch(err: any) {
            endMessage = {response: err.toString(), status: 400}
            return endMessage
        }

    }

    static async generatingHash(elementToHash: string) {

        const saltRounds: number = 3
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(elementToHash, salt)

        return hash
    }

    static async validatingHashPassword(password:string, hash: string) {

        const validPassword: boolean = await bcrypt.compare(password, hash)
        return validPassword

    }

}