import { Request, Response } from "express"
import EndMessage from "../interface/EndMessage"
import FrequencyBusiness from "../business/frequencyBusiness"

export default class FrequencyController {

    static async setFrequency(req: Request, res: Response) {

        const userUUID: string = req.params.uuid

        try {
            const businessResponse: EndMessage = await FrequencyBusiness.setFrequency(userUUID)

            if(businessResponse.status == 200) {
                return res.status(businessResponse.status).json({data: businessResponse.response})
            } else {
                return res.status(businessResponse.status).json({error: businessResponse.response})
            }
        }catch(err: any) {
            res.status(400).json({error: err.toString()})
        }

    }

}