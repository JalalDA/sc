import { DataTypes } from "sequelize";
import db from "../config/db";

const Articles = db.define("Articles", {
    articles_id : {
        type : DataTypes.UUID,
        primaryKey : true,
        allowNull : false
    },
    title : {
        type : DataTypes.STRING
    },
    content : {
        type : DataTypes.STRING
    },
    likes : {
        type : DataTypes.INTEGER
    },
    shared : {
        type : DataTypes.INTEGER
    },
    user_id : {
        type : DataTypes.UUID
    },
    category : {
        type : DataTypes.UUID
    },
    deleted_at : {
        type : DataTypes.DATE
    }
})


export default Articles