import { Request, Response } from "express";
import Lesson from "../models/Lesson";
import { v4 as uuidV4 } from "uuid";



export const createLesson = async(req:Request, res:Response)=>{
    const {
        course_id, 
        title, 
        content,
        daysto,
    } = req.body

    if(!course_id){
        return res.status(400).json({msg : "Please input a valid course id"})
    }
    try {
        const data = await Lesson.create({
            lesson_id : uuidV4(),
            course_id,
            title,
            content,
            daysto
        })
        res.status(200).json({msg : "Success create lesson", data})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

export const getLessonByCourseId = async(req:Request, res:Response)=>{
    const {course_id} = req.body
    try {
        const data = await Lesson.findAll({where : {course_id}})
        res.status(200).json({data})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}