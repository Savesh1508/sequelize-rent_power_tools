const Admin = require("../models/admin.js");
const { hashHelper } = require("../helpers/hash_helper.js");
const { errorHandler } = require("../helpers/error_handler.js");

const getAllAdmins = async(ctx) => {
    try {
        const admins = await Admin.findAll();
        if (!admins) {
            ctx.status = 404;
            ctx.body = "Admins not found!";
        };
        if (admins.rowCount == 0) {
            ctx.status = 200;
            ctx.body = "Admins is empty!";
        };

        ctx.body = admins.rows;
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const getAdminById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const admin = await Admin.findAll({
            where: {
                id: id
            }
        });
        if (!admin || admin.rowCount == 0) {
            ctx.status = 404;
            ctx.body = "Admin not found!";
        };

        ctx.body = admin.rows[0];
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const addNewAdmin = async(ctx) => {
    try {
        const {
            name,
            phone_number,
            email,
            password,
            is_active
        } = ctx.request.body;
        if (!email || !password) {
            ctx.status = 400;
            ctx.body = "You should enter all required data!";
        };

        const existedAdmin = await Admin.findAll({
            where: {
                email: email
            }
        });
        if (existedAdmin.rowCount != 0) {
            ctx.status = 400;
            ctx.body = "This admin already exists!";
        };

        const hashed_password = await hashHelper(password);

        const newAdmin = await Admin.create({
            name,
            phone_number,
            email,
            hashed_password,
            is_active
        });

        ctx.status = 201;
        ctx.body = newAdmin;
    } catch (error) {
        errorHandler(error, ctx);
    }
};


const updateAdminById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const {
            name,
            phone_number,
            email,
            password,
            is_active
        } = ctx.request.body;

        const oldAdmin = await Admin.findAll({
            where: {
                id: id
            }
        });

        let hashed_password;
        if (password) {
            hashed_password = await hashHelper(password);
        }

        const existedAdmin = await Admin.findAll({
            where: {
                email: email
            }
        })
        if (existedAdmin.rowCount != 0) {
            ctx.status = 400;
            ctx.body = "This admin already exists!";
        };

        const updateAdmin = await Admin.update(
            {
                name: name || oldAdmin.rows[0].name,
                phone_number: phone_number || oldAdmin.rows[0].phone_number,
                email: email || oldAdmin.rows[0].email,
                hashed_password: hashed_password || oldAdmin.rows[0].hashed_password,
                is_active: is_active || oldAdmin.rows[0].is_active
            },
            {
                where: {
                    id: id
                }
            }
        );

        if (updateAdmin.rowCount === 0 || !updateAdmin) {
            ctx.status = 404;
            ctx.body = "Admin not found!";
        };

        ctx.status = 200;
        ctx.body = updateAdmin;
    } catch (error) {
        errorHandler(error, ctx);
    };
};

const deleteAdminById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const admin = await Admin.destroy({
            where: {
                id: id
            }
        });
        if (!admin) {
            ctx.status = 404;
            ctx.body = "Admin not found!";
        };

        ctx.status = 200;
        ctx.body = "Succesfully deleted!";
    } catch (error) {
        errorHandler(error, ctx);
    }
};


module.exports = {
    getAllAdmins,
    getAdminById,
    addNewAdmin,
    updateAdminById,
    deleteAdminById
}