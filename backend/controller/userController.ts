import { Request, Response } from "express";

import User from "../classes/User";
import Admin from "../classes/Admin";

import UserBusiness from "../business/userBusiness";

import EndMessage from "../interface/EndMessage";
import Employee from "../classes/Empolyee";

export default class UserController {

    static async checkJWTToken(req: Request, res: Response) {
        return res.status(200).json({message: "Valid and active token"})
    }

    static async deleteEmployee(req: Request, res: Response) {

        const employeeUUID: string = req.params.uuid;

        const businessResponse: EndMessage = await UserBusiness.deleteEmployee(employeeUUID);
            
        if(businessResponse.status == 200) {
            return res.status(businessResponse.status).json({data: businessResponse.response})
        } else {
            return res.status(businessResponse.status).json({error: businessResponse.response})
        }

    }

    static async registerFirstAdmin(req: Request, res: Response) {

        try {
            const {email, name, password} = req.body
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

            let {email, password} = req.body
            email = email.toLowerCase()

            const userToAuthenticate: {email: string, password: string} = {email, password}
    
            const businessResponse: EndMessage = await UserBusiness.authenticateAdmin(userToAuthenticate)
            
            if(businessResponse.status == 200) {
                return res.status(businessResponse.status).json({data: businessResponse.response})
            } else {
                return res.status(404).json({error: businessResponse.response})
            }
            
        } catch(err: any) {
            return res.status(400).json({error: err.toString()})
        }

    }

    static async registerNewUser(req: Request, res: Response) {

        const {name, weeklyWorkload} = req.body
        
        try {
            const userToCreate: Employee = new Employee(name, weeklyWorkload)
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