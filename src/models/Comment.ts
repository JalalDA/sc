import { DataTypes } from "sequelize";
import db from "../config/db";


const Comment = db.define("Comment", {
    comment_id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey : true
    },
    user_id : {
        type : DataTypes.UUID,
        allowNull : false
    },
    articles_id : {
        type : DataTypes.UUID,
    },
    content : {
        type : DataTypes.STRING
    },
    deleted_at : {
        type : DataTypes.DATE
    }
})


export default Comment