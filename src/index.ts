import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import firebase from 'firebase-admin'
import cors from 'cors'
import router from "./routes";
import db from "./config/db";
import cloudinaryConfig from "./config/cloudinary";
import User from "./models/Users";
import Articles from "./models/Articles";
import Transactions from "./models/Transaction";
import Course from "./models/Course";
import UserCourse from "./models/UserCourse";
import Lesson from "./models/Lesson";
import Apply from "./models/Apply";
import Comment from "./models/Comment";
import Categories from "./models/Categories";
import Career from "./models/Career";
import LinkTask from "./models/LinkTask";
import Task from "./models/Task";
import Trainer from "./models/Trainer";


const app: Express = express();
const port = process.env.PORT || 8000; //change with your port
app.use(cors({
  origin : ["*", "http://localhost:3000", "https://sigercode.my.id", "http://sigercode.my.id", "https://sainstek-course.vercel.app", "https://www.sigercode.my.id", "www.sigercode.my.id", "sciencebox.id", "https://sciencebox.id", "https://www.sciencebox.id", "www.sciencebox.id" ]
}))
app.use(express.urlencoded({extended : false}))
app.use(express.json({limit : '50mb'}))
firebase.initializeApp({
  credential : firebase.credential.cert({
    privateKey : `${process.env.FB_PRIVATE_KEY}`,
    clientEmail : `${process.env.FB_CLIENT_EMAIL}`,
    projectId : `${process.env.FB_PROJECT_ID}`
  })
})

// export const db = new Sequelize(`${process.env.POSTGRES_URL}`)

db.authenticate().then(()=>console.log("DB Connected")).catch(err=>console.log({err}))

Apply.sync()
Articles.sync()
Career.sync()
Categories.sync()
Comment.sync()
Course.sync()
Lesson.sync()
LinkTask.sync()
Task.sync()
Trainer.sync()
Transactions.sync()
UserCourse.sync()
User.sync()

app.use(cloudinaryConfig)
app.use(`/${process.env.VERSION}`, router)

app.post('/send-notif', async (req:Request, res:Response)=>{
  const {token} = req.body
  try {
    const response = await firebase.messaging().send({
      notification : {
        title : "Halo",
        body : "test notif dari API"
      },
      token
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