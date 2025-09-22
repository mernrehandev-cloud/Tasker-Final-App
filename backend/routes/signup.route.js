const express = require("express");
const Signup_Controller = require("../controller/signup.controller");

SignupRouter = express.Router();

SignupRouter.post("/", Signup_Controller.signup);

module.exports = SignupRouter;