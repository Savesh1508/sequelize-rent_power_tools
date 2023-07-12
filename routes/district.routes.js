const Router = require("@koa/router");
const {
    getAllDistricts,
    getDistrictById,
    addNewDistrict,
    updateDistrictById,
    deleteDistrictById
} = require("../controllers/district.controllers.js");

const router = new Router();

router.get("/", getAllDistricts);
router.get("/:id", getDistrictById);
router.post("/", addNewDistrict);
router.put("/:id", updateDistrictById);
router.delete("/:id", deleteDistrictById);

module.exports = () => router.routes();
