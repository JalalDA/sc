import { DataTypes } from "sequelize";
import db from "../config/db";


const Apply = db.define("Apply", {
    apply_id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey : true
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    email : {
        type : DataTypes.STRING
    },
    phone : {
        type : DataTypes.STRING
    },
    resume : {
        type : DataTypes.STRING
    },
    address : {
        type : DataTypes.STRING,
    },

    deleted_at : {
        type : DataTypes.DATE
    }
})

export default Apply