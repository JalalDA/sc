import { Request, Response } from "express";
import Comment from "../models/Comment";
import { v4 as uuidV4 } from "uuid";
import db from "../config/db";


export const createComment = async(req:Request, res:Response)=>{
     //@ts-ignore
     const { user_id } = req.payload
     if(!user_id){
        return res.status(401).json({msg : "Please login to create comment"})
     }
     const {
        content, 
        articles_id
     } = req.body
    try {
        const data = await Comment.create({
            comment_id : uuidV4(),
            content,
            articles_id,
            user_id
        })
        res.status(200).json({data, msg : "Success create comment"})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

export const getCommentByArticleId = async(req:Request, res:Response)=>{
    const {articles_id} = req.params
    try {
        // const data = await Comment.findAll({
        //     where : {
        //         articles_id
        //     }
        // })
        const data = await db.query(`select c.comment_id, c."content" , u.user_id, u.username , u.photo , c."createdAt"  from "Comments" c inner join "Users" u on u.user_id = c.user_id where c.articles_id = '${articles_id}' and c.deleted_at is null order by c."createdAt" DESC;`)
        res.status(200).json({data : data[0]})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

export const updateComment = async(req:Request, res:Response)=>{
    const {comment_id, content} = req.body
    try {
        const comment = await Comment.findByPk(comment_id)
        if(!comment){
            return res.status(404).json({msg : "Comment tidak ditemukan"})
        }
        await comment.update({content})
        await comment.save()
        res.status(200).json({msg : "Success update comment", comment})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

export const deleteComment = async(req:Request, res:Response)=>{
    const {comment_id} = req.body
    try {
        const comment = await Comment.findByPk(comment_id)
        if(!comment){
            return res.status(404).json({msg : "Comment tidak ditemukan"})
        }
        await comment.update({deleted_at : new Date(Date.now())})
        await comment.save()
        res.status(200).json({msg : "Success delete comment"})
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}