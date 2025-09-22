const express = require("express");

const tasker_category_Controller = require("../controller/tasker_category.controller");
const tasker_category_router = express.Router();

tasker_category_router.get("/", tasker_category_Controller.getTaskerCategory);
tasker_category_router.post("/", tasker_category_Controller.createTaskerCategory);

// tasker_category_router.get("/:id", Tasker_category_Controller.);
// tasker_category_router.put("/:id", Tasker_category_Controller.);
// tasker_category_router.delete("/:id", Tasker_category_Controller.);


module.exports = tasker_category_router;
