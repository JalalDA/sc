import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config()

const db = new Sequelize(`${process.env.POSTGRES_URL}`)

export default db;
