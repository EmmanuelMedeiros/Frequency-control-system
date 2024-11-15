import moment from "moment";
import EndMessage from "../interface/EndMessage";
import Frequency from "../classes/Frequency";
import FrequencyRepository from "../repository/frequencyRepository";

import crypto from 'crypto'

export default class FrequencyBusiness {

    static async setFrequency(userUUID: string) {

        let frequencyUUID: string
        let endMessage: EndMessage
        const currentDate: string = moment().format("YYYY/MM/DD")
        const currentTime: string = moment().format('HH:mm:ss')

        const currentFrequency: Frequency = new Frequency(currentDate, currentTime)

        if(!userUUID) {
            endMessage = {status: 404, response: "Nenhum usuário encontrado com esse UUID"}
            return endMessage
        }

        const searchForFrequency: EndMessage = await FrequencyBusiness.searchFrequencyOfTheDay(userUUID)

        if(searchForFrequency.status != 200) {
            return searchForFrequency
        }

        frequencyUUID = searchForFrequency.response

        const setUpFrequency = await FrequencyRepository.dailyFrequencies(currentTime, frequencyUUID)

        endMessage = {status: 200, response: setUpFrequency}
        return endMessage

    }

    static async searchFrequencyOfTheDay(userUUID: string) {

        const currentDate: string = moment().format("YYYY/MM/DD")

        const dbResponse: EndMessage = await FrequencyRepository.searchFrequencyOfTheDay(currentDate, userUUID)
        if(dbResponse.status != 200) {
            const creatingFrequency: EndMessage = await FrequencyBusiness.createFrequencyOfTheDay(userUUID)
            return creatingFrequency
        }

        return dbResponse

    }

    static async createFrequencyOfTheDay(userUUID: string) {

        const frequencyUUID: string = crypto.randomUUID()
        const currentDate: string = moment().format("YYYY/MM/DD")

        const dbResponse: EndMessage = await FrequencyRepository.createFrequencyOfTheDay(currentDate, userUUID, frequencyUUID)

        return dbResponse
    }

}