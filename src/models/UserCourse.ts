import { DataTypes } from "sequelize";
import db from "../config/db";


const UserCourse = db.define("UserCourse", {
    user_course_id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey : true
    },
    user_id : {
        type : DataTypes.UUID,
        allowNull : false
    },
    course_id : {
        type : DataTypes.UUID,
        allowNull : false,
    },
    progress : {
        type : DataTypes.BIGINT
    }
})


export default UserCourse