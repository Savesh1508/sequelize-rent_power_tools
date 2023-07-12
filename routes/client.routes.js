const Router = require("@koa/router");
const {
    getAllClients,
    getClientById,
    addNewClient,
    updateClientById,
    deleteClientById
} = require("../controllers/client.controllers.js");

const router = new Router();

router.get("/", getAllClients);
router.get("/:id", getClientById);
router.post("/", addNewClient);
router.put("/:id", updateClientById);
router.delete("/:id", deleteClientById);

module.exports = () => router.routes();
