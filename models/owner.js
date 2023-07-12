const sequelize = require('../config/db.js');

const { DataTypes } = require("sequelize");
const Shop = require("./shop.js");

const Owner = sequelize.define('owner',
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
            unique: true
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

Shop.belongsTo(Owner);
Owner.hasMany(Shop);

module.exports = Owner