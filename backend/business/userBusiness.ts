import Admin from "../classes/Admin";
import User from "../classes/User";

import EndMessage from "../interface/EndMessage";

import UserRepository from "../repository/userRepository";

const bcrypt = require('bcrypt')
import crypto from 'crypto'

const jwt = require("jsonwebtoken")

import moment from 'moment'

require('dotenv').config()

export default class UserBusiness {

    static async registerFirstAdmin(admin: Admin) {

        const createdAt: string = moment().format('YYYY/MM/DD')

        const hash = await UserBusiness.generatingHash(admin.password.trim())
        const userUUID: string = crypto.randomUUID()

        const adminWithEncryptedPassword: Admin = new Admin(
            admin.name,
            admin.email,
            hash,
            userUUID
        )
        
        const dbResponse: EndMessage = await UserRepository.registerFirstAdmin(adminWithEncryptedPassword, createdAt)
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

            const token = jwt.sign(dbResponse.response, process.env.JWT_SECRET, {expiresIn: '12h'})
            endMessage = {response: [{jwt: token}, {user: dbResponse.response}], status: 200}
            return endMessage

        }catch(err: any) {
            endMessage = {response: err.toString(), status: 400}
            return endMessage
        }

    }

    static async registerNewUser(user: User) {

        const createdAt: string = moment().format('YYYY/MM/DD')

        let endMessage: EndMessage
        const newUser: User = user

        if(user.name.length < 4) {
            endMessage = {response: "O nome do usuário deve conter mais de 4 caracteres", status: 400}
            return endMessage
        }

        const nameExists: boolean = await UserBusiness.checkIfUserNameExists(user.name)
        if(nameExists) {
            endMessage = {response: "Esse nome já está cadastrado", status: 400}
            return endMessage
        }

        const userUUID: string = crypto.randomUUID()
        newUser.setUUID(userUUID)

        const dbResponse: EndMessage = await UserRepository.registerUser(newUser, createdAt)
        return dbResponse

    }

    static async getUserByUUID(uuid: string) {

        let endMessage: EndMessage

        if(!uuid) {
            endMessage = {response: "UUID não pode ser vazio", status: 400}
        }
        
        const dbResponse: EndMessage = await UserRepository.getUserByUUID(uuid)
        return dbResponse

    }

    static async getListOfUsers() {
        
        const dbResponse: EndMessage = await UserRepository.getListOfUsers()
        return dbResponse

    }

    static async checkIfUserNameExists(nameToCheck: string) {

        let nameAlreadyExists: boolean = false 
        const listOfUsers: Array<User> = (await UserBusiness.getListOfUsers()).response

        listOfUsers.forEach((element) => {
            if(element.name == nameToCheck) {
                nameAlreadyExists = true
            }
        })

        return nameAlreadyExists
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