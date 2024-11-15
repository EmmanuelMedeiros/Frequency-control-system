import Frequency from "../classes/Frequency";
import EndMessage from "../interface/EndMessage";

import client from "../db/databasePg";
import FrequencyTime from "../enum/FrequencyTime";

export default class FrequencyRepository {

    static async dailyFrequencies(currentTime:string, frequencyUUID: string) {

        let dbResponse: EndMessage
        let frequencyToSet: number = 0
        let frequencyTime: FrequencyTime = FrequencyTime["BEGGINING OF DAY"]

        try {

            await client.query(`BEGIN`)
            const queryString: string = `select frequency_a, frequency_b, frequency_c, frequency_d from frequency fr where fr.uuid = $1`
            const result = await client.query(queryString, [frequencyUUID])
            await client.query(`COMMIT`)

            if(result.rows[0].frequency_a == null) {
                frequencyToSet = 0
            } else if(result.rows[0].frequency_b == null) {
                frequencyToSet = 1
            } else if(result.rows[0].frequency_c == null) {
                frequencyToSet = 2
            } else if(result.rows[0].frequency_d == null) {
                frequencyToSet = 3
            } else {
                frequencyToSet = 4
            }
            

            switch(frequencyToSet) {
                case 0: {
                    frequencyTime = FrequencyTime["BEGGINING OF DAY"]
                    break;
                }
                case 1: {
                    frequencyTime = FrequencyTime["LUNCH TIME"]
                    break;
                }
                case 2: {
                    frequencyTime = FrequencyTime["BACK FROM LUNCH"]
                    break;
                }
                case 3: {
                    frequencyTime = FrequencyTime["ENDING OF DAY"]
                    break;
                }
            }

            if(frequencyToSet < 4) { 
                await client.query('BEGIN')
                const queryStringB: string = `update frequency set ${frequencyTime} = $1 where uuid = $2`
                const insertion = await client.query(queryStringB, [currentTime, frequencyUUID])
                await client.query('COMMIT')

                dbResponse = {status: 200, response: [{frequencyUUID: frequencyUUID}, {ponto: frequencyToSet + 1 + "° ponto"}]}
                return dbResponse
            } else {
                return dbResponse = {status: 400, response: "Todos os pontos do dia já foram batidos"}
            }

        }catch(err: any) {
            dbResponse = {response: err.toString(), status: 400}
            return dbResponse
        }

    }

    static async searchFrequencyOfTheDay(date:string, userUUID: string) {

        let dbResponse: EndMessage

        try {
            await client.query(`BEGIN`)
            const queryString: string = `select uuid from frequency where date = $1 and user_id = $2`
            const result = await client.query(queryString, [date, userUUID])
            await client.query(`COMMIT`)

            if(result.rows.length == 0) {
                dbResponse = {status: 404, response: "Sem frequência para essa data e usuário"}
                return dbResponse
            }

            dbResponse = {status: 200, response: result.rows[0].uuid}
            return dbResponse

        }catch(err: any) {
            dbResponse = {response: err.toString(), status: 400}
            return dbResponse
        }
    }

    static async createFrequencyOfTheDay(date: string, userUUID: string, frequencyUUID: string) {

        let dbResponse: EndMessage


        try {
            await client.query(`BEGIN`)
            const queryString: string = `insert into frequency(uuid, date, user_id) values($1, $2, $3) returning uuid`
            const result = await client.query(queryString, [frequencyUUID, date, userUUID])
            await client.query(`COMMIT`)

            dbResponse = {response: result.rows[0].uuid, status: 200}
            return dbResponse

        }catch(err: any) {
            dbResponse = {response: err.toString(), status: 400}
            return dbResponse
        }
    }

}