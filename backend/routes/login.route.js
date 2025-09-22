const express = require("express");
const Login_Controller = require("../controller/login.controller");

LoginRouter = express.Router();

LoginRouter.post("/", Login_Controller.login);

module.exports = LoginRouter;