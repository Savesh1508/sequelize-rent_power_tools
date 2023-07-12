const Router = require("@koa/router");
const {
    getAllAdmins,
    getAdminById,
    addNewAdmin,
    updateAdminById,
    deleteAdminById
} = require("../controllers/admin.controllers.js");

const router = new Router();

router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.post("/", addNewAdmin);
router.put("/:id", updateAdminById);
router.delete("/:id", deleteAdminById);

module.exports = () => router.routes();
