import { Request, Response } from "express";

import User from "../classes/User";
import Admin from "../classes/Admin";

import UserBusiness from "../business/userBusiness";

import EndMessage from "../interface/EndMessage";

export default class UserController {

    static async registerFirstAdmin(req: Request, res: Response) {

        try {
            const {email, name, password}: Admin = req.body
            const newAdmin: Admin = new Admin(
                name,
                email,
                password
            )

            const businessResponse: EndMessage = await UserBusiness.registerFirstAdmin(newAdmin)
            
            if(businessResponse.status == 201) {
                return res.status(businessResponse.status).json({data: businessResponse.response})
            } else {
                return res.status(businessResponse.status).json({error: businessResponse.response})
            }
    
        } catch(err: any) {
            res.status(400).json({error: err.toString()})
        }

    }

    static async authenticateAdmin(req: Request, res: Response) {

        try {
            const {email, password} = req.body
            const userToAuthenticate: {email: string, password: string} = {email, password}
    
            const businessResponse: EndMessage = await UserBusiness.authenticateAdmin(userToAuthenticate)
    
            if(businessResponse.status == 200) {
                return res.status(businessResponse.status).json({data: businessResponse.response})
            } else {
                return res.status(businessResponse.status).json({error: businessResponse.response})
            }
            
        } catch(err: any) {
            return res.status(400).json({error: err.toString()})
        }

    }

    static async registerNewUser(req: Request, res: Response) {

        const {name} = req.body

        try {
            const userToCreate: User = new User(name)
            const businessResponse: EndMessage = await UserBusiness.registerNewUser(userToCreate)

            if(businessResponse.status == 201) {
                return res.status(businessResponse.status).json({data: businessResponse.response})
            } else {
                return res.status(businessResponse.status).json({error: businessResponse.response})
            }
        }catch(err: any) {
            return res.status(400).json({error: err.toString()})
        }
    }

    static async getUserByUUID(req: Request, res: Response) {
        
        const uuid:string = req.params.uuid

        try {
            const businessResponse: EndMessage = await UserBusiness.getUserByUUID(uuid)
            if(businessResponse.status == 200) {
                return res.status(businessResponse.status).json({data: businessResponse.response})
            } else {
                return res.status(businessResponse.status).json({error: businessResponse.response})
            }
        }catch(err: any) {
            return res.status(400).json({error: err.toString()})
        }
    }

    static async getListOfUsers(req: Request, res: Response) {
        
        try {

            const businessResponse: EndMessage = await UserBusiness.getListOfUsers()

            if(businessResponse.status == 200) {
                return res.status(businessResponse.status).json({data: businessResponse.response})
            } else {
                return res.status(businessResponse.status).json({error: businessResponse.response})
            }
        }catch(err: any) {
            return res.status(400).json({error: err.toString()})
        }
    }

}