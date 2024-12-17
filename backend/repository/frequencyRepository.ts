import Frequency from "../classes/Frequency";
import EndMessage from "../interface/EndMessage";

import client from "../db/databasePg";
import FrequencyTime from "../enum/FrequencyTime";

export default class FrequencyRepository {

    static async deleteFrequencyHeaders() {

        let dbResponse: EndMessage;

        try {

            await client.query('BEGIN');
            const sqlString: string = 'delete from frequency f where f.uuid not in (select frequency_uuid from frequency_items)';
            const result = await client.query(sqlString);
            await client.query('COMMIT');

            dbResponse = {response: `${result.rowCount} cabeçalhos de frequência limpos!`, status: 200};
            return dbResponse;

        }catch(err: any) {
            await client.query('ROLLBACK')
            dbResponse = {response: err.toString(), status: 500};
            return dbResponse
        }
    }

    static async hitMidDayFrequency(currentTime: string, frequencyTime: FrequencyTime) {

        let dbResponse: EndMessage

        try {
            await client.query('BEGIN')

            const sqlString: string = `update frequency set ${frequencyTime} = $1 where frequency_a != '' and frequency_d is null`;
            const result = await client.query(sqlString, [currentTime]);

            if(result.rowCount && result.rowCount > 0) {
                dbResponse = {response: `${result.rowCount} frequências atualizadas com a entrada para horário de almoço`, status: 200};
            } else {
                dbResponse = {response: `Nenhuma frequência alterada com entrada para horário de almoço`, status: 204};
            }

            await client.query('COMMIT');
            return dbResponse;

        } catch(err: any) {
            await client.query('ROLLBACK')
            dbResponse = {response: err.toString(), status: 500};
            return dbResponse
        }

    }

    static async dailyFrequencies(currentFrequency: Frequency, frequencyItemUUID: string, frequencyPicture?: string): Promise<EndMessage> {

        let dbResponse: EndMessage
        let frequencyToSet: number = 0
        let frequencyTime: FrequencyTime = FrequencyTime["BEGGINING OF DAY"]
        let noMoreFrequency: boolean = false 

        try {

            await client.query(`BEGIN`)
            const queryString: string = `select
                                        	frequency_type
                                        from
                                        	frequency_items
                                        where
                                        	frequency_uuid = $1`

            const result = await client.query(queryString, [currentFrequency.uuid])
            await client.query(`COMMIT`)

            if (result.rowCount != null) frequencyToSet = result.rowCount

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

            result.rows.forEach((element: {frequency_type: FrequencyTime}) => {
                if(element.frequency_type == FrequencyTime["ENDING OF DAY"]) {
                    noMoreFrequency = true;
                };
            })

            if((frequencyToSet == 0 || frequencyToSet == 3) && !noMoreFrequency) { 

                let result

                if((frequencyToSet == 0 || frequencyToSet == 3) && !frequencyPicture) {
                    dbResponse = {status: 400, response: 'É necessário uma foto para salvar esse registro!'};
                    return dbResponse;
                }

                await client.query('BEGIN')

                let queryStringB: string

                if(frequencyPicture) {
                    queryStringB = `insert into frequency_items(uuid, frequency_uuid, time, frequency_type, picture) values($1, $2, $3, $4, $5)`
                    result = await client.query(queryStringB, [frequencyItemUUID, currentFrequency.uuid, currentFrequency.time, frequencyTime, frequencyPicture])
                } else{
                    queryStringB = `insert into frequency_items(uuid, frequency_uuid, time, frequency_type) values($1, $2, $3, $4)`
                    result = await client.query(queryStringB, [frequencyItemUUID, currentFrequency.uuid, currentFrequency.time, frequencyTime])
                }

                await client.query('COMMIT')    
                dbResponse = {status: 200, response: [{frequencyUUID: currentFrequency.uuid}, {ponto: frequencyToSet + 1 + "° ponto"}]}
                return dbResponse

            } else if(noMoreFrequency){
                return dbResponse = {status: 403, response: "Todos os pontos do dia já foram batidos"};
            } else {
                let frequencyTime: string;
                frequencyToSet == 1 ? frequencyTime = 'saída para almoço' : frequencyTime = 'volta do almoço';
                return dbResponse = {status: 202, response: `É importante lembrar que os pontos relativos ao horário de almoço (saída e entrada) são batidos automaticamente. Se quiser bater esse ponto, este será tido como ponto de saída do trabalho.`};
            }

        }catch(err: any) {
            await client.query('ROLLBACK')
            console.log(err.toString())
            dbResponse = {status: 500, response: err.toString()};
            return dbResponse
        }

    }

    static async searchFrequencyOfTheDay(date:string, userUUID: string): Promise<EndMessage> {

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

            dbResponse = {status: 200, response: {frequencyUUID: result.rows[0].uuid, lastFrequency: result.rows[0].frequency_d}}
            return dbResponse

        }catch(err: any) {
            await client.query('ROLLBACK')
            dbResponse = {response: err.toString(), status: 400}
            return dbResponse
        }
    }

    static async createFrequencyOfTheDay(date: string, userUUID: string, frequencyUUID: string): Promise<EndMessage> {

        let dbResponse: EndMessage

        try {
            await client.query(`BEGIN`)
            const queryString: string = `insert into frequency(uuid, date, user_id) values($1, $2, $3) returning uuid`
            const result = await client.query(queryString, [frequencyUUID, date, userUUID])
            await client.query(`COMMIT`)

            dbResponse = {response: {frequencyUUID: result.rows[0].uuid}, status: 200}
            return dbResponse

        }catch(err: any) {
            await client.query('ROLLBACK')
            dbResponse = {response: err.toString(), status: 400}
            return dbResponse
        }
    }

}