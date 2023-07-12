const Router = require("@koa/router");
const {
    getAllTools,
    getToolById,
    addNewTool,
    updateToolById,
    deleteToolById
} = require("../controllers/tool.controllers.js");

const router = new Router();

router.get("/", getAllTools);
router.get("/:id", getToolById);
router.post("/", addNewTool);
router.put("/:id", updateToolById);
router.delete("/:id", deleteToolById);

module.exports = () => router.routes();
