import { DataTypes } from "sequelize";
import db from "../config/db";


const Career = db.define("Career", {
    career_id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey : true
    },
    title : {
        type : DataTypes.STRING,
    },
    content : {
        type : DataTypes.STRING
    },
    deleted_at : {
        type : DataTypes.DATE
    }
})

export default Career