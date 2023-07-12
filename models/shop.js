const sequelize = require('../config/db.js');

const { DataTypes } = require("sequelize");

const Shop_tool = require("./shop_tool.js");

const Shop = sequelize.define('shop',
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
            allowNull: false,
        },

        districtId: {
            type: DataTypes.INTEGER,
        },

        address: {
            type: DataTypes.INTEGER,
        },

        location: {
            type: DataTypes.INTEGER,
        },

        ownerId: {
            type: DataTypes.INTEGER,
        }

    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

Shop_tool.belongsTo(Shop);
Shop.hasMany(Shop_tool);

module.exports = Shop;