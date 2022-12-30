const {
  save,
  getAll,
  getOne,
  update,
  deleteRow, 
  getList
} = require("../controllers/students");
const { validateToken } = require("../middlewares/validateToken");
const router = require("express").Router();

router.post("/", validateToken, save);
router.post("/all", validateToken, getAll);
router.post("/list", validateToken, getList);
router.post("/one", validateToken, getOne);
router.put("/", validateToken, update);
router.delete("/", validateToken, deleteRow);

module.exports = { router };
