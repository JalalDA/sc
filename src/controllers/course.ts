import { Request, Response } from "express";
import Course from "../models/Course";
import { v4 as uuidV4 } from "uuid";

//create course
export const createCourse = async (req:Request, res:Response)=>{
    const {
        name,
        price_top,
        price_down,
        rating, 
        total_member,
        duration,
        level,
        cateogry,
        trainer,
        about,
        for_who,
        requirement,
    } = req.body
    console.log(req.body);
    try {
        const data = await Course.create({
            course_id : uuidV4(),
            name,
            price_top,
            price_down,
            rating, 
            total_member,
            duration,
            level,
            cateogry,
            trainer,
            about,
            for_who,
            requirement,
        })
        res.status(200).json({data})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

//get all course
export const getAllCourse = async (req:Request, res:Response)=>{
    try {
        const courses = await Course.findAll()
        res.status(200).json({courses})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

//get single course
export const getSingleCourse = async (req:Request, res:Response)=>{
    try {
        const course = await Course.findOne({where : {course_id : req.params.course_id}})
        res.status(200).json({course})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

//update course

//soft delete course