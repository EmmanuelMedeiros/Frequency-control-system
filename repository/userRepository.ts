import UserBusiness from "../business/userBusiness";
import Admin from "../classes/Admin";
import User from "../classes/User";
import client from "../db/databasePg";

import EndMessage from "../interface/EndMessage";

export default class UserRepository {

    static async registerFirstAdmin(admin: Admin) {

        let dbResponse: EndMessage

        try {
            await client.query('BEGIN')
            const queryText = 'INSERT INTO users(uuid, name, password, email, role) VALUES($1, $2, $3, $4, $5) returning uuid, name'
            const response = await client.query(queryText, [admin.uuid, admin.name, admin.password, admin.email, 'ADMIN'])
            await client.query('COMMIT')
            return dbResponse = {response: response.rows, status: 201}
        }catch(err: any) {
            await client.query('ROLLBACK')
            dbResponse = {response: err.toString(), status: 400}
            return dbResponse
        }

    }

    static async authenticateAdmin(userToAuthenticate: {email: string, password: string}) {

        let dbResponse: EndMessage

        try {

            const queryText: string = ` 
                                        select
                                            uuid,
                                            name,
                                            password
                                        from
                                        	users u
                                        where
                                        	u.email = $1
                                     `

            const response = await client.query(queryText, [userToAuthenticate.email])

            if(response.rows.length == 0) {
                return dbResponse = {response: "Nenhum usuário encontrado com essas credênciais", status: 400}
            }

            const encryptedDBPassword: string = response.rows[0].password
            const hashComparison: boolean = await UserBusiness.validatingHashPassword(userToAuthenticate.password, encryptedDBPassword)

            if(!hashComparison) {
                return dbResponse = {response: "Nenhum usuário encontrado com essas credênciais", status: 400}
            }

            const rowsToShow = {
                name: response.rows[0].name,
                id: response.rows[0].uuid
            }

            return dbResponse = {response: rowsToShow, status: 200}

        }catch(err: any) {
            dbResponse = {response: err.toString(), status: 400}
            return dbResponse
        }

    }

    static async registerUser(user: User) {

        let dbResponse: EndMessage

        try {
            await client.query(`BEGIN`)
            const queryString: string = `insert into users(uuid, name, role) values($1, $2, 'USER') returning name`
            const response = await client.query(queryString, [user.uuid, user.name])
            await client.query('COMMIT')
            return dbResponse = {response: `Usuário ${response.rows[0].name} criado com sucesso!`, status: 201}
        }catch(err:any) {
            dbResponse = {response: err.toString(), status: 400}
            return dbResponse
        }

    }

}