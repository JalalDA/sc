import dotenv from 'dotenv';
dotenv.config()
import { Sequelize } from 'sequelize';


// const db = new Sequelize(`${process.env.POSTGRES_URL}`)
const db = new Sequelize({
    database : process.env.DATABASE,
    host : process.env.DB_HOST,
    password : process.env.DB_PASS,
    username : process.env.DB_USERNAME,
    dialect : "postgres"
})

export default db;
