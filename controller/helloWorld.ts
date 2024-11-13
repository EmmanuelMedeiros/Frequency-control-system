import { Request, Response } from "express";

export default class HelloWorldController {

    static async helloWord(req: Request, res: Response) {
        res.status(200).json({message: "Hello World"})
    }

}