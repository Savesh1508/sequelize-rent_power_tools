const Router = require("@koa/router");

const ClientRouter = require("./client.routes.js");
const AdminRouter = require("./admin.routes.js");
const OrderRouter = require("./order.routes.js");
const ToolRouter = require("./tool.routes.js");
const ShopToolRouter = require("./shop_tool.routes.js");
const ShopRouter = require("./shop.routes.js");
const OwnerRouter = require("./owner.routes.js");
const DistrictRouter = require("./district.routes.js");

const router = new Router();

router.use("/api/client", ClientRouter());
router.use("/api/admin", AdminRouter());
router.use("/api/order", OrderRouter());
router.use("/api/tool", ToolRouter());
router.use("/api/shop_tool", ShopToolRouter());
router.use("/api/shop", ShopRouter());
router.use("/api/owner", OwnerRouter());
router.use("/api/district", DistrictRouter());

module.exports = () => router.routes();