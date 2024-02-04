import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import firebase from 'firebase-admin'
import cors from 'cors'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000; //change with your port
app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: "haloanon-6e68f",
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

firebase.initializeApp(firebaseConfig)

app.get("/", (req: Request, res: Response) => {
  res.send("Selamat datang di sigercode :)");
});

app.post('/google', async (req:Request, res:Response)=>{
  try {
    const {token} = req.body
    console.log({token});
    const data = await firebase.auth().verifyIdToken(token)
    console.log({data});
    res.status(200).json({msg : "Login Success"})
  } catch (error) {
    console.log({error});
    res.status(500).json({error})
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});