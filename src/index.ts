import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import firebase from 'firebase-admin'
import cors from 'cors'
import db from "./config/db";
import router from "./routes";
import User from "./models/Users";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000; //change with your port
app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

console.log(process.env.FB_PRIVATE_KEY)

firebase.initializeApp({
  credential : firebase.credential.cert({
    privateKey : `${process.env.FB_PRIVATE_KEY}`,
    clientEmail : `${process.env.FB_CLIENT_EMAIL}`,
    projectId : `${process.env.FB_PROJECT_ID}`
  })
})

db.authenticate().then(()=>console.log("DB Connected")).catch(err=>console.log({err}))

User.sync()

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