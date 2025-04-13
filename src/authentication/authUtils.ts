import { asyncHandler } from "../helper/asyncHandler";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config()

// Extend the Request interface to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const jwt = require("jsonwebtoken");

export class Authentication {
    // no need to 
    public static authenticateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization']
        if (!authHeader) {
            return res.status(400).json({message: "Missing authentication field in header"})
        }
        const token = authHeader.split(' ')[1]  // Bearer <token>
        console.log("Token: ", token)
        if (!token) {
            return res.status(401).json({message: "Missing token"})
        }
        console.log(process.env.JWT_ACCESS_SECRET)
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err: any, user: any) => {
            if (err) {
                return res.status(403).json({message: "Invalid or expired token"})
            }
            req.user = user
            next()
        })

    })
}