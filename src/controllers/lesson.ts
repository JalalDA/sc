import { Request, Response } from "express";
import Lesson from "../models/Lesson";
import { v4 as uuidV4 } from "uuid";
import db from "../config/db";



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
        const data = await db.query(`select * from "Lessons" l where l.course_id  = '${course_id}' and l.deleted_at is null `)
        res.status(200).json({data})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

export const getSingleLesson = async(req:Request, res:Response)=>{
    const {id} = req.params
    try {
        const data = await Lesson.findByPk(id)
        if(!data){
            return res.status(404).json({msg : "Data tidak ditemukan"})
        }
        res.status(200).json({data})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

export const updateLessonById = async(req:Request, res:Response)=>{
    const {
        lesson_id,
        title, 
        content,
        daysto,
    } = req.body
    try {
        const data = await Lesson.findByPk(lesson_id)
        if(!data){
            return res.status(404).json({msg : "Data tidak ditemukan"})
        }
        await data.update({
            title,
            content,
            daysto
        })
        await data.save()
        res.status(200).json({msg : "Berhasil mengupdate data"})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}