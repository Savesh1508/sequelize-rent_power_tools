const sequelize = require('../config/db.js');

const { DataTypes } = require("sequelize");

const Order = require('./order.js');

const Client = sequelize.define('client',
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

        address: {
            type: DataTypes.STRING,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

Order.belongsTo(Client);
Client.hasMany(Order);


module.exports = Client