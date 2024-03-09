import { Request, Response } from "express";
import Task from "../models/Task";
import { v4 as uuidV4 } from "uuid";
import { Op } from "sequelize";



export const createTask = async (req: Request, res: Response) => {
    const { course_id, title, content, daysto } = req.body
    try {
        const data = await Task.create({
            task_id: uuidV4(),
            course_id,
            title,
            content,
            daysto
        })
        res.status(200).json({ data })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}

export const getAllTask = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, title, sortBy = 'articles_id', sortOrder = 'ASC' } = req.query;
    const filter: any = {};
    if (title) filter.title = { [Op.like]: `%${title}%` };
    try {
        const data = await Task.findAll({
            where: filter,
            order: [[sortBy as string, sortOrder as string]],
            offset: (Number(page) - 1) * Number(limit),
            limit: +limit
        })
        res.status(200).json({data})
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}

export const getTaskByCoursId = async (req: Request, res: Response) => {
    // const { page = 1, limit = 10, title, sortBy = 'articles_id', sortOrder = 'ASC' } = req.query;
    // const filter: any = {};
    // if (title) filter.title = { [Op.like]: `%${title}%` };
    const {
        course_id = ""
    } = req.query
    try {
        const data = await Task.findAll({
            where: {
                course_id
            },
            // order: [[sortBy as string, sortOrder as string]],
            // offset: (Number(page) - 1) * Number(limit),
            // limit: +limit
        })
        if(!data){
            return res.status(404).json({msg : "Task not found"})
        }
        res.status(200).json({data})
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}

export const getSingleTask = async(req:Request, res:Response)=>{
    const {task_id} = req.params
    try {
        const data = await Task.findByPk(task_id)
        res.status(200).json({data})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

export const updateTask = async(req:Request, res:Response)=>{
    const {
        course_id,
        title,
        content,
        daysto
    } = req.body
    const {task_id} = req.params
    try {
        const task = await Task.findByPk(task_id)
        if(!task){
            return res.status(404).json({msg : "Task not found"})
        }
       const updatedTask =  await task.update({
            course_id,
            title,
            content,
            daysto
        })
        res.status(200).json({updatedTask})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }

}

export const deleteTask = async (req:Request, res:Response)=>{
    const {task_id} = req.params
    try {
        const task = await Task.findByPk(task_id)
        if(!task){
            return res.status(404).json({msg : "Task not found"})
        }
        await task.update({
            deleted_at : new Date(Date.now())
        })
        res.status(200).json({task})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}