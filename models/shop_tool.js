const sequelize = require('../config/db.js');

const { DataTypes } = require("sequelize");

const Order = require('./order.js');

const Shop_tool = sequelize.define('shop_tool',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        toolId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        shopId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        rent_price: {
            type: DataTypes.DECIMAL(15,2),
            allowNull: false,
        },

        tool_price: {
            type: DataTypes.DECIMAL(15,2),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

Order.belongsTo(Shop_tool);
Shop_tool.hasMany(Order);


module.exports = Shop_tool;