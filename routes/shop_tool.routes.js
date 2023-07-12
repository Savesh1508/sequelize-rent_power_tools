const Router = require("@koa/router");
const {
    getAllShopTools,
    getShopToolById,
    addNewShopTool,
    updateShopToolById,
    deleteShopToolById
} = require("../controllers/shop_tool.controllers.js");

const router = new Router();

router.get("/", getAllShopTools);
router.get("/:id", getShopToolById);
router.post("/", addNewShopTool);
router.put("/:id", updateShopToolById);
router.delete("/:id", deleteShopToolById);

module.exports = () => router.routes();
