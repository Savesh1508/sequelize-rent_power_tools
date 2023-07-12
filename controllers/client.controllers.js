const Client = require("../models/client.js");
const { hashHelper } = require("../helpers/hash_helper.js");
const { errorHandler } = require("../helpers/error_handler.js");

const getAllClients = async(ctx) => {
    try {
        const clients = await Client.findAll();
        if (!clients) {
            ctx.status = 404;
            ctx.body = "Clients not found!";
        };
        if (clients.rowCount == 0) {
            ctx.status = 200;
            ctx.body = "Clients is empty!";
        };

        ctx.body = clients.rows;
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const getClientById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const client = await Client.findAll({
            where: {
                id: id
            }
        });
        if (!client || client.rowCount == 0) {
            ctx.status = 404;
            ctx.body = "Client not found!";
        };

        ctx.body = client.rows[0];
    } catch (error) {
        errorHandler(error, ctx);
    }
}

const addNewClient = async(ctx) => {
    try {
        const {
            name,
            phone_number,
            email,
            password,
            address
        } = ctx.request.body;
        if (!email || !password) {
            ctx.status = 400;
            ctx.body = "You should enter all required data!";
        };

        const existedClient = await Client.findAll({
            where: {
                email: email
            }
        });
        if (existedClient.rowCount != 0) {
            ctx.status = 400;
            ctx.body = "This client already exists!";
        };

        const hashed_password = await hashHelper(password);

        const newClient = await Client.create({
            name,
            phone_number,
            email,
            hashed_password,
            address
        });

        ctx.status = 201;
        ctx.body = newClient;
    } catch (error) {
        errorHandler(error, ctx);
    }
};


const updateClientById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const {
            name,
            phone_number,
            email,
            password,
            address
        } = ctx.request.body;

        const oldClient = await Client.findAll({
            where: {
                id: id
            }
        });

        let hashed_password;
        if (password) {
            hashed_password = await hashHelper(password);
        }

        const existedClient = await Client.findAll({
            where: {
                email: email
            }
        })
        if (existedClient.rowCount != 0) {
            ctx.status = 400;
            ctx.body = "This client already exists!";
        };

        const updateClient = await Client.update(
            {
                name: name || oldClient.rows[0].name,
                phone_number: phone_number || oldClient.rows[0].phone_number,
                email: email || oldClient.rows[0].email,
                hashed_password: hashed_password || oldClient.rows[0].hashed_password,
                address: address || oldClient.rows[0].address
            },
            {
                where: {
                    id: id
                }
            }
        );

        if (updateClient.rowCount === 0 || !updateClient) {
            ctx.status = 404;
            ctx.body = "Client not found!";
        };

        ctx.status = 200;
        ctx.body = updateClient;
    } catch (error) {
        errorHandler(error, ctx);
    };
};

const deleteClientById = async(ctx) => {
    try {
        const { id } = await ctx.params.id;
        const client = await Client.destroy({
            where: {
                id: id
            }
        });
        if (!client) {
            ctx.status = 404;
            ctx.body = "Client not found!";
        };

        ctx.status = 200;
        ctx.body = "Succesfully deleted!";
    } catch (error) {
        errorHandler(error, ctx);
    }
};


module.exports = {
    getAllClients,
    getClientById,
    addNewClient,
    updateClientById,
    deleteClientById
}