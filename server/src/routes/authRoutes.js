const express = require("express");
const {
  registerCustomer, requestOTP, verifyOTP, getCurrentUser
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/register", registerCustomer);
router.post("/request-otp", requestOTP);
router.post("/verify-otp", verifyOTP);
router.get("/me", protect, getCurrentUser);

module.exports = router;