const jwt = require("jsonwebtoken")

require('dotenv').config()

import { Request, Response, NextFunction } from "express"

export default function jsonAuthentication(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization

    try{
        const userToAuthenticate = jwt.verify(token, process.env.JWT_SECRET)
        next()
    }catch(err: any) {
        res.status(400).json({error: err.toString()})
    }

}