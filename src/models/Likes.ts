import { DataTypes } from "sequelize";
import db from "../config/db";


const Like = db.define("Like", {
    like_id : {
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
        type : DataTypes.UUID
    },
    deleted_at : {
        type : DataTypes.UUID
    }
})


export default Like