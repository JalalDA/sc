import dotenv from 'dotenv'
dotenv.config();
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'


const verfyToken = async (req:Request, res :Response, next : NextFunction)=>{
    try {
        //get token
        const token = req.headers.authorization?.split("Bearer ")[1]
        // console.log({token});
        //verify token dengan jwt
        const decoded = jwt.verify(`${token}`,  `${process.env.SECRET_KEY}`)
        // console.log({decoded});
        //assign ke paylod
        //@ts-ignore
        req.payload = {user_id : decoded?.user_id, email : decoded.email}

        //next function
        next();
    } catch (error:any) {
        console.log({error});
        
        if(error.name == "TokenExpiredError")
        return res.status(403).json({
            msg : "Your token is expired, please login again",
            error
        })
        if(error.name == "JsonWebTokenError"){
            return res.status(403).json({
                msg : "something went wrong with your token",
                error
            })
        }
        res.status(500).json({error})
    }
}

export default verfyToken