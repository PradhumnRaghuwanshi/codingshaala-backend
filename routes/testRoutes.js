const express = require("express");
const router = express.Router();
const { submitTest } = require("../controllers/testController");

router.post("/submit", submitTest);

module.exports = router;
