const sequelize = require('../config/db.js');

const { DataTypes, NOW } = require("sequelize");

const Order = sequelize.define('order',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        shop_toolId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        amount: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },

        order_date: {
            type: DataTypes.DATE,
            defaultValue: NOW,
        },

        period: {
            type: DataTypes.INTEGER,
        },

        total_price: {
            type: DataTypes.DECIMAL(15,2),
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Order;