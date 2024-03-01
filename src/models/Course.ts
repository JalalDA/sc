import { DataTypes } from "sequelize";
import db from "../config/db";



const Course = db.define("Course",{
    course_id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    photo : {
        type : DataTypes.STRING
    },
    price_top : {
        type : DataTypes.BIGINT,
        allowNull : false
    },
    price_down : {
        type : DataTypes.BIGINT
    },
    rating : {
        type : DataTypes.FLOAT
    },
    total_member : {
        type : DataTypes.INTEGER
    },
    duration : {
        type : DataTypes.BIGINT
    },
    level : {
        type : DataTypes.STRING
    },
    category : {
        type : DataTypes.UUID
    },
    will_learn : {
        type : DataTypes.STRING,
    },
    trainer : {
        type : DataTypes.UUID
    },
    about : {
        type : DataTypes.STRING
    },
    for_who : {
        type : DataTypes.STRING
    },
    requirement : {
        type : DataTypes.STRING
    },
    batch_name : {
        type : DataTypes.STRING
    },
    start_date : {
        type : DataTypes.DATE
    }
})


export default Course