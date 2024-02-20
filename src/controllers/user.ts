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
    try {
        //@ts-ignore
        const user = await User.findOne({where : {user_id : req.payload.user_id}})
        console.log({user});
        res.status(200).json({user})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

//update photo user
export const updatePhotoUser = async (req:Request, res:Response)=>{
    try {
        const file = req.file
        const photo = file ? file.path.replace('public', '').replace(/\\/g, '/') : null;
        //@ts-ignore
        const {user_id } = req.payload
        if(!user_id) {
            return res.status(400).json({msg : "Token error"})
        }
        const user = await User.findByPk(user_id)
        if(!user){
            return res.status(404).json({msg : "User not found"})
        }
        await user.update({photo})
        await user.save();
        res.status(200).json({msg : "Success update user"})
    } catch (error) {
        console.log({error});
        res.status(400).json({error})
    }
}

//update user
export const updateUser = async (req:Request, res:Response)=>{
    try {
        //@ts-ignore
        const {user_id} = req.payload
        const user = await User.findByPk(user_id)
        if(!user){
            return res.status(404).json({msg : "User not found"})
        }
        const {
            username,
            first_name,
            last_name,
            gender,
            phone_number,
            address
        } = req.body
        await user.update({
            username,
            last_name,
            first_name,
            gender,
            phone_number,
            address
        })
        const newUser = await user.save();
        res.status(200).json({msg : "Success update user", user : newUser})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

//soft delete user
