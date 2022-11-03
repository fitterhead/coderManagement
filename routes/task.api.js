const express = require("express");
const {
  body,
  validationResult,
  oneOf,
  param,
  query,
} = require("express-validator");
const {
  createTask,
  findTaskByFilter,
  findDescriptionById,
  assignTaskToUser,
  unassignTaskToUser,
  updateStatus,
  findAllTaskOfMember,
} = require("../controllers/task.controllers");
const router = express.Router();

/* ------ 1) Create a new task ----- */
// router.post("/", body("name").isLowercase(), createTask);
router.post("/", body("name").exists(), createTask);

/* ----------------- Browse your tasks with filter allowance ---------------- */
router.get("/", body("name").exists(), findTaskByFilter);

/* ----------------------- find task decription by id ----------------------- */
router.get(
  "/description",
  oneOf([body("_id").exists().isMongoId(), body("name").exists().isString()]),
  findDescriptionById
);

/* ----------- You could assign member to a task or unassign them ----------- */
router.put(
  "/:id",
  oneOf([body("assignee").exists().isMongoId(), param().exists().isString()]),
  assignTaskToUser
);

router.delete(
  "/:id",
  oneOf([body("assignee").exists().isMongoId(), param().exists().isString()]),
  unassignTaskToUser
);

/* --------------------------- update task status --------------------------- */
router.put(
  "/status/:id",
  oneOf([body("status").exists(), param().exists().isString()]),
  updateStatus
);

/* ----- 6. You could search all tasks of 1 member either by name or id ----- */

router.get("/findtask", 
// query().exists(),
 findAllTaskOfMember);

module.exports = router;
