import { DataTypes } from "sequelize";
import db from "../config/db";

const Categories = db.define("categories", {
    category_id : {
        type : DataTypes.UUID,
        primaryKey : true,
        allowNull : false
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    deleted_at : {
        type : DataTypes.DATE
    }
})

export default Categories