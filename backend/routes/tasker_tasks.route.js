const express = require("express");
const tasker_tasks_controller = require("../controller/tasker_tasks.controller");
const { jwtauthenticate } = require("../middleware/auth.middleware");

// const { iptrack, jwtauthenticate, adminOnly } = require('../middleware/demo.middleware');


const tasker_tasks_router = express.Router();
tasker_tasks_router.use(jwtauthenticate);

tasker_tasks_router.get("/", tasker_tasks_controller.getTasks);
tasker_tasks_router.post("/", tasker_tasks_controller.createTasks);
// tasker_tasks_router.get("/:id", user_controller.);
tasker_tasks_router.put("/:id", tasker_tasks_controller.updateTask);
tasker_tasks_router.delete("/:id", tasker_tasks_controller.deleteTask);

module.exports = tasker_tasks_router;