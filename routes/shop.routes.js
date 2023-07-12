const Router = require("@koa/router");
const {
    getAllShops,
    getShopById,
    addNewShop,
    updateShopById,
    deleteShopById
} = require("../controllers/shop.controllers.js");

const router = new Router();

router.get("/", getAllShops);
router.get("/:id", getShopById);
router.post("/", addNewShop);
router.put("/:id", updateShopById);
router.delete("/:id", deleteShopById);

module.exports = () => router.routes();
