const Shop = require("../models/shop.js");
const { errorHandler } = require("../helpers/error_handler.js");

const getAllShops = async(ctx) => {
    try {
        const shops = await Shop.findAll();
        if (!shops) {
            ctx.status = 404;
            ctx.body = "Shops not found!";
        };
        if (shops.rowCount == 0) {
            ctx.status = 200;
            ctx.body = "Shops is empty!";
        };

        ctx.body = shops.rows;
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const getShopById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const shop = await Shop.findAll({
            where: {
                id: id
            }
        });
        if (!shop || shop.rowCount == 0) {
            ctx.status = 404;
            ctx.body = "Shop not found!";
        };

        ctx.body = shop.rows[0];
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const addNewShop = async(ctx) => {
    try {
        const {
            name,
            phone_number,
            districtId,
            address,
            location,
            ownerId
        } = ctx.request.body;
        if (!phone_number) {
            ctx.status = 400;
            ctx.body = "You should enter all required data!";
        };

        const newShop = await Shop.create({
            name,
            phone_number,
            districtId,
            address,
            location,
            ownerId
        });

        ctx.status = 201;
        ctx.body = newShop;
    } catch (error) {
        errorHandler(error, ctx);
    }
};

const updateShopById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const {
            name,
            phone_number,
            districtId,
            address,
            location,
            ownerId
        } = ctx.request.body;

        const oldShop = await Shop.findAll({
            where: {
                id: id
            }
        });

        const updateShop = await Shop.update(
            {
                name: name || oldShop.rows[0].name,
                phone_number: phone_number || oldShop.rows[0].phone_number,
                districtId: districtId || oldShop.rows[0].districtId,
                address: address || oldShop.rows[0].address,
                location: location || oldShop.rows[0].location,
                ownerId: ownerId || oldShop.rows[0].ownerId,
            },
            {
                where: {
                    id: id
                }
            }
        );

        if (updateShop.rowCount === 0 || !updateShop) {
            ctx.status = 404;
            ctx.body = "Shop not found!";
        };

        ctx.status = 200;
        ctx.body = updateShop;
    } catch (error) {
        errorHandler(error, ctx);
    };
};

const deleteShopById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const shop = await Shop.destroy({
            where: {
                id: id
            }
        });
        if (!shop) {
            ctx.status = 404;
            ctx.body = "Shop not found!";
        };

        ctx.status = 200;
        ctx.body = "Succesfully deleted!";
    } catch (error) {
        errorHandler(error, ctx);
    }
};

module.exports = {
    getAllShops,
    getShopById,
    addNewShop,
    updateShopById,
    deleteShopById
}