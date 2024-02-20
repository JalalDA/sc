import { Request, Response } from "express";
import UserCourse from "../models/UserCourse";
import { v4 as uuidV4 } from "uuid";
import db from "../config/db";



//create usercourse
export const craeteUserCourse = async(req:Request, res:Response)=>{
    const {user_id, course_id} = req.body
    try {
        const usercourse = await UserCourse.create({
            user_course_id : uuidV4(),
            user_id,
            course_id
        })
        res.status(200).json({data : usercourse})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

//get all usercourse
export const getAllUserCourse =async (req:Request, res:Response) => {
    //@ts-ignore
    const {user_id} = req.payload
    try {
        const userCourse = await db.query(`select u.*, c.*, uc.progress, uc.payment_status from "Users" u inner join "UserCourses" uc on u.user_id  = uc.user_id inner join "Courses" c on c.course_id = uc.course_id where u.user_id = '${user_id}'`)
        res.status(200).json({ data : userCourse[0] })
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

//get single usercourse

export const getSingleUserCourse =async (req:Request, res:Response) => {
    const {user_id} = req.params
    try {
        const userCourse = await db.query(`select u.*, c.* from "Users" u inner join "UserCourses" uc on u.user_id  = uc.user_id inner join "Courses" c on c.course_id = uc.course_id where u.user_id = '${user_id}'`)
        res.status(200).json({ data : userCourse })
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

//update usercourse

//soft delete