import { Response, Request } from "express";
import firebase from 'firebase-admin'
import User from "../models/Users";
import { v4 as uuidV4 } from "uuid";
import jwt from 'jsonwebtoken'

export const register = async (req: Request, res: Response) => {
  try {
    const { token, fcm_token } = req.body
    const data = await firebase.auth().verifyIdToken(token)
    console.log({ data });
    const user = await User.findOne({ where: { email: data?.email } })
    let acces_token: string = "";
    if (!user) {
      const {dataValues} = await User.create({
        user_id: uuidV4(),
        username: data.name,
        email: data?.email,
        phone_number: data?.phone_number || 0,
        photo: data?.picture,
        fcm_token
      })
      acces_token =  jwt.sign({user_id : dataValues.user_id, email : dataValues?.email}, "secret_key", {
        expiresIn: "365d"
      })
    }else{
      acces_token =  jwt.sign({user_id : user.dataValues.user_id, email : user.dataValues?.email}, "secret_key", {
        expiresIn: "365d"
      })
    }
    res.status(200).json({ msg: "Login Success", acces_token })
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error })
  }
}