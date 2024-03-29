import { Request, Response } from "express";
import Articles from "../models/Articles";
import { v4 as UUIDV4 } from "uuid";
import { Op } from "sequelize";
import db from "../config/db";


export const createArticles = async (req: Request, res: Response) => {
    const {
        content,
        title,
        category,
    } = req.body
    //@ts-ignore
    const { user_id } = req.payload
    try {
        const articles = await Articles.create({
            articles_id: UUIDV4(),
            user_id,
            content,
            category,
            title
        })
        res.status(200).json({ articles })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}

export const getArticles = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10, title, sortBy = 'articles_id', sortOrder = 'ASC', category = "" } = req.query;

        const filter: any = {};
        if (title) filter.title = { [Op.like]: `%${title}%` };
        if(category) filter.category = {category}
        const articles = await Articles.findAll({
            where : filter,
            order :[[sortBy as string, sortOrder as string]],
            offset: (Number(page) - 1) * Number(limit),
            limit : +limit
        })
        res.status(200).json({ articles })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}

export const getSingleArticles = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params
        const articles = await db.query(`select u.username , u.photo , a.title , a."content" , a.likes , a.shared , a."createdAt"  from "Articles" a join "Users" u on u.user_id  = a.user_id where articles_id = '${id}'`)
        if(!articles){
            return res.status(404).json({msg : "Articles not found"})
        }
        res.status(200).json({articles : articles[0]})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

export const updateArticles = async(req:Request, res:Response)=>{
    const {id} = req.body
    const {
        content,
        title,
    } = req.body
    try {
        const articles = await Articles.findByPk(id)
        if(!articles){
            return res.status(404).json({msg : "Cannot find articles"})
        }
        await articles.update({
            content,
            title
        })
        await articles.save();
        res.status(200).json({msg : "Success update article"})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

export const deleteArticles = async(req:Request, res:Response)=>{
    const {id} = req.params
    try {
        const article = await Articles.findByPk(id)
        if(!article){
            return res.status(404).json({msg : "Article tidak ditemukan"})
        }
        await article.update({
            deleted_at : new Date(Date.now())
        })
        res.status(200).json({msg : "success delete article"})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}