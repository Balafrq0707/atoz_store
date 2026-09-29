const { User } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const registerCustomer = async (req, res) => {
  const { username, phone, email } = req.body;

  if (!username || !phone || !email) {
    return res.status(400).json({
      success: false,
      message: "Username, phone and email are required",
    });
  }

  try {
    const existingUser = await User.findOne({
      where: {
        [require("sequelize").Op.or]: [
          { username },
          { phone },
          { email },
        ],
      },
    });

    if (existingUser) {
      let message = "User already exists";

      if (existingUser.username === username) {
        message = "Username already exists";
      } else if (existingUser.phone === phone) {
        message = "Phone number already exists";
      } else if (existingUser.email === email) {
        message = "Email already exists";
      }

      return res.status(409).json({
        success: false,
        message,
      });
    }

    const user = await User.create({
      username,
      phone,
      email,
      role: "customer",
    });

    return res.status(201).json({
      success: true,
      message: "Customer registered successfully",
      data: {
        id: user.id,
        username: user.username,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error registering customer:", error);

    return res.status(500).json({
      success: false,
      message: "Customer registration failed",
    });
  }
};


const requestOTP = async (req, res) => {
  const { identifier } = req.body;

  if (!identifier || !identifier.trim()) {
    return res.status(400).json({
      success: false,
      message: "Phone number or email is required",
    });
  }

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { phone: identifier.trim() },
          { email: identifier.trim().toLowerCase() },
        ],
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this phone number or email",
      });
    }

    const otpCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await user.update({
      otpCode,
      otpExpiresAt,
    });

    console.log(`OTP for ${identifier}: ${otpCode}`);

    return res.status(200).json({
      success: true,
      message: "OTP generated successfully",
    });
  } catch (error) {
    console.error("Error requesting OTP:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate OTP",
    });
  }
};

const verifyOTP = async (req, res) => {
  const { identifier, otp } = req.body;

  if (!identifier || !otp) {
    return res.status(400).json({
      success: false,
      message: "Phone/email and OTP are required",
    });
  }

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { phone: identifier.trim() },
          { email: identifier.trim().toLowerCase() },
        ],
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.otpCode || !user.otpExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "No active OTP found",
      });
    }

    if (user.otpCode !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (new Date() > user.otpExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // OTP can no longer be reused
    await user.update({
      otpCode: null,
      otpExpiresAt: null,
    });

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          phone: user.phone,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);

    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};

module.exports = {
  registerCustomer, requestOTP, verifyOTP
};