import "babel-polyfill";
import express from "express";

const router = express.Router();
const userController = require("./controllers/userController");

const validationMiddleware = require("../utils/validationMiddleware");
// const tokenMiddleware = require("../services/tokenMiddleware");

router.get('/user', userController.getAllUsers);

router.post('/user_create',)

module.exports = router;
