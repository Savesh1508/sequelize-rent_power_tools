const sequelize = require('../config/db.js');

const { DataTypes } = require("sequelize");
const Shop_tool = require('./shop_tool.js');

const Tool = sequelize.define('tool',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        brand: {
            type: DataTypes.STRING(50),
        },

        description: {
            type: DataTypes.TEXT,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

Shop_tool.belongsTo(Tool);
Tool.hasMany(Shop_tool);

module.exports = Tool;