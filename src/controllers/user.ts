import { Response, Request } from "express";
import User from "../models/Users";


//create user manual
export const createUser = async (req:Request, res:Response)=>{
    try {
       const {username, email} = req.body 
    } catch (error) {
        console.log({error});
        res.status(500).json({msg : "Something went wrong", error})
    }
}

//get all user
export const getAllUser = async (req:Request, res:Response)=>{
    try {
        const user = await User.findAll()
        console.log({user});
        res.status(200).json({user})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}


//get single user
export const getSingleUser = async (req:Request, res:Response)=>{
    console.log(req.params.user_id);
    try {
        const user = await User.findOne({where : {user_id : req.params.user_id}})
        console.log({user});
        res.status(200).json({user})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

//update user


//soft delete user
