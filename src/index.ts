import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import firebase from 'firebase-admin'
import cors from 'cors'
import db from "./config/db";
import router from "./routes";
import User from "./models/Users";
import Course from "./models/Course";
import Lesson from "./models/Lesson";
import Trainer from "./models/Trainer";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000; //change with your port
app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())
//@ts-ignore
import creadential from '../credential.json'

firebase.initializeApp({
  credential : firebase.credential.cert(creadential)
})

db.authenticate().then(()=>console.log("DB Connected")).catch(err=>console.log({err}))

User.sync()

app.use(`/${process.env.VERSION}`, router)

app.post('/send-notif', async (req:Request, res:Response)=>{
  try {
    const response = await firebase.messaging().send({
      notification : {
        title : "Halo",
        body : "test notif dari API"
      },
      token : "cqgWZYmzRgyGMXxk8VQYhE:APA91bHAOM6jwjuT_O_oyTZHlmsaek0yXT1RMXneEnQ_OCfzbOLzBDKtadxb4o2uslmxoUyYdCAmpq6Y1HgT1Se-7nTfH1yXq4z3-G6GyecQRXgd06nyDoijCwu4MNmH6lnZbuZDyKPS"
    })
    console.log({response});
    res.status(200).json({response})
  } catch (error) {
    console.log({error});
    res.status(500).json({error})
  }
})

app.get("/", (req: Request, res: Response) => {
  res.send("Selamat datang di sigercode :)");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});