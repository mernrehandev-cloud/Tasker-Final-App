const express = require("express");

const Tasker_status_controller = require("../controller/tasker_status.controller");

// const { adminOnly, jwtauthenticate } = require("../middleware/demo.middleware");

const Tasker_status_router = express.Router();


// Tasker_status_router.use(jwtauthenticate);
// Tasker_status_router.use(adminOnly);

Tasker_status_router.get("/", Tasker_status_controller.getTaskerStatus);
Tasker_status_router.post("/", Tasker_status_controller.createTaskerStatus);
// Tasker_status_router.get("/:id", Tasker_status_controller.);
// Tasker_status_router.put("/:id", Tasker_status_controller.);
// Tasker_status_router.delete("/:id", Tasker_status_controller.);


module.exports = Tasker_status_router;