const Router = require("@koa/router");
const {
    getAllOwners,
    getOwnerById,
    addNewOwner,
    updateOwnerById,
    deleteOwnerById
} = require("../controllers/owner.controllers.js");

const router = new Router();

router.get("/", getAllOwners);
router.get("/:id", getOwnerById);
router.post("/", addNewOwner);
router.put("/:id", updateOwnerById);
router.delete("/:id", deleteOwnerById);

module.exports = () => router.routes();
