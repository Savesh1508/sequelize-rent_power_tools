const Router = require("@koa/router");
const {
    getAllOrders,
    getOrderById,
    addNewOrder,
    updateOrderById,
    deleteOrderById
} = require("../controllers/order.controllers.js");

const router = new Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/", addNewOrder);
router.put("/:id", updateOrderById);
router.delete("/:id", deleteOrderById);

module.exports = () => router.routes();
