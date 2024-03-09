import { Request, Response } from "express";
import Apply from "../models/Apply";
import { v4 as uuidV4 } from "uuid";



export const createApply =async (req:Request, res:Response) => {
    const { username, email, phone, address} = req.body
    const file = req.file
    const resume = file ? file.path.replace('public', '').replace(/\\/g, '/') : null;
    try {
        const data = await Apply.create({
            apply_id : uuidV4(),
            username,
            email,
            phone,
            address,
            resume
        })
        res.status(200).json({data})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

export const getAllApply = async(req:Request, res:Response)=>{
    try {
        const data = await Apply.findAll()
        res.status(200).json({data})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

export const getSingleApply = async(req:Request, res:Response)=>{
    const {apply_id} = req.params
    try {
        const data = await Apply.findByPk(apply_id)
        res.status(200).json({data})
    } catch (error) {
        res.status(200).json({error})
    }
}