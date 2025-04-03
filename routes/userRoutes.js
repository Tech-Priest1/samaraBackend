const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/:id", userController.editUser); 
router.get("/", userController.getUsers); 
router.delete("/:id", userController.deleteUser);
module.exports = router;
