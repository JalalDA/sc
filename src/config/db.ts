import { Sequelize } from "sequelize";

const db = new Sequelize({
    database : `sigercode`,
    username :process.env.DB_USERNAME,
    password : process.env.DB_PASS,
    host : process.env.DB_HOST,
    dialect : "postgres",
})


export default db;