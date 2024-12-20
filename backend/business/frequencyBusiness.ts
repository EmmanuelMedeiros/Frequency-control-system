import moment from "moment";
import EndMessage from "../interface/EndMessage";
import Frequency from "../classes/Frequency";
import FrequencyRepository from "../repository/frequencyRepository";

import { CronJob } from "cron";

import crypto from 'crypto';
import { stdout } from "process";
import FrequencyTime from "../enum/FrequencyTime";

new CronJob('0 0 12,13 * * *', async function () {
    await FrequencyBusiness.hitAutomaticFrequency();
},
    null,
    true,
    "America/Sao_Paulo"
);

new CronJob('0 0 0 * * *', async function() {
    await FrequencyBusiness.deleteEmptyFrequencyHeaders();
},
    null,
    true,
    "America/Sao_Paulo"
);

export default class FrequencyBusiness {

    static async retrieveEmployeeHourBalance(): Promise<void> {

        let isWeekend: boolean;
        const weekDay: number = moment().day();

        switch(weekDay) {
            case 6:
                isWeekend = true;
                break;
            case 0:
                isWeekend = true;
                break;
            default: 
                isWeekend = false;
                break;
        }

        

    }

    static async deleteEmptyFrequencyHeaders(): Promise<EndMessage> {

        const dbResponse: EndMessage = await FrequencyRepository.deleteFrequencyHeaders();

        console.log(dbResponse);
        return dbResponse;
    }

    static async hitAutomaticFrequency(): Promise<EndMessage> {

        const currentTime: string = moment().format('HH:mm:ss')
        let frequencyTime: FrequencyTime;

        if(currentTime > '12:00:00') {
            frequencyTime = FrequencyTime["BACK FROM LUNCH"]
        } else {
            frequencyTime = FrequencyTime["LUNCH TIME"]
        }

        const dbResponse: EndMessage = await FrequencyRepository.hitMidDayFrequency(currentTime, frequencyTime);

        console.log(dbResponse)
        return dbResponse
    }

    static async setFrequency(userUUID: string, base64: string|undefined): Promise<EndMessage> {

        let frequencyUUID: string
        let endMessage: EndMessage
        const currentDate: string = moment().format("YYYY/MM/DD")
        const currentTime: string = moment().format('HH:mm:ss')

        const currentFrequency: Frequency = new Frequency(currentDate, currentTime)
        const frequencyItemUUID: string = currentFrequency.uuid

        if(!userUUID) {
            endMessage = {status: 404, response: "Nenhum usuário encontrado com esse UUID"}
            return endMessage
        }

        const searchForFrequency: EndMessage = await FrequencyBusiness.searchFrequencyOfTheDay(userUUID, true)

        if(searchForFrequency.status != 200) {
            return searchForFrequency
        }

        frequencyUUID = searchForFrequency.response.frequencyUUID
        currentFrequency.uuid = frequencyUUID;

        const setUpFrequency = await FrequencyRepository.dailyFrequencies(currentFrequency, frequencyItemUUID, base64);
        return setUpFrequency

    }

    static async searchFrequencyOfTheDay(userUUID: string, createRow: boolean): Promise<EndMessage> {

        const currentDate: string = moment().format("YYYY/MM/DD")

        const dbResponse: EndMessage = await FrequencyRepository.searchFrequencyOfTheDay(currentDate, userUUID)

        if(dbResponse.status != 200 && createRow) {
            const creatingFrequency: EndMessage = await FrequencyBusiness.createFrequencyOfTheDay(userUUID)
            return creatingFrequency
        }

        return dbResponse

    }

    static async createFrequencyOfTheDay(userUUID: string): Promise<EndMessage> {

        const frequencyUUID: string = crypto.randomUUID()
        const currentDate: string = moment().format("YYYY/MM/DD")

        const dbResponse: EndMessage = await FrequencyRepository.createFrequencyOfTheDay(currentDate, userUUID, frequencyUUID)

        return dbResponse
    }

}

FrequencyBusiness.retrieveEmployeeHourBalance();