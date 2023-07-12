const Owner = require("../models/owner.js");
const { errorHandler } = require("../helpers/error_handler.js");

const getAllOwners = async(ctx) => {
    try {
        const owners = await Owner.findAll();
        if (!owners) {
            ctx.status = 404;
            ctx.body = "Owners not found!";
        };
        if (owners.rowCount == 0) {
            ctx.status = 200;
            ctx.body = "Owners is empty!";
        };

        ctx.body = owners.rows;
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const getOwnerById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const owner = await Owner.findAll({
            where: {
                id: id
            }
        });
        if (!owner || owner.rowCount == 0) {
            ctx.status = 404;
            ctx.body = "Owner not found!";
        };

        ctx.body = owner.rows[0];
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const addNewOwner = async(ctx) => {
    try {
        const {
            name,
            phone_number,
        } = ctx.request.body;
        if (!phone_number) {
            ctx.status = 400;
            ctx.body = "You should enter all required data!";
        };

        const existedOwner = await Owner.findAll({
            where: {
               phone_number: phone_number
            }
        });
        if (existedOwner.rowCount != 0) {
            ctx.status = 400;
            ctx.body = "This owner already exists!";
        };

        const newOwner = await Owner.create({
            name,
            phone_number,
        });

        ctx.status = 201;
        ctx.body = newOwner;
    } catch (error) {
        errorHandler(error, ctx);
    }
};

const updateOwnerById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const {
            name,
            phone_number,
        } = ctx.request.body;

        const oldOwner = await Owner.findAll({
            where: {
                id: id
            }
        });

        const existedOwner = await Owner.findAll({
            where: {
               phone_number: phone_number
            }
        });
        if (existedOwner.rowCount != 0) {
            ctx.status = 400;
            ctx.body = "This owner already exists!";
        };

        const updateOwner = await Owner.update(
            {
                name: name || oldOwner.rows[0].name,
                phone_number: phone_number || oldOwner.rows[0].phone_number,
            },
            {
                where: {
                    id: id
                }
            }
        );

        if (updateOwner.rowCount === 0 || !updateOwner) {
            ctx.status = 404;
            ctx.body = "Owner not found!";
        };

        ctx.status = 200;
        ctx.body = updateOwner;
    } catch (error) {
        errorHandler(error, ctx);
    };
};

const deleteOwnerById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const owner = await Owner.destroy({
            where: {
                id: id
            }
        });
        if (!owner) {
            ctx.status = 404;
            ctx.body = "Owner not found!";
        };

        ctx.status = 200;
        ctx.body = "Succesfully deleted!";
    } catch (error) {
        errorHandler(error, ctx);
    }
};

module.exports = {
    getAllOwners,
    getOwnerById,
    addNewOwner,
    updateOwnerById,
    deleteOwnerById
}