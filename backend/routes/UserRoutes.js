const express = require("express");
const router = express.Router();

// controller
const {
  register,
  getCurrentUser,
  login,
  update,
  getUserById,
} = require("../controllers/UserController");

// middlewares
const validate = require("../middlewares/handleValidations");
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  update
);
router.get("/:id", getUserById);

module.exports = router;
