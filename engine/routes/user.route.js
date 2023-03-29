const { fetchUser, changePassword } = require("../controllers/user.controller");
const { verify } = require("../middlware/verify");

const router = require("express").Router();

router.get("/:userId", verify, fetchUser)
router.put("/password", verify, changePassword)

module.exports = router;