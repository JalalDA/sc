import { DataTypes } from "sequelize";
import db from "../config/db";


const LinkTask = db.define("LinkTask", {
    linktask_id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey : true
    },
    user_id : {
        type : DataTypes.UUID,
    },
    course_id : {
        type : DataTypes.UUID
    },
    task_id : {
        type : DataTypes.UUID
    },
    link : {
        type : DataTypes.STRING
    },
    deleted_at : {
        type : DataTypes.DATE
    }
})


export default LinkTask