import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config()

// const db = new Sequelize(`${process.env.POSTGRES_URL}`)
const db = new Sequelize({
    database : "sigercode",
    host : "localhost",
    password : "",
    username : "jalal",
    dialect : "postgres"
})

export default db;
