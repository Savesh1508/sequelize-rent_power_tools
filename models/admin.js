const sequelize = require('../config/db.js');

const { DataTypes } = require("sequelize");

const Admin = sequelize.define('admin',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(50),
        },

        phone_number: {
            type: DataTypes.STRING(15),
            unique: true,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true,
            unique: true
        },

        hashed_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Admin