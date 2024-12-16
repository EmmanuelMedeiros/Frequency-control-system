import { Request, Response } from "express";
import User from "../classes/User";

export default class HelloWorldController {

    static async helloWord(req: Request, res: Response) {
        console.log("Olá")
        return res.status(200).json({message: "Hello World"})
    }

}