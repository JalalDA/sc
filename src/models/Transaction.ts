import { DataTypes } from "sequelize";
import db from "../config/db";


const Transactions = db.define("Transaction", {
    transaction_id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey : true
    },
    course_id : {
        type : DataTypes.UUID,
        allowNull : false,
    },
    user_id : {
        type : DataTypes.UUID,
        allowNull : false
    },
    status : {
        type : DataTypes.STRING
    }
})

export default Transactions