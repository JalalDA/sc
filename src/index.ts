import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import firebase from 'firebase-admin'
import cors from 'cors'
import router from "./routes";
import db from "./config/db";
import cloudinaryConfig from "./config/cloudinary";


const app: Express = express();
const port = process.env.PORT || 8000; //change with your port
app.use(cors({
  origin : ["*", "http://localhost:3000", "https://sigercode.my.id", "http://sigercode.my.id", "https://sainstek-course.vercel.app", "https://www.sigercode.my.id", "www.sigercode.my.id"]
}))
app.use(express.urlencoded({extended : false}))
app.use(express.json())
firebase.initializeApp({
  credential : firebase.credential.cert({
    privateKey : `${process.env.FB_PRIVATE_KEY}`,
    clientEmail : `${process.env.FB_CLIENT_EMAIL}`,
    projectId : `${process.env.FB_PROJECT_ID}`
  })
})

// export const db = new Sequelize(`${process.env.POSTGRES_URL}`)

db.authenticate().then(()=>console.log("DB Connected")).catch(err=>console.log({err}))

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