import { DataTypes } from "sequelize";
import db from "../config/db";

const Lesson = db.define("Lesson", {
    lesson_id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey : true
    },
    course_id : {
        type : DataTypes.UUID,
        allowNull : false
    },
    title : {
        type : DataTypes.STRING
    },
    content : {
        type : DataTypes.STRING
    }
})

export default Lesson