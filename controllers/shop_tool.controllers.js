const ShopTool = require("../models/shop.js");
const { errorHandler } = require("../helpers/error_handler.js");

const getAllShopTools = async(ctx) => {
    try {
        const shops = await ShopTool.findAll();
        if (!shops) {
            ctx.status = 404;
            ctx.body = "Shop tools not found!";
        };
        if (shops.rowCount == 0) {
            ctx.status = 200;
            ctx.body = "Shop tools is empty!";
        };

        ctx.body = shops.rows;
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const getShopToolById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const shop = await ShopTool.findAll({
            where: {
                id: id
            }
        });
        if (!shop || shop.rowCount == 0) {
            ctx.status = 404;
            ctx.body = "Shop tool not found!";
        };

        ctx.body = shop.rows[0];
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const addNewShopTool = async(ctx) => {
    try {
        const {
            toolId,
            shopId,
            rent_price,
            tool_price
        } = ctx.request.body;
        if (!toolId || !shopId || !rent_price || !tool_price) {
            ctx.status = 400;
            ctx.body = "You should enter all required data!";
        };

        const newShopTool = await ShopTool.create({
            toolId,
            shopId,
            rent_price,
            tool_price
        });

        ctx.status = 201;
        ctx.body = newShopTool;
    } catch (error) {
        errorHandler(error, ctx);
    }
};

const updateShopToolById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const {
            toolId,
            shopId,
            rent_price,
            tool_price
        } = ctx.request.body;

        const oldShopTool = await ShopTool.findAll({
            where: {
                id: id
            }
        });

        const updateShopTool = await ShopTool.update(
            {
                toolId: toolId || oldShopTool.rows[0].toolId,
                shopId: shopId || oldShopTool.rows[0].shopId,
                rent_price: rent_price || oldShopTool.rows[0].rent_price,
                tool_price: tool_price || oldShopTool.rows[0].tool_price,
            },
            {
                where: {
                    id: id
                }
            }
        );

        if (updateShopTool.rowCount === 0 || !updateShopTool) {
            ctx.status = 404;
            ctx.body = "Shop tool not found!";
        };

        ctx.status = 200;
        ctx.body = updateShopTool;
    } catch (error) {
        errorHandler(error, ctx);
    };
};

const deleteShopToolById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const shop = await ShopTool.destroy({
            where: {
                id: id
            }
        });
        if (!shop) {
            ctx.status = 404;
            ctx.body = "Shop tool not found!";
        };

        ctx.status = 200;
        ctx.body = "Succesfully deleted!";
    } catch (error) {
        errorHandler(error, ctx);
    }
};

module.exports = {
    getAllShopTools,
    getShopToolById,
    addNewShopTool,
    updateShopToolById,
    deleteShopToolById
}