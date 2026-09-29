const express = require("express");

const {
  registerCustomer, requestOTP, verifyOTP
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerCustomer);
router.post("/request-otp", requestOTP);
router.post("/verify-otp", verifyOTP);

module.exports = router;