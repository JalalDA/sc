import { DataTypes } from "sequelize";
import db from "../config/db";

const Categories = db.define("Categories", {
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