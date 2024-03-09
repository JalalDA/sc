import { DataTypes } from "sequelize";
import db from "../config/db";


const Task = db.define("Task", {
    task_id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey : true
    },
    course_id : {
        type : DataTypes.UUID
    },
    title : {
        type : DataTypes.STRING
    },
    content : {
        type : DataTypes.STRING
    },
    daysto : {
        type : DataTypes.BIGINT
    },
    deleted_at : {
        type : DataTypes.DATE
    }
})


export default Task