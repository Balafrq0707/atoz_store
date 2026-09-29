const express = require("express");
const { getBikes, getBikeById } = require("../controllers/bikeController");

const router = express.Router();

router.get("/", getBikes);
router.get("/:id", getBikeById);

module.exports = router;