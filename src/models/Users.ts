import { DataTypes } from "sequelize";
import db from "../config/db";

const User = db.define("User", {
    user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    role : {
        type : DataTypes.ENUM,
        values : ["Admin", "User", "Trainer"],
        defaultValue : "User"
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    avatar_id : {
        type : DataTypes.UUID,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone_number: {
        type: DataTypes.BIGINT
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date_of_birth: {
        type: DataTypes.STRING,
        allowNull: true
    },
    point: {
        type: DataTypes.BIGINT,
        defaultValue: 0
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.STRING
    },
    fcm_token: {
        type : DataTypes.STRING
    },
    deleted_at: {
        type: DataTypes.DATE
    }
})

export default User