const sequelize = require('../config/db.js');

const { DataTypes } = require("sequelize");

const Shop = require("./shop.js");

const District = sequelize.define('district',
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
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

Shop.belongsTo(District);
District.hasMany(Shop);

module.exports = District;