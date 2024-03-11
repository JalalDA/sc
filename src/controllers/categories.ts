import { Request, Response } from "express";
import Categories from "../models/Categories";
import { v4 as uuidV4 } from "uuid";
import db from "../config/db";


export const createCategory = async(req:Request, res:Response)=>{
    try {
        const {name} = req.body
        const data = await Categories.create({
            category_id : uuidV4(),
            name
        })
        res.status(200).json({data})
    } catch (error) {
        console.log({error});
        res.status(200).json({error})
    }
}

export const getAllCategory =async (req:Request, res:Response) => {
    try {
        const data = await db.query(`select * from "Categories" c where c.deleted_at is null `)
        res.status(200).json({data : data[0]})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

export const deleteCategory = async (req:Request, res:Response)=>{
    const {category_id} = req.body
    try {
        const data = await Categories.findByPk(category_id)
        if(!data){
            return res.status(404).json({msg : "Data tidak ditemukan"})
        }
        await data.update({deleted_at : new Date(Date.now())})
        await data.save()
        res.status(200).json({msg : "Derhasil menghapus data"})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}