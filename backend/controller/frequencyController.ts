import { Request, Response } from "express"
import EndMessage from "../interface/EndMessage"
import FrequencyBusiness from "../business/frequencyBusiness"
import client from "../db/databasePg";


export default class FrequencyController {

    static async setFrequency(req: Request, res: Response) {

        const userUUID: string = req.params.uuid
        const {base64} = req.body

        try {
            const businessResponse: EndMessage = await FrequencyBusiness.setFrequency(userUUID, base64)

            if(businessResponse.status == 200) {
                return res.status(businessResponse.status).json({data: businessResponse.response})
            } else {
                return res.status(businessResponse.status).json({error: businessResponse.response})
            }
        }catch(err: any) {
            res.status(400).json({error: err.toString()})
        }

    }

    static async searchForLastFrequencyHit(req: Request, res: Response) {

        const userUUID: string = req.params.uuid;

        try {

            const businessResponse: EndMessage = await FrequencyBusiness.searchFrequencyOfTheDay(userUUID, false);

            if(businessResponse.status == 200) {

                if(!businessResponse.response.lastFrequency) {
                    return res.status(200).json({data: {lastHit: false}})
                } else {
                    return res.status(200).json({data: {lastHit: true}})
                }
                
            } else {
                return res.status(businessResponse.status).json({error: businessResponse.response})
            };

        }catch(err: any) {
            return res.status(400).json({error: err.toString()})
        }
        
    }

}