const Order = require("../models/order.js");
const { hashHelper } = require("../helpers/hash_helper.js");
const { errorHandler } = require("../helpers/error_handler.js");

const getAllOrders = async(ctx) => {
    try {
        const orders = await Order.findAll();
        if (!orders) {
            ctx.status = 404;
            ctx.body = "Orders not found!";
        };
        if (orders.rowCount == 0) {
            ctx.status = 200;
            ctx.body = "Orders is empty!";
        };

        ctx.body = orders.rows;
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const getOrderById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const order = await Order.findAll({
            where: {
                id: id
            }
        });
        if (!order || order.rowCount == 0) {
            ctx.status = 404;
            ctx.body = "Order not found!";
        };

        ctx.body = order.rows[0];
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const addNewOrder = async(ctx) => {
    try {
        const {
            clientId,
            shop_toolId,
            amount,
            order_date,
            period,
            total_price
        } = ctx.request.body;
        if (!clientId || !shop_toolId) {
            ctx.status = 400;
            ctx.body = "You should enter all required data!";
        };

        const newOrder = await Order.create({
            clientId,
            shop_toolId,
            amount,
            order_date,
            period,
            total_price
        });

        ctx.status = 201;
        ctx.body = newOrder;
    } catch (error) {
        errorHandler(error, ctx);
    }
};


const updateOrderById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const {
            clientId,
            shop_toolId,
            amount,
            order_date,
            period,
            total_price
        } = ctx.request.body;

        const oldOrder = await Order.findAll({
            where: {
                id: id
            }
        });

        const updateOrder = await Order.update(
            {
                clientId: clientId || oldOrder.rows[0].clientId,
                shop_toolId: shop_toolId || oldOrder.rows[0].shop_toolId,
                amount: amount || oldOrder.rows[0].amount,
                order_date: order_date || oldOrder.rows[0].order_date,
                period: period || oldOrder.rows[0].period,
                total_price: total_price || oldOrder.rows[0].total_price,
            },
            {
                where: {
                    id: id
                }
            }
        );

        if (updateOrder.rowCount === 0 || !updateOrder) {
            ctx.status = 404;
            ctx.body = "Order not found!";
        };

        ctx.status = 200;
        ctx.body = updateOrder;
    } catch (error) {
        errorHandler(error, ctx);
    };
};

const deleteOrderById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const order = await Order.destroy({
            where: {
                id: id
            }
        });
        if (!order) {
            ctx.status = 404;
            ctx.body = "Order not found!";
        };

        ctx.status = 200;
        ctx.body = "Succesfully deleted!";
    } catch (error) {
        errorHandler(error, ctx);
    }
};


module.exports = {
    getAllOrders,
    getOrderById,
    addNewOrder,
    updateOrderById,
    deleteOrderById
}