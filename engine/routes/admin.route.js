const { fetchStudent } = require("../controllers/admin.controller");
const { verify } = require("../middlware/verify");
const router = require("express").Router();

router.get("/user", verify, fetchStudent)


module.exports = router;