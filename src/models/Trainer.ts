import { DataTypes } from "sequelize";
import db from "../config/db";




const Trainer = db.define("Trainer", {
    trainer_id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING
    },
    address : {
        type : DataTypes.STRING
    },
    photo : {
        type : DataTypes.STRING
    },
    about : {
        type : DataTypes.STRING
    }
})

export default Trainer