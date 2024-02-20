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
        will_learn,
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
            will_learn
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
export const updateCourse = async(req:Request, res:Response)=>{
    const {id} = req.params
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
        will_learn,
    } = req.body
    try {
        const result = await Course.findByPk(id)
        if(!result){
            return res.status(404).json({msg : "Kelas tidak ditemukan"})
        }
        console.log({result});
        await result.update({
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
            will_learn
        })
        res.status(200).json({msg : "Success update course"})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

//update image course
export const updateImageCourse = async(req:Request, res:Response)=>{
    try {
        const {id} = req.params
        const file = req.file
        const photo = file ? file.path.replace('public', '').replace(/\\/g, '/') : null;
        const course = await Course.findByPk(id)
        if(!course){
            return res.status(404).json({msg : "Course not found"})
        }
        await course.update({photo})
        await course.save();
        res.status(200).json({msg : "Success update course image"})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

//soft delete course