const {
 found
} = require("../controllers/medias");
const { validateToken } = require("../middlewares/validateToken");
const router = require("express").Router();

router.post("/", validateToken, found);

module.exports = { router };
