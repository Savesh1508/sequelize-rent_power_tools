const District = require("../models/district.js");
const { errorHandler } = require("../helpers/error_handler.js");

const getAllDistricts = async(ctx) => {
    try {
        const districts = await District.findAll();
        if (!districts) {
            ctx.status = 404;
            ctx.body = "Districts not found!";
        };
        if (districts.rowCount == 0) {
            ctx.status = 200;
            ctx.body = "Districts is empty!";
        };

        ctx.body = districts.rows;
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const getDistrictById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const district = await District.findAll({
            where: {
                id: id
            }
        });
        if (!district || district.rowCount == 0) {
            ctx.status = 404;
            ctx.body = "District not found!";
        };

        ctx.body = district.rows[0];
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const addNewDistrict = async(ctx) => {
    try {
        const {
            name,
        } = ctx.request.body;
        if (!name) {
            ctx.status = 400;
            ctx.body = "You should enter all required data!";
        };

        const existedDistrict = await District.findAll({
            where: {
               name: name
            }
        });
        if (existedDistrict.rowCount != 0) {
            ctx.status = 400;
            ctx.body = "This district already exists!";
        };

        const newDistrict = await District.create({
            name,
        });

        ctx.status = 201;
        ctx.body = newDistrict;
    } catch (error) {
        errorHandler(error, ctx);
    }
};

const updateDistrictById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const {
            name,
        } = ctx.request.body;

        const oldDistrict = await District.findAll({
            where: {
                id: id
            }
        });

        const existedDistrict = await District.findAll({
            where: {
               name: name
            }
        });
        if (existedDistrict.rowCount != 0) {
            ctx.status = 400;
            ctx.body = "This district already exists!";
        };

        const updateDistrict = await District.update(
            {
                name: name || oldDistrict.rows[0].name,
            },
            {
                where: {
                    id: id
                }
            }
        );

        if (updateDistrict.rowCount === 0 || !updateDistrict) {
            ctx.status = 404;
            ctx.body = "District not found!";
        };

        ctx.status = 200;
        ctx.body = updateDistrict;
    } catch (error) {
        errorHandler(error, ctx);
    };
};

const deleteDistrictById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const district = await District.destroy({
            where: {
                id: id
            }
        });
        if (!district) {
            ctx.status = 404;
            ctx.body = "District not found!";
        };

        ctx.status = 200;
        ctx.body = "Succesfully deleted!";
    } catch (error) {
        errorHandler(error, ctx);
    }
};

module.exports = {
    getAllDistricts,
    getDistrictById,
    addNewDistrict,
    updateDistrictById,
    deleteDistrictById
}