const Tool = require("../models/tool.js");
const { errorHandler } = require("../helpers/error_handler.js");

const getAllTools = async(ctx) => {
    try {
        const tools = await Tool.findAll();
        if (!tools) {
            ctx.status = 404;
            ctx.body = "Tools not found!";
        };
        if (tools.rowCount == 0) {
            ctx.status = 200;
            ctx.body = "Tools is empty!";
        };

        ctx.body = tools.rows;
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const getToolById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const tool = await Tool.findAll({
            where: {
                id: id
            }
        });
        if (!tool || tool.rowCount == 0) {
            ctx.status = 404;
            ctx.body = "Tool not found!";
        };

        ctx.body = tool.rows[0];
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const addNewTool = async(ctx) => {
    try {
        const {
            name,
            brand,
            description
        } = ctx.request.body;
        if (!name) {
            ctx.status = 400;
            ctx.body = "You should enter all required data!";
        };

        const newTool = await Tool.create({
            name,
            brand,
            description
        });

        ctx.status = 201;
        ctx.body = newTool;
    } catch (error) {
        errorHandler(error, ctx);
    }
};

const updateToolById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const {
            name,
            brand,
            description
        } = ctx.request.body;

        const oldTool = await Tool.findAll({
            where: {
                id: id
            }
        });

        const updateTool = await Tool.update(
            {
                name: name || oldTool.rows[0].name,
                brand: brand || oldTool.rows[0].brand,
                description: description || oldTool.rows[0].description,

            },
            {
                where: {
                    id: id
                }
            }
        );

        if (updateTool.rowCount === 0 || !updateTool) {
            ctx.status = 404;
            ctx.body = "Tool not found!";
        };

        ctx.status = 200;
        ctx.body = updateTool;
    } catch (error) {
        errorHandler(error, ctx);
    };
};

const deleteToolById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const tool = await Tool.destroy({
            where: {
                id: id
            }
        });
        if (!tool) {
            ctx.status = 404;
            ctx.body = "Tool not found!";
        };

        ctx.status = 200;
        ctx.body = "Succesfully deleted!";
    } catch (error) {
        errorHandler(error, ctx);
    }
};

module.exports = {
    getAllTools,
    getToolById,
    addNewTool,
    updateToolById,
    deleteToolById
}