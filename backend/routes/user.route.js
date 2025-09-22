const express = require("express");
const user_controller = require("../controller/user.controller");
// const { iptrack, jwtauthenticate, adminOnly } = require('../middleware/demo.middleware');


const user_router = express.Router();
// user_router.use(jwtauthenticate);
// user_router.use(adminOnly);

// user_router.get("/admin", user_controller.getSuperAdminId);

user_router.get("/", user_controller.getUsers);
// user_router.post("/", user_controller.createUser);
user_router.get("/:id", user_controller.getUserById);
user_router.get("/userbyemail/:Email", user_controller.getUserByEmail);
user_router.put("/:id", user_controller.updateUser);
user_router.delete("/:id", user_controller.deleteUser);

module.exports = user_router;