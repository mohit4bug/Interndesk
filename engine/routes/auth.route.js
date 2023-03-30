const router = require("express").Router();
const { register, login, logout, authenticateUser, verifyEmail } = require("../controllers/auth.controller");
const { verify } = require("../middlware/verify");

router.post("/register", register)
router.post("/login", login)
router.get("/verify/:token", verifyEmail)
router.get("/logout", verify, logout)
router.get("/authenticate", verify, authenticateUser);

module.exports = router;